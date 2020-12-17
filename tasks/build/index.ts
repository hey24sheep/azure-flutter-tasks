import * as task from "azure-pipelines-task-lib/task";
import * as path from "path";

const FLUTTER_TOOL_PATH_ENV_VAR: string = 'FlutterToolPath';

async function main(): Promise<void> {
    // 1. Check flutter environment
    var flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR] || task.getInput('flutterDirectory', false);
    flutterPath = path.join(flutterPath, "flutter")
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
        || target === "ios") {
        let targetPlatform = task.getInput('iosTargetPlatform', false);
        let codesign = task.getBoolInput('iosCodesign', false);
        await buildIpa(
            flutterPath,
            targetPlatform == "simulator",
            codesign,
            buildName,
            buildNumber,
            debugMode,
            buildFlavour,
            entryPoint,
            dartDefine,
            isVerbose,
            extraArgs);
    }

    if (target === "all"
        || target === "mobile"
        || target === "apk") {
        let targetPlatform = task.getInput('apkTargetPlatform', false);
        await buildApk(
            flutterPath,
            targetPlatform,
            buildName,
            buildNumber,
            debugMode,
            buildFlavour,
            entryPoint,
            splitPerAbi,
            dartDefine,
            isVerbose,
            extraArgs);
    }

    if (target === "all"
        || target === "mobile"
        || target === "aab") {
        await buildAab(
            flutterPath,
            buildName,
            buildNumber,
            debugMode,
            buildFlavour,
            entryPoint,
            isVerbose,
            extraArgs);
    }

    if (target === "all" || target === "web") {
        await buildWeb(flutterPath, isVerbose, extraArgs);
    }

    if (target === "all"
        || target === "desktop"
        || target === "windows") {
        await buildDesktop(flutterPath, "windows", isVerbose, extraArgs);
    }

    if (target === "all"
        || target === "desktop"
        || target === "macos") {
        await buildDesktop(flutterPath, "macos", isVerbose, extraArgs);
    }

    if (target === "all"
        || target === "desktop"
        || target === "linux") {
        await buildDesktop(flutterPath, "linux", isVerbose, extraArgs);
    }

    task.setResult(task.TaskResult.Succeeded, "Application built");
}

async function buildApk(
    flutter: string,
    targetPlatform?: string,
    buildName?: string,
    buildNumber?: string,
    debugMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    splitPerAbi?: boolean,
    dartDefine?: string,
    isVerbose?: boolean,
    extraArgs?: string) {

    var args = [
        "build",
        "apk"
    ];

    if (debugMode) {
        args.push("--debug");
    }

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

    var result = await task.exec(flutter, args);

    if (result !== 0) {
        throw new Error("apk build failed");
    }
}

async function buildAab(
    flutter: string,
    buildName?: string,
    buildNumber?: string,
    debugMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    isVerbose?: boolean,
    extraArgs?: string) {

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

    if (isVerbose) {
        args.push("--verbose");
    }

    if (extraArgs) {
        args.push(extraArgs);
    }

    var result = await task.exec(flutter, args);

    if (result !== 0) {
        throw new Error("aab build failed");
    }
}

async function buildIpa(
    flutter: string,
    simulator?: boolean,
    codesign?: boolean,
    buildName?: string,
    buildNumber?: string,
    debugMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    dartDefine?: string,
    isVerbose?: boolean,
    extraArgs?: string) {

    var args = [
        "build",
        "ios"
    ];

    if (debugMode) {
        args.push("--debug");
    }

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

    if (extraArgs) {
        args.push(extraArgs);
    }

    var result = await task.exec(flutter, args);
    if (result !== 0) {
        throw new Error("ios build failed");
    }
}

async function buildWeb(
    flutter: string,
    isVerbose?: boolean,
    extraArgs?: string) {

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

    var result = await task.exec(flutter, args);

    if (result !== 0) {
        throw new Error("web build failed");
    }
}

async function buildDesktop(
    flutter: string,
    os: string,
    isVerbose?: boolean,
    extraArgs?: string) {

    var args = [
        "build",
        os
    ];

    if (isVerbose) {
        args.push("--verbose");
    }

    if (extraArgs) {
        args.push(extraArgs);
    }

    var result = await task.exec(flutter, args);

    if (result !== 0) {
        throw new Error("desktop (windows) build failed");
    }
}

main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
