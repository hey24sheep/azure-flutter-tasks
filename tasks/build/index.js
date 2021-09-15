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
const path = require("path");
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Check flutter environment
        var flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR] || task.getInput('flutterDirectory', false);
        flutterPath = path.join(flutterPath, "flutter");
        if (!flutterPath) {
            throw new Error(`The '${FLUTTER_TOOL_PATH_ENV_VAR}' environment variable must be set before using this task (you can use 'flutterinstall' task).`);
        }
        // 2. Get target
        let target = task.getInput('target', true);
        // 3. Move current working directory to project
        let projectDirectory = task.getPathInput('projectDirectory', false, false);
        if (projectDirectory) {
            task.debug(`Moving to ${projectDirectory}`);
            task.cd(projectDirectory);
        }
        task.debug(`Project's directory : ${task.cwd()}`);
        // 4. Get common input
        let debugMode = task.getBoolInput('debugMode', false);
        let buildName = task.getInput('buildName', false);
        let buildNumber = task.getInput('buildNumber', false);
        let buildFlavour = task.getInput('buildFlavour', false);
        let entryPoint = task.getInput('entryPoint', false);
        let dartDefine = task.getInput('dartDefine', false);
        let splitPerAbi = task.getBoolInput('splitPerAbi', false);
        let isVerbose = task.getBoolInput('verboseMode', false);
        let extraArgs = task.getInput('extraArgs', false);
        // 5. Builds
        if (target === "all"
            || target === "mobile"
            || target === "ios"
            || target === "ipa") {
            let isIPA = target === "ipa";
            let targetPlatform = task.getInput('iosTargetPlatform', false);
            let codesign = task.getBoolInput('iosCodesign', false);
            let exportOptionsPlist = task.getInput('exportOptionsPlist', false);
            yield buildIpa(flutterPath, targetPlatform == "simulator", codesign, buildName, buildNumber, debugMode, buildFlavour, entryPoint, dartDefine, isVerbose, extraArgs, isIPA, exportOptionsPlist);
        }
        if (target === "all"
            || target === "mobile"
            || target === "apk") {
            let targetPlatform = task.getInput('apkTargetPlatform', false);
            if (targetPlatform === 'custom') {
                targetPlatform = task.getInput('customApkTargetPlatform', true);
            }
            else if (targetPlatform === 'default') {
                targetPlatform = null; // let flutter handle defaults
            }
            yield buildApk(flutterPath, targetPlatform, buildName, buildNumber, debugMode, buildFlavour, entryPoint, splitPerAbi, dartDefine, isVerbose, extraArgs);
        }
        if (target === "all"
            || target === "mobile"
            || target === "aab") {
            yield buildAab(flutterPath, buildName, buildNumber, debugMode, buildFlavour, entryPoint, dartDefine, isVerbose, extraArgs);
        }
        if (target === "all" || target === "web") {
            yield buildWeb(flutterPath, isVerbose, extraArgs);
        }
        if (target === "all"
            || target === "desktop"
            || target === "windows") {
            yield buildDesktop(flutterPath, "windows", isVerbose, entryPoint, extraArgs);
        }
        if (target === "all"
            || target === "desktop"
            || target === "macos") {
            yield buildDesktop(flutterPath, "macos", isVerbose, entryPoint, extraArgs);
        }
        if (target === "all"
            || target === "desktop"
            || target === "linux") {
            yield buildDesktop(flutterPath, "linux", isVerbose, entryPoint, extraArgs);
        }
        task.setResult(task.TaskResult.Succeeded, "Application built");
    });
}
function buildApk(flutter, targetPlatform, buildName, buildNumber, debugMode, buildFlavour, entryPoint, splitPerAbi, dartDefine, isVerbose, extraArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = [
            "build",
            "apk"
        ];
        if (debugMode) {
            args.push("--debug");
        }
        // if null, flutter will set defaults
        if (targetPlatform) {
            args.push("--target-platform=" + targetPlatform);
        }
        if (buildName) {
            args.push("--build-name=" + buildName);
        }
        if (buildNumber) {
            args.push("--build-number=" + buildNumber);
        }
        if (buildFlavour) {
            args.push("--flavor=" + buildFlavour);
        }
        if (entryPoint) {
            args.push("--target=" + entryPoint);
        }
        if (splitPerAbi) {
            args.push("--split-per-abi");
        }
        if (dartDefine) {
            args.push("--dart-define=" + dartDefine);
        }
        if (isVerbose) {
            args.push("--verbose");
        }
        if (extraArgs) {
            args.push(extraArgs);
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("apk build failed");
        }
    });
}
function buildAab(flutter, buildName, buildNumber, debugMode, buildFlavour, entryPoint, dartDefine, isVerbose, extraArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = [
            "build",
            "appbundle"
        ];
        if (debugMode) {
            args.push("--debug");
        }
        if (buildName) {
            args.push("--build-name=" + buildName);
        }
        if (buildNumber) {
            args.push("--build-number=" + buildNumber);
        }
        if (buildFlavour) {
            args.push("--flavor=" + buildFlavour);
        }
        if (entryPoint) {
            args.push("--target=" + entryPoint);
        }
        if (dartDefine) {
            args.push("--dart-define=" + dartDefine);
        }
        if (isVerbose) {
            args.push("--verbose");
        }
        if (extraArgs) {
            args.push(extraArgs);
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("aab build failed");
        }
    });
}
function buildIpa(flutter, simulator, codesign, buildName, buildNumber, debugMode, buildFlavour, entryPoint, dartDefine, isVerbose, extraArgs, isIPA, exportOptionsPlist) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = ["build"];
        if (isIPA) {
            args.push("ipa");
        }
        else {
            args.push("ios");
        }
        if (debugMode) {
            args.push("--debug");
        }
        if (!isIPA) {
            if (simulator) {
                args.push("--simulator");
                if (!debugMode) {
                    args.push("--debug"); // simulator can only be built in debug
                }
            }
            else if (codesign) {
                args.push("--codesign");
            }
            else {
                args.push("--no-codesign");
            }
        }
        if (buildName) {
            args.push("--build-name=" + buildName);
        }
        if (buildNumber) {
            args.push("--build-number=" + buildNumber);
        }
        if (entryPoint) {
            args.push("--target=" + entryPoint);
        }
        if (!simulator) {
            if (buildFlavour) {
                args.push("--flavor=" + buildFlavour);
            }
        }
        if (dartDefine) {
            args.push("--dart-define=" + dartDefine);
        }
        if (isVerbose) {
            args.push("--verbose");
        }
        if (isIPA && exportOptionsPlist) {
            args.push("--export-options-plist=" + exportOptionsPlist);
        }
        if (extraArgs) {
            args.push(extraArgs);
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("ios build failed");
        }
    });
}
function buildWeb(flutter, isVerbose, extraArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = [
            "build",
            "web"
        ];
        if (isVerbose) {
            args.push("--verbose");
        }
        if (extraArgs) {
            args.push(extraArgs);
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("web build failed");
        }
    });
}
function buildDesktop(flutter, os, isVerbose, entryPoint, extraArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = [
            "build",
            os
        ];
        if (isVerbose) {
            args.push("--verbose");
        }
        if (entryPoint) {
            args.push("--target=" + entryPoint);
        }
        if (extraArgs) {
            args.push(extraArgs);
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("desktop (windows) build failed");
        }
    });
}
main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
