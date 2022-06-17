import * as task from "azure-pipelines-task-lib/task";
import * as tool from 'azure-pipelines-tool-lib/tool';
import * as os from 'os';
import * as path from 'path';
import * as request from 'request-promise';

const FLUTTER_TOOL_NAME: string = 'Flutter';
const FLUTTER_EXE_RELATIVEPATH = 'flutter/bin';
const DART_EXE_RELATIVEPATH = 'cache/dart-sdk/bin';
const FLUTTER_PUB_CACHE_RELATIVEPATH = 'flutter/.pub-cache/bin';
const FLUTTER_TOOL_PATH_ENV_VAR: string = 'FlutterToolPath';
const FLUTTER_PUBCACHE_PATH_ENV_VAR: string = 'FlutterPubCachePath';
const DART_TOOL_PATH_ENV_VAR: string = 'DartToolPath';

async function main(): Promise<void> {
	// 1. Getting current platform identifier
	let arch = findArchitecture();

	// 2. Building version spec
	let mode = task.getInput('mode', true);
	let versionSpec = '';
	let downloadUrl = '';
	if (mode === 'auto') {
		let channel = task.getInput('channel', true);
		let version = task.getInput('version', true);
		let versionData = await findLatestSdkVersion(channel, arch, version);
		versionSpec = versionData.semverVersion;
		downloadUrl = versionData.downloadUrl;
	} else {
		downloadUrl = task.getInput('customUrl', true);
		let urlSplits = downloadUrl.split('/');
		let fragSplits = urlSplits[urlSplits.length - 1].split('_'); // str is flutter_windows_3.0.2-stable.zip
		fragSplits = fragSplits.pop().split('-'); // str is 3.0.2-stable.zip
		fragSplits.pop(); // remove the last stable.zip part
		versionSpec = fragSplits.join('-');
		versionSpec = versionSpec.trim();
		task.debug(`Parsed version '${versionSpec}' from custom url`);
	}

	// 3. Check if already available
	task.debug(`Trying to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
	let toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);

	if (!toolPath) {
		// 4.1. Downloading SDK
		await downloadAndCacheSdk(versionSpec, arch, downloadUrl);

		// 4.2. Verifying that tool is now available
		task.debug(`Trying again to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
		toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
	}

	// 5. Creating flutter environment variable
	let fullFlutterPath: string = path.join(toolPath, FLUTTER_EXE_RELATIVEPATH);
	task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
	task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);

	// 5.1 Create flutter pub-cache environment variable
	let fullPubCachePath: string = path.join(toolPath, FLUTTER_PUB_CACHE_RELATIVEPATH);
	task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullPubCachePath}'`);
	task.setVariable(FLUTTER_PUBCACHE_PATH_ENV_VAR, fullPubCachePath);

	// 5.2 Create dart environment variable
	let fullDartPath: string = path.join(fullFlutterPath, DART_EXE_RELATIVEPATH);
	task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullDartPath}'`);
	task.setVariable(DART_TOOL_PATH_ENV_VAR, fullDartPath);

	task.setResult(task.TaskResult.Succeeded, "Installed");
}

function findArchitecture() {
	if (os.platform() === 'darwin')
		return "macos";
	else if (os.platform() === 'linux')
		return "linux";
	return "windows";
}

async function downloadAndCacheSdk(versionSpec: string, arch: string, downloadUrl: string): Promise<void> {
	// 1. Download SDK archive
	task.debug(`Starting download archive from '${downloadUrl}'`);
	var bundleArchive = await tool.downloadTool(downloadUrl);
	task.debug(`Succeeded to download '${bundleArchive}' archive from '${downloadUrl}'`);

	// 2. Extracting SDK bundle
	task.debug(`Extracting '${downloadUrl}' archive`);

	var bundleDir: string;

	if (downloadUrl.endsWith('tar.xz')) {
		bundleDir = await tool.extractTar(bundleArchive);
	} else {
		bundleDir = await tool.extractZip(bundleArchive);
	}

	task.debug(`Extracted to '${bundleDir}' '${downloadUrl}' archive`);

	// 3. Adding SDK bundle to cache
	task.debug(`Adding '${bundleDir}' to cache (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch})`);
	tool.cacheDir(bundleDir, FLUTTER_TOOL_NAME, versionSpec, arch);
}

async function findLatestSdkVersion(channel: string, arch: string, version: string): Promise<{ downloadUrl: string, version: string, semverVersion: string }> {
	var releasesUrl = `https://storage.googleapis.com/flutter_infra_release/releases/releases_${arch}.json`;
	task.debug(`Finding version '${version}' from '${releasesUrl}'`);
	var body = await request.get(releasesUrl);
	var json = JSON.parse(body);

	var currentHash = json.current_release[channel];
	var arch = os.arch();

	// if user gave custom arch type, use that
	let customArch = task.getInput('customArch', false);
	if (customArch && customArch.trim() !== '') {
		arch = customArch.trim();
	}
	task.debug(`Using Arch type '${arch}'`);
	var current = json.releases.find((item) => item.hash === currentHash && item.channel == channel && item.dart_sdk_arch == arch);

	// if user selected custom
	if (version.toLowerCase() !== 'latest') {
		// fetch custom version
		version = task.getInput('customVersion', false);

		if (customArch && customArch.trim() !== '') {
			current = json.releases.find((item) => item.channel == channel && uniformizeVersion(item.version) == uniformizeVersion(version) && item.dart_sdk_arch == customArch);
		} else {
			current = json.releases.find((item) => item.channel == channel && uniformizeVersion(item.version) == uniformizeVersion(version));
		}
	}

	task.debug(`Found version hash '${current.hash}'`);
	return {
		version: current.version + '-' + channel,
		downloadUrl: json.base_url + '/' + current.archive,
		semverVersion: current.version
	};
}

// Removes the 'v' prefix from given version.
function uniformizeVersion(version: string) {
	if (version.startsWith('v')) {
		return version.substring(1);
	}
	return version;
}

main().catch(error => {
	task.setResult(task.TaskResult.Failed, error);
});
