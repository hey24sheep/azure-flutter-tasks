"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const task = require("azure-pipelines-task-lib/task");
const tool = require("azure-pipelines-tool-lib/tool");
const os = require("os");
const path = require("path");
const request = require("request-promise");
const FLUTTER_TOOL_NAME = 'Flutter';
const FLUTTER_EXE_RELATIVEPATH = 'flutter/bin';
const DART_EXE_RELATIVEPATH = 'cache/dart-sdk/bin';
const FLUTTER_PUB_CACHE_RELATIVEPATH = 'flutter/.pub-cache/bin';
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
const FLUTTER_PUBCACHE_PATH_ENV_VAR = 'FlutterPubCachePath';
const DART_TOOL_PATH_ENV_VAR = 'DartToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Getting current platform identifier
        let arch = findArchitecture();
        // 2. Building version spec
        let mode = task.getInput('mode', true);
        let versionSpec = '';
        let downloadUrl = '';
        if (mode === 'auto') {
            let channel = task.getInput('channel', true);
            let version = task.getInput('version', true);
            let versionData = yield findLatestSdkVersion(channel, arch, version);
            versionSpec = versionData.version;
            downloadUrl = versionData.downloadUrl;
        }
        else {
            downloadUrl = task.getInput('customUrl', true);
            let urlSplits = downloadUrl.split('/');
            versionSpec = urlSplits[urlSplits.length - 1];
        }
        // 3. Check if already available
        task.debug(`Trying to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
        let toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
        if (!toolPath) {
            // 4.1. Downloading SDK
            yield downloadAndCacheSdk(versionSpec, arch, downloadUrl);
            // 4.2. Verifying that tool is now available
            task.debug(`Trying again to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
            toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
        }
        // 5. Creating flutter environment variable
        let fullFlutterPath = path.join(toolPath, FLUTTER_EXE_RELATIVEPATH);
        task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
        task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
        // 5.1 Create flutter pub-cache environment variable
        let fullPubCachePath = path.join(toolPath, FLUTTER_PUB_CACHE_RELATIVEPATH);
        task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullPubCachePath}'`);
        task.setVariable(FLUTTER_PUBCACHE_PATH_ENV_VAR, fullPubCachePath);
        // 5.2 Create dart environment variable
        let fullDartPath = path.join(fullFlutterPath, DART_EXE_RELATIVEPATH);
        task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullDartPath}'`);
        task.setVariable(DART_TOOL_PATH_ENV_VAR, fullDartPath);
        task.setResult(task.TaskResult.Succeeded, "Installed");
    });
}
function findArchitecture() {
    if (os.platform() === 'darwin')
        return "macos";
    else if (os.platform() === 'linux')
        return "linux";
    return "windows";
}
function downloadAndCacheSdk(versionSpec, arch, downloadUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Download SDK archive
        task.debug(`Starting download archive from '${downloadUrl}'`);
        var bundleArchive = yield tool.downloadTool(downloadUrl);
        task.debug(`Succeeded to download '${bundleArchive}' archive from '${downloadUrl}'`);
        // 2. Extracting SDK bundle
        task.debug(`Extracting '${downloadUrl}' archive`);
        var bundleDir;
        if (downloadUrl.endsWith('tar.xz')) {
            bundleDir = yield tool.extractTar(bundleArchive);
        }
        else {
            bundleDir = yield tool.extractZip(bundleArchive);
        }
        task.debug(`Extracted to '${bundleDir}' '${downloadUrl}' archive`);
        // 3. Adding SDK bundle to cache
        task.debug(`Adding '${bundleDir}' to cache (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch})`);
        tool.cacheDir(bundleDir, FLUTTER_TOOL_NAME, versionSpec, arch);
    });
}
function findLatestSdkVersion(channel, arch, version) {
    var arch;
    return __awaiter(this, void 0, void 0, function* () {
        var releasesUrl = `https://storage.googleapis.com/flutter_infra_release/releases/releases_${arch}.json`;
        task.debug(`Finding version '${version}' from '${releasesUrl}'`);
        var body = yield request.get(releasesUrl);
        var json = JSON.parse(body);
        var currentHash = json.current_release[channel];
        arch = os.arch();
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
            }
            else {
                current = json.releases.find((item) => item.channel == channel && uniformizeVersion(item.version) == uniformizeVersion(version));
            }
        }
        task.debug(`Found version hash '${current.hash}'`);
        return {
            version: current.version + '-' + channel,
            downloadUrl: json.base_url + '/' + current.archive,
        };
    });
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
