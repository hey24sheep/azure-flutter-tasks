import * as path from 'path';
import * as os from 'os';

import * as request from 'request-promise';
import * as task from "azure-pipelines-task-lib";
import * as tool from 'azure-pipelines-tool-lib/tool';

const FLUTTER_TOOL_NAME: string = 'Flutter';
const FLUTTER_EXE_RELATIVEPATH = 'flutter/bin';
const FLUTTER_TOOL_PATH_ENV_VAR: string = 'FlutterToolPath';

async function main(): Promise<void> {
	// 1. Getting current platform identifier
	let arch = findArchitecture();

	// 2. Building version spec
	let channel = task.getInput('channel', true);
	let version = task.getInput('version', true);

	let versionData = await findLatestSdkVersion(channel, arch, version);
	let versionSpec = versionData.version;
	let downloadUrl = versionData.downloadUrl;

	// 3. Check if already available
	task.debug(`Trying to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
	let toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);

	if (!toolPath) {
		// 4.1. Downloading SDK
		await downloadAndCacheSdk(versionSpec, channel, arch, downloadUrl);

		// 4.2. Verifying that tool is now available
		task.debug(`Trying again to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
		toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
	}

	// 5. Creating the environment variable
	let fullFlutterPath: string = path.join(toolPath, FLUTTER_EXE_RELATIVEPATH);
	task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
	task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
	task.setResult(task.TaskResult.Succeeded, "Installed");
}

function findArchitecture() {
	if (os.platform() === 'darwin')
		return "macos";
	else if (os.platform() === 'linux')
		return "linux";
	return "windows";
}

async function downloadAndCacheSdk(versionSpec: string, channel: string, arch: string, downloadUrl: string): Promise<void> {
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

async function findLatestSdkVersion(channel: string, arch: string, version: string): Promise<{ downloadUrl: string, version: string }> {
	var releasesUrl = `https://storage.googleapis.com/flutter_infra/releases/releases_${arch}.json`;
	task.debug(`Finding version '${version}' from '${releasesUrl}'`);
	var body = await request.get(releasesUrl);
	var json = JSON.parse(body);

	var currentHash = json.current_release[channel];
	var current = json.releases.find((item) => item.hash === currentHash && item.channel == channel);

	// if user selected custom
	if (version.toLowerCase() !== 'latest') {
		// fetch custom version
		version = task.getInput('customVersion', false);
		current = json.releases.find((item) => item.channel == channel && uniformizeVersion(item.version) == uniformizeVersion(version));
	}

	task.debug(`Found version hash '${current.hash}'`);
	return {
		version: current.version + '-' + channel,
		downloadUrl: json.base_url + '/' + current.archive,
	};
}

// Removes the 'v' prefix from given version.
function uniformizeVersion(version) {
    if (version.startsWith('v')) {
        return version.substring(1);
    }
    return version;
}

main().catch(error => {
	task.setResult(task.TaskResult.Failed, error);
});