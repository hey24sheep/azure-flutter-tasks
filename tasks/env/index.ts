import * as task from "azure-pipelines-task-lib/task";
import * as path from 'path';

// paths
const FLUTTER_EXE_RELATIVEPATH = 'bin';
const DART_EXE_RELATIVEPATH = 'cache/dart-sdk/bin';
const FLUTTER_PUB_CACHE_RELATIVEPATH = '.pub-cache';

// env variables used as $('<env_var_name>') like $(FlutterToolPath)/flutter
const FLUTTER_TOOL_PATH_ENV_VAR: string = 'FlutterToolPath';
const FLUTTER_PUBCACHE_PATH_ENV_VAR: string = 'FlutterPubCachePath';
const DART_TOOL_PATH_ENV_VAR: string = 'DartToolPath';

async function main(): Promise<void> {
	// 1. Get where to get the path from
	let pathType = task.getInput('pathType', true);
	var flutterDir = '';

	// 1.1 Getting path
	if (pathType === 'customPath') {
		flutterDir = task.getInput('customPath', true);
	} else {
		flutterDir = task.getPathInput('flutterDirectory', true);
	}

	// 2. Creating flutter environment variable
	let fullFlutterPath: string = path.join(flutterDir, FLUTTER_EXE_RELATIVEPATH);
	task.debug(`Set ${FLUTTER_TOOL_PATH_ENV_VAR} with '${fullFlutterPath}'`);
	task.setVariable(FLUTTER_TOOL_PATH_ENV_VAR, fullFlutterPath);
	task.prependPath(fullFlutterPath);

	// 2.1 Create flutter pub-cache environment variable
	let fullPubCachePath: string = path.join(flutterDir, FLUTTER_PUB_CACHE_RELATIVEPATH);
	task.debug(`Set ${FLUTTER_PUBCACHE_PATH_ENV_VAR} with '${fullPubCachePath}'`);
	task.setVariable(FLUTTER_PUBCACHE_PATH_ENV_VAR, fullPubCachePath);
	task.prependPath(fullPubCachePath);

	// 2.2 Create dart environment variable
	let fullDartPath: string = path.join(fullFlutterPath, DART_EXE_RELATIVEPATH);
	task.debug(`Set ${DART_TOOL_PATH_ENV_VAR} with '${fullDartPath}'`);
	task.setVariable(DART_TOOL_PATH_ENV_VAR, fullDartPath);
	task.prependPath(fullDartPath);

	task.setResult(task.TaskResult.Succeeded, "Environment Variables Set");
}

main().catch(error => {
	task.setResult(task.TaskResult.Failed, error);
});
