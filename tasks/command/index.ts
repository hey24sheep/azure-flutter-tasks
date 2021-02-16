import * as path from "path";
import * as task from "azure-pipelines-task-lib/task";

const FLUTTER_TOOL_PATH_ENV_VAR: string = 'FlutterToolPath';

async function main(): Promise<void> {
    // 1. Check flutter environment
    var flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR] || task.getInput('flutterDirectory', false);
    flutterPath = path.join(flutterPath, "flutter")
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

    let args = task.getInput('arguments', false);
    let splittedArgs = args.split(' ')
        .map(function (x) {
            return x.trim();
        })
        .filter(function (x) {
            return x.length;
        });

    var result = await task.exec(flutterPath, splittedArgs);

    if (result !== 0) {
        task.setResult(task.TaskResult.Failed, "Command execution failed");
    }
    else {
        task.setResult(task.TaskResult.Succeeded, "Commaned execution succeeded");
    }

}

main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
