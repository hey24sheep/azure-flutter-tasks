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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var task = require("azure-pipelines-task-lib/task");
var tool = require("azure-pipelines-tool-lib/tool");
var os = require("os");
var path = require("path");
var request = require("request-promise");
var FLUTTER_TOOL_NAME = 'Flutter';
var FLUTTER_EXE_RELATIVEPATH = 'flutter/bin';
var DART_EXE_RELATIVEPATH = 'cache/dart-sdk/bin';
var FLUTTER_PUB_CACHE_RELATIVEPATH = 'flutter/.pub-cache/bin';
var FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
var FLUTTER_PUBCACHE_PATH_ENV_VAR = 'FlutterPubCachePath';
var DART_TOOL_PATH_ENV_VAR = 'DartToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var arch, mode, versionSpec, downloadUrl, channel, version, versionData, urlSplits, fragSplits, toolPath, fullFlutterPath, fullPubCachePath, fullDartPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    task.debug("[INFO] os.platform() = ".concat(os.platform()));
                    arch = findArchitecture();
                    task.debug("[INFO] Simplified found arch = ".concat(arch));
                    mode = task.getInput('mode', true);
                    versionSpec = '';
                    downloadUrl = '';
                    if (!(mode === 'auto')) return [3 /*break*/, 2];
                    channel = task.getInput('channel', true);
                    version = task.getInput('version', true);
                    return [4 /*yield*/, findLatestSdkVersion(channel, arch, version)];
                case 1:
                    versionData = _a.sent();
                    versionSpec = versionData.semverVersion;
                    downloadUrl = versionData.downloadUrl;
                    return [3 /*break*/, 3];
                case 2:
                    downloadUrl = task.getInput('customUrl', true);
                    urlSplits = downloadUrl.split('/');
                    fragSplits = urlSplits[urlSplits.length - 1].split('_');
                    fragSplits = fragSplits.pop().split('-'); // str is 3.0.2-stable.zip
                    fragSplits.pop(); // remove the last stable.zip part
                    versionSpec = fragSplits.join('-');
                    versionSpec = versionSpec.trim();
                    task.debug("Parsed version '".concat(versionSpec, "' from custom url"));
                    _a.label = 3;
                case 3:
                    // 3. Check if already available
                    task.debug("Trying to get (".concat(FLUTTER_TOOL_NAME, ",").concat(versionSpec, ", ").concat(arch, ") tool from local cache"));
                    toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
                    if (!!toolPath) return [3 /*break*/, 5];
                    // 4.1. Downloading SDK
                    return [4 /*yield*/, downloadAndCacheSdk(versionSpec, arch, downloadUrl)];
                case 4:
                    // 4.1. Downloading SDK
                    _a.sent();
                    // 4.2. Verifying that tool is now available
                    task.debug("Trying again to get (".concat(FLUTTER_TOOL_NAME, ",").concat(versionSpec, ", ").concat(arch, ") tool from local cache"));
                    toolPath = tool.findLocalTool(FLUTTER_TOOL_NAME, versionSpec, arch);
                    _a.label = 5;
                case 5:
                    fullFlutterPath = path.join(toolPath, FLUTTER_EXE_RELATIVEPATH);
                    task.debug("Set ".concat(FLUTTER_TOOL_PATH_ENV_VAR, " with '").concat(fullFlutterPath, "'"));
                    task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
                    task.prependPath(fullFlutterPath);
                    fullPubCachePath = path.join(toolPath, FLUTTER_PUB_CACHE_RELATIVEPATH);
                    task.debug("Set ".concat(DART_TOOL_PATH_ENV_VAR, " with '").concat(fullPubCachePath, "'"));
                    task.setVariable(FLUTTER_PUBCACHE_PATH_ENV_VAR, fullPubCachePath);
                    task.prependPath(fullPubCachePath);
                    fullDartPath = path.join(fullFlutterPath, DART_EXE_RELATIVEPATH);
                    task.debug("Set ".concat(DART_TOOL_PATH_ENV_VAR, " with '").concat(fullDartPath, "'"));
                    task.setVariable(DART_TOOL_PATH_ENV_VAR, fullDartPath);
                    task.prependPath(fullDartPath);
                    task.setResult(task.TaskResult.Succeeded, "Installed");
                    return [2 /*return*/];
            }
        });
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
    return __awaiter(this, void 0, void 0, function () {
        var bundleArchive, bundleDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 1. Download SDK archive
                    task.debug("Starting download archive from '".concat(downloadUrl, "'"));
                    return [4 /*yield*/, tool.downloadTool(downloadUrl)];
                case 1:
                    bundleArchive = _a.sent();
                    task.debug("Succeeded to download '".concat(bundleArchive, "' archive from '").concat(downloadUrl, "'"));
                    // 2. Extracting SDK bundle
                    task.debug("Extracting '".concat(downloadUrl, "' archive"));
                    if (!downloadUrl.endsWith('tar.xz')) return [3 /*break*/, 3];
                    return [4 /*yield*/, tool.extractTar(bundleArchive)];
                case 2:
                    bundleDir = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, tool.extractZip(bundleArchive)];
                case 4:
                    bundleDir = _a.sent();
                    _a.label = 5;
                case 5:
                    task.debug("Extracted to '".concat(bundleDir, "' '").concat(downloadUrl, "' archive"));
                    // 3. Adding SDK bundle to cache
                    task.debug("Adding '".concat(bundleDir, "' to cache (").concat(FLUTTER_TOOL_NAME, ",").concat(versionSpec, ", ").concat(arch, ")"));
                    tool.cacheDir(bundleDir, FLUTTER_TOOL_NAME, versionSpec, arch);
                    return [2 /*return*/];
            }
        });
    });
}
function findLatestSdkVersion(channel, osArch, version) {
    return __awaiter(this, void 0, void 0, function () {
        var releasesUrl, body, json, currentHash, arch, customArch, current, filtered, _i, filtered_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    releasesUrl = "https://storage.googleapis.com/flutter_infra_release/releases/releases_".concat(osArch, ".json");
                    task.debug("Finding version '".concat(version, "' from '").concat(releasesUrl, "'"));
                    return [4 /*yield*/, request.get(releasesUrl)];
                case 1:
                    body = _a.sent();
                    json = JSON.parse(body);
                    currentHash = json.current_release[channel];
                    arch = os.arch();
                    customArch = task.getInput('customArch', false);
                    if (customArch && customArch.trim() !== '') {
                        arch = customArch.trim();
                    }
                    task.debug("Using Arch type '".concat(arch, "'"));
                    current = json.releases.find(function (item) { return item.hash === currentHash && item.channel == channel && item.dart_sdk_arch == arch; });
                    // if user selected custom
                    if (version.toLowerCase() !== 'latest') {
                        // fetch custom version
                        version = task.getInput('customVersion', false);
                        filtered = json.releases.filter(function (item) { return item.channel == channel && uniformizeVersion(item.version) == uniformizeVersion(version); });
                        // if more than 1 release found, that means it has multiple dart_sdk_arch like x64, arm64
                        if (filtered.length > 1) {
                            for (_i = 0, filtered_1 = filtered; _i < filtered_1.length; _i++) {
                                i = filtered_1[_i];
                                // filter releases based on arch type
                                if (i.dart_sdk_arch && i.dart_sdk_arch === arch) {
                                    current = i;
                                    break;
                                }
                                current = i;
                            }
                        }
                        else {
                            current = filtered[0];
                        }
                        task.debug("Found custom version '".concat(current.version, "'"));
                    }
                    task.debug("Found version hash '".concat(current.hash, "'"));
                    return [2 /*return*/, {
                            version: current.version + '-' + channel,
                            downloadUrl: json.base_url + '/' + current.archive,
                            semverVersion: current.version
                        }];
            }
        });
    });
}
// Removes the 'v' prefix from given version.
function uniformizeVersion(version) {
    if (version.startsWith('v')) {
        return version.substring(1);
    }
    return version;
}
main().catch(function (error) {
    task.setResult(task.TaskResult.Failed, error);
});
