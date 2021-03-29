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

	// get args
    let pubGetArg = task.getBoolInput('pubGet', false);

	// 3. Get common input
	let pubGet = task.getBoolInput('pubGet', pubGetArg);

	// 4. Builds
	await runAnalyze(flutterPath, pubGet);

	task.setResult(task.TaskResult.Succeeded, "Analyze succeeded");
}

async function runAnalyze(flutter: string, pubGet?: boolean) {

	var args = [
		"analyze",
	];

	if (pubGet) {
		args.push("--pub");
	} else {
		args.push("--no-pub");
	}

	var result = await task.exec(flutter, args);

	if (result !== 0) {
		throw new Error("Analyze Failed");
	}
}

main().catch(error => {
	task.setResult(task.TaskResult.Failed, error);
});