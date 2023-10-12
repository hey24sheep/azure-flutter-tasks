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
const xml2js = require("xml2js");
const FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Check flutter environment
        var flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR];
        flutterPath = path.join(flutterPath, "flutter");
        if (!flutterPath) {
            throw new Error(`The '${FLUTTER_TOOL_PATH_ENV_VAR}' environment variable must be set before using this task (you can use 'flutterinstall' task).`);
        }
        // 3. Move current working directory to project
        let projectDirectory = task.getPathInput('projectDirectory', false, false);
        if (projectDirectory) {
            task.debug(`Moving to ${projectDirectory}`);
            task.cd(projectDirectory);
        }
        // 4. Get inputs
        let testName = task.getInput('testName', false);
        let testPlainName = task.getInput('testPlainName', false);
        let updateGoldens = task.getBoolInput('updateGoldens', false);
        let concurrency = task.getInput('concurrency', false);
        let canPublishTests = task.getInput('publishTests', false);
        let canGenerateCodeCoverage = task.getBoolInput("generateCodeCoverageReport", false);
        let extraArgs = task.getDelimitedInput('extraArgs', ',', false);
        // 5. Running tests
        var results = yield runTests(flutterPath, (concurrency ? Number(concurrency) : null), updateGoldens, testName, testPlainName, canGenerateCodeCoverage, extraArgs);
        // 6. Publishing tests
        if (canPublishTests) {
            yield publishTests(results);
        }
        if (results.isSuccess) {
            task.setResult(task.TaskResult.Succeeded, `All tests passed`);
        }
        else {
            task.setResult(task.TaskResult.Failed, `Some tests failed`);
        }
    });
}
function publishTests(results) {
    return __awaiter(this, void 0, void 0, function* () {
        var publisher = new task.TestPublisher("JUnit");
        task.debug(`results: ` + JSON.stringify(results));
        // 1. Generating Junit XML result file
        var junitResults = createJunitResults(results);
        var xmlBuilder = new xml2js.Builder();
        var xml = xmlBuilder.buildObject(junitResults);
        var xmlPath = path.join(task.cwd(), "junit.xml");
        task.writeFile(xmlPath, xml);
        // 2. Publishing to task
        publisher.publish([xmlPath], "false", "", "", "VSTS - Flutter", "true", "");
    });
}
function runTests(flutter, concurrency, updateGoldens, name, plainName, canGenerateCodeCoverage, extraArgs) {
    return __awaiter(this, void 0, void 0, function* () {
        let testRunner = task.tool(flutter);
        testRunner.arg(['test', '--pub']);
        if (updateGoldens) {
            testRunner.arg("--update-goldens");
        }
        if (canGenerateCodeCoverage) {
            testRunner.arg("--coverage");
        }
        if (name) {
            testRunner.arg("--name=" + name);
        }
        if (plainName) {
            testRunner.arg("--plain-name=" + plainName);
        }
        if (concurrency) {
            testRunner.arg("--concurrency=" + concurrency);
        }
        if (extraArgs && extraArgs.length > 0) {
            testRunner.arg(extraArgs);
        }
        var currentSuite = {
            title: undefined,
            isSuccess: false,
            succeeded: 0,
            failed: 0,
            cases: []
        };
        var allSuitesDict = {};
        var results = {
            isSuccess: false,
            suites: []
        };
        let globalFailure = 0;
        testRunner.on('stdout', line => {
            let filename = undefined;
            const allTestRegex = /\s*\d\d:\d\d (\+\d+)?(\s+\-\d+)?:\s* \s*(.*\.dart)\s*/;
            const filenameRegex = /(\w+.dart)/;
            const allRegexResult = allTestRegex.exec(line);
            if (allRegexResult && allRegexResult[3]) {
                const filepath = allRegexResult[3];
                if (filepath) {
                    filename = filenameRegex.exec(filepath)[0];
                }
            }
            var newSuite = {
                title: filename ? filename : undefined,
                isSuccess: false,
                succeeded: 0,
                failed: 0,
                cases: []
            };
            if (allSuitesDict[newSuite.title]) {
                currentSuite = allSuitesDict[newSuite.title];
            }
            else {
                currentSuite = newSuite;
            }
            currentSuite = createTestCase(currentSuite, line, globalFailure);
            allSuitesDict[currentSuite.title] = currentSuite;
        });
        try {
            yield testRunner.exec();
            results.isSuccess = true;
        }
        catch (_a) { }
        var allKeys = Object.keys(allSuitesDict);
        allKeys.forEach((k) => {
            results.suites.push(allSuitesDict[k]);
        });
        return results;
    });
}
function createTestCase(suite, output, globalFailure) {
    const testRunRegex = /\s*\d\d:\d\d (\+\d+)?(\s+\-\d+)?:\s*(.*)/;
    let match = testRunRegex.exec(output);
    if (match) {
        var tSplits = match[3].split(': ');
        var title = tSplits[tSplits.length - 1];
        var successes = Number(match[1]);
        var failures = match[2] ? -Number(match[2]) : suite.failed;
        var newCase = {
            title: title.trim(),
            isSuccess: false,
            started: new Date(),
            ended: new Date,
        };
        var hasNewCase = false;
        if (suite.succeeded !== successes) {
            newCase.isSuccess = true;
            hasNewCase = true;
        }
        else if (suite.failed !== failures) {
            newCase.isSuccess = false;
            hasNewCase = true;
        }
        else if (suite.cases.length <= 0
            && suite.succeeded === 0
            && successes === 0
            && suite.failed === 0
            && failures === 0) {
            // handles initial test, as it is always empty with everything as 0 or empty 
            // index in test starts with 0
            // everything is 0 meaning it's a new case
            newCase.isSuccess = true;
            hasNewCase = true;
        }
        else {
            newCase.isSuccess = true;
            hasNewCase = true;
        }
        if (hasNewCase) {
            if (suite.cases.length > 0) {
                suite.cases[suite.cases.length - 1].ended = newCase.started;
            }
        }
        const caseExistsIdx = suite.cases.findIndex((i) => {
            return i.title.toString().trim() === newCase.title.toString().trim();
        });
        if (caseExistsIdx < 0 || !suite.cases[caseExistsIdx].isSuccess) {
            // only add cases if they are not added before
            // checks if case doesn't exist or already added with success
            suite.cases.push(newCase);
        }
        if (newCase.isSuccess) {
            suite.succeeded += 1;
        }
        else {
            suite.failed += 1;
        }
        // console.log('\n', '\x1b[36m',
        //     'Suite : ', suite, successes, failures,
        //     '\x1b[0m', '\n');
    }
    return suite;
}
function createJunitResults(results) {
    var testSuites = [];
    results.suites.forEach(suite => {
        var testCases = [];
        suite.cases.forEach(c => {
            var duration = (c.ended.getTime() - c.started.getTime());
            var s = (duration / 1000);
            var testCase = {
                "$": {
                    "name": c.title,
                    "classname": c.title,
                    "time": s,
                }
            };
            if (!c.isSuccess) {
                testCase["failure"] = {
                    "$": {
                        "type": "FlutterError",
                    }
                };
            }
            testCases.push(testCase);
        });
        var testSuite = {
            "$": {
                "name": suite.title,
                "timestamp": new Date().toISOString(),
                "errors": 0,
                "skipped": 0,
                "failures": suite.failed,
                "tests": (suite.failed + suite.succeeded)
            },
            "testcase": testCases
        };
        testSuites.push(testSuite);
    });
    return {
        "testsuites": {
            "testsuite": testSuites
        }
    };
}
main().catch(error => {
    task.setResult(task.TaskResult.Failed, error);
});
