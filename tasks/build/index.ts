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
    let profileMode = task.getBoolInput('profileMode', false);
    let buildName = task.getInput('buildName', false);
    let buildNumber = task.getInput('buildNumber', false);
    if (buildNumber) {
        let buildNumberSplits = buildNumber.split('.');
        if (buildNumberSplits) {
            // handle decimal, if buildNumber is like "1234.1"
            buildNumber = buildNumberSplits[0];
        }
    }
    let buildFlavour = task.getInput('buildFlavour', false);
    let entryPoint = task.getInput('entryPoint', false);
    let dartDefine = task.getInput('dartDefine', false);
    let dartDefineMulti = task.getInput('dartDefineMulti', false);
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

        await buildIpa(
            flutterPath,
            targetPlatform == "simulator",
            codesign,
            buildName,
            buildNumber,
            debugMode,
            profileMode,
            buildFlavour,
            entryPoint,
            dartDefine,
            dartDefineMulti,
            isVerbose,
            extraArgs,
            isIPA,
            exportOptionsPlist);
    }

    if (target === "all"
        || target === "mobile"
        || target === "apk") {
        let targetPlatform = task.getInput('apkTargetPlatform', false);
        if (targetPlatform === 'custom') {
            targetPlatform = task.getInput('customApkTargetPlatform', true);
        } else if (targetPlatform === 'default') {
            targetPlatform = null; // let flutter handle defaults
        }
        await buildApk(
            flutterPath,
            targetPlatform,
            buildName,
            buildNumber,
            debugMode,
            profileMode,
            buildFlavour,
            entryPoint,
            splitPerAbi,
            dartDefine,
            dartDefineMulti,
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
            profileMode,
            buildFlavour,
            entryPoint,
            dartDefine,
            dartDefineMulti,
            isVerbose,
            extraArgs);
    }

    if (target === "all" || target === "web") {
        await buildWeb(
            flutterPath, 
            isVerbose, 
            debugMode,
            profileMode,
            extraArgs, 
            dartDefine, 
            dartDefineMulti,
            entryPoint);
    }

    if (target === "all"
        || target === "desktop"
        || target === "windows") {
        await buildDesktop(
            flutterPath,
            "windows",
            isVerbose,
            debugMode,
            profileMode,
            entryPoint,
            extraArgs,
            dartDefine,
            dartDefineMulti);
    }

    if (target === "all"
        || target === "desktop"
        || target === "macos") {
        await buildDesktop(
            flutterPath,
            "macos",
            isVerbose,
            debugMode,
            profileMode,
            entryPoint,
            extraArgs,
            dartDefine,
            dartDefineMulti);
    }

    if (target === "all"
        || target === "desktop"
        || target === "linux") {
        await buildDesktop(
            flutterPath,
            "linux",
            isVerbose,
            debugMode,
            profileMode,
            entryPoint,
            extraArgs,
            dartDefine,
            dartDefineMulti);
    }

    task.setResult(task.TaskResult.Succeeded, "Application built");
}

async function buildApk(
    flutter: string,
    targetPlatform?: string,
    buildName?: string,
    buildNumber?: string,
    debugMode?: boolean,
    profileMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    splitPerAbi?: boolean,
    dartDefine?: string,
    dartDefineMulti?: string,
    isVerbose?: boolean,
    extraArgs?: string) {

    var args = [
        "build",
        "apk"
    ];

    if (debugMode) {
        args.push("--debug");
    } else if (profileMode) {
        args.push("--profile");
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
        var splitted = dartDefine.split(" ");
        if (splitted && splitted.length > 0) {
            args.push("--dart-define=" + splitted[0]);
            args.push(...splitted.splice(1));
        }
    }

    if (dartDefineMulti) {
        // should be like key1=val1 key2=val2
        var splitted = dartDefineMulti.split(" ");
        splitted.map((i) => {
            // single split val should be like key1=val1
            args.push('--dart-define=' + i);
        });
    }

    if (isVerbose) {
        args.push("--verbose");
    }

    if (extraArgs) {
        var splitted = extraArgs.split(" ");
        args.push(...splitted);
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
    profileMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    dartDefine?: string,
    dartDefineMulti?: string,
    isVerbose?: boolean,
    extraArgs?: string) {

    var args = [
        "build",
        "appbundle"
    ];

    if (debugMode) {
        args.push("--debug");
    } else if (profileMode) {
        args.push("--profile");
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
        var splitted = dartDefine.split(" ");
        if (splitted && splitted.length > 0) {
            args.push("--dart-define=" + splitted[0]);
            args.push(...splitted.splice(1));
        }
    }

    if (dartDefineMulti) {
        // should be like key1=val1 key2=val2
        var splitted = dartDefineMulti.split(" ");
        splitted.map((i) => {
            // single split val should be like key1=val1
            args.push('--dart-define=' + i);
        });
    }

    if (isVerbose) {
        args.push("--verbose");
    }

    if (extraArgs) {
        var splitted = extraArgs.split(" ");
        args.push(...splitted);
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
    profileMode?: boolean,
    buildFlavour?: string,
    entryPoint?: string,
    dartDefine?: string,
    dartDefineMulti?: string,
    isVerbose?: boolean,
    extraArgs?: string,
    isIPA?: boolean,
    exportOptionsPlist?: string) {

    var args = ["build"];

    if (isIPA) {
        args.push("ipa");
    } else {
        args.push("ios");
    }

    if (debugMode) {
        args.push("--debug");
    } else if (profileMode) {
        args.push("--profile");
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
        var splitted = dartDefine.split(" ");
        if (splitted && splitted.length > 0) {
            args.push("--dart-define=" + splitted[0]);
            args.push(...splitted.splice(1));
        }
    }

    if (dartDefineMulti) {
        // should be like key1=val1 key2=val2
        var splitted = dartDefineMulti.split(" ");
        splitted.map((i) => {
            // single split val should be like key1=val1
            args.push('--dart-define=' + i);
        });
    }

    if (isVerbose) {
        args.push("--verbose");
    }

    if (isIPA && exportOptionsPlist) {
        args.push("--export-options-plist=" + exportOptionsPlist);
    }

    if (extraArgs) {
        var splitted = extraArgs.split(" ");
        args.push(...splitted);
    }

    var result = await task.exec(flutter, args);
    if (result !== 0) {
        throw new Error("ios build failed");
    }
}

async function buildWeb(
    flutter: string,
    isVerbose?: boolean,
    debugMode?: boolean,
    profileMode?: boolean,
    extraArgs?: string,
    dartDefine?: string,
    dartDefineMulti?: string,
    entryPoint?: string,) {

    var args = [
        "build",
        "web"
    ];

    if (isVerbose) {
        args.push("--verbose");
    }

    if (debugMode) {
        args.push("--debug");
    } else if (profileMode) {
        args.push("--profile");
    }

    if (extraArgs) {
        var splitted = extraArgs.split(" ");
        args.push(...splitted);
    }

    if (dartDefine) {
        var splitted = dartDefine.split(" ");
        if (splitted && splitted.length > 0) {
            args.push("--dart-define=" + splitted[0]);
            args.push(...splitted.splice(1));
        }
    }

    if (dartDefineMulti) {
        // should be like key1=val1 key2=val2
        var splitted = dartDefineMulti.split(" ");
        splitted.map((i) => {
            // single split val should be like key1=val1
            args.push('--dart-define=' + i);
        });
    }

    if (entryPoint) {
        args.push("--target=" + entryPoint);
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
    debugMode?: boolean,
    profileMode?: boolean,
    entryPoint?: string,
    extraArgs?: string,
    dartDefine?: string,
    dartDefineMulti?: string,) {

    var args = [
        "build",
        os
    ];

    if (isVerbose) {
        args.push("--verbose");
    }

    if (debugMode) {
        args.push("--debug");
    } else if (profileMode) {
        args.push("--profile");
    }

    if (entryPoint) {
        args.push("--target=" + entryPoint);
    }

    if (dartDefine) {
        var splitted = dartDefine.split(" ");
        if (splitted && splitted.length > 0) {
            args.push("--dart-define=" + splitted[0]);
            args.push(...splitted.splice(1));
        }
    }

    if (dartDefineMulti) {
        // should be like key1=val1 key2=val2
        var splitted = dartDefineMulti.split(" ");
        splitted.map((i) => {
            // single split val should be like key1=val1
            args.push('--dart-define=' + i);
        });
    }

    if (extraArgs) {
        var splitted = extraArgs.split(" ");
        args.push(...splitted);
    }

    var result = await task.exec(flutter, args);

    if (result !== 0) {
        throw new Error("desktop (windows) build failed");
    }
}

main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
