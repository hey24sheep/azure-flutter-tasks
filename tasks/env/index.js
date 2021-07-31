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
const task = require("azure-pipelines-task-lib");
const path = require("path");
// paths
const FLUTTER_EXE_RELATIVEPATH = 'bin';
const DART_EXE_RELATIVEPATH = 'cache/dart-sdk/bin';
const FLUTTER_PUB_CACHE_RELATIVEPATH = '.pub-cache/bin';
// env variables used as $('<env_var_name>') like $(FlutterToolPath)/flutter
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
const FLUTTER_PUBCACHE_PATH_ENV_VAR = 'FlutterPubCachePath';
const DART_TOOL_PATH_ENV_VAR = 'DartToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Get where to get the path from
        let pathType = task.getInput('pathType', true);
        // 1.1 Getting path
        var flutterDir = task.getInput(pathType, true);
        // 2. Creating flutter environment variable
        let fullFlutterPath = path.join(flutterDir, FLUTTER_EXE_RELATIVEPATH);
        task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
        task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
        // 2.1 Create flutter pub-cache environment variable
        let fullPubCachePath = path.join(flutterDir, FLUTTER_PUB_CACHE_RELATIVEPATH);
        task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullPubCachePath}'`);
        task.setVariable(FLUTTER_PUBCACHE_PATH_ENV_VAR, fullPubCachePath);
        // 2.2 Create dart environment variable
        let fullDartPath = path.join(fullFlutterPath, DART_EXE_RELATIVEPATH);
        task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullDartPath}'`);
        task.setVariable(DART_TOOL_PATH_ENV_VAR, fullDartPath);
        task.setResult(task.TaskResult.Succeeded, "Environment Variables Set");
    });
}
main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
