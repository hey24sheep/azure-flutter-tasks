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
const path = require("path");
const os = require("os");
const request = require("request-promise");
const task = require("vsts-task-lib/task");
const tool = require("vsts-task-tool-lib/tool");
const FLUTTER_TOOL_NAME = 'Flutter';
const FLUTTER_EXE_RELATIVEPATH = 'flutter/bin';
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Getting current platform identifier
        let arch = findArchitecture();
        // 2. Building version spec
        let channel = task.getInput('channel', true);
        let version = task.getInput('version', true);
        let versionData = yield findLatestSdkVersion(channel, arch, version);
        let versionSpec = versionData.version;
        let downloadUrl = versionData.downloadUrl;
        // 3. Check if already available
        task.debug(`Trying to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
        let toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
        if (!toolPath) {
            // 4.1. Downloading SDK
            yield downloadAndCacheSdk(versionSpec, channel, arch, downloadUrl);
            // 4.2. Verifying that tool is now available
            task.debug(`Trying again to get (${FLUTTER_TOOL_NAME},${versionSpec}, ${arch}) tool from local cache`);
            toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
        }
        // 5. Creating the environment variable
        let fullFlutterPath = path.join(toolPath, FLUTTER_EXE_RELATIVEPATH);
        task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
        task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
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
function downloadAndCacheSdk(versionSpec, channel, arch, downloadUrl) {
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
    return __awaiter(this, void 0, void 0, function* () {
        var releasesUrl = `https://storage.googleapis.com/flutter_infra/releases/releases_${arch}.json`;
        task.debug(`Finding version '${version}' from '${releasesUrl}'`);
        var body = yield request.get(releasesUrl);
        var json = JSON.parse(body);
        var currentHash = json.current_release[channel];
        var current = json.releases.find((item) => item.hash === currentHash && item.channel == channel);
        // if user selected custom
        if (version.toLowerCase() !== 'latest') {
            // fetch custom version
            version = task.getInput('customVersion', false);
            current = json.releases.find((item) => item.channel == channel && version == version);
        }
        task.debug(`Found version hash '${current.hash}'`);
        return {
            version: current.version + '-' + channel,
            downloadUrl: json.base_url + '/' + current.archive,
        };
    });
}
main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
