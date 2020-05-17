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
const task = require("azure-pipelines-task-lib/task");
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Check flutter environment
        var flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR] || task.getInput('flutterDirectory', false);
        flutterPath = path.join(flutterPath, "flutter");
        if (!flutterPath) {
            throw new Error(`The '${FLUTTER_TOOL_PATH_ENV_VAR}' environment variable must be set before using this task (you can use 'flutterinstall' task).`);
        }
        // 2. Move current working directory to project
        let projectDirectory = task.getPathInput('projectDirectory', false, false);
        if (projectDirectory) {
            task.debug(`Moving to ${projectDirectory}`);
            task.cd(projectDirectory);
        }
        task.debug(`Project's directory : ${task.cwd()}`);
        // 3. Get common input
        let pubGet = task.getBoolInput('pubGet', false);
        // 4. Builds
        yield runAnalyze(flutterPath, pubGet);
        task.setResult(task.TaskResult.Succeeded, "Analyze succeeded");
    });
}
function runAnalyze(flutter, pubGet) {
    return __awaiter(this, void 0, void 0, function* () {
        var args = [
            "analyze",
        ];
        if (pubGet) {
            args.push("--pub");
        }
        else {
            args.push("--no-pub");
        }
        var result = yield task.exec(flutter, args);
        if (result !== 0) {
            throw new Error("Analyze Failed");
        }
    });
}
main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
