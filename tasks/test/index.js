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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var path = require("path");
var xml2js = require("xml2js");
var FLUTTER_TOOL_PATH_ENV_VAR = 'FlutterToolPath';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var flutterPath, projectDirectory, testName, testPlainName, updateGoldens, concurrency, canPublishTests, canGenerateCodeCoverage, extraArgs, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flutterPath = task.getVariable(FLUTTER_TOOL_PATH_ENV_VAR) || process.env[FLUTTER_TOOL_PATH_ENV_VAR];
                    flutterPath = path.join(flutterPath, "flutter");
                    if (!flutterPath) {
                        throw new Error("The '".concat(FLUTTER_TOOL_PATH_ENV_VAR, "' environment variable must be set before using this task (you can use 'flutterinstall' task)."));
                    }
                    projectDirectory = task.getPathInput('projectDirectory', false, false);
                    if (projectDirectory) {
                        task.debug("Moving to ".concat(projectDirectory));
                        task.cd(projectDirectory);
                    }
                    testName = task.getInput('testName', false);
                    testPlainName = task.getInput('testPlainName', false);
                    updateGoldens = task.getBoolInput('updateGoldens', false);
                    concurrency = task.getInput('concurrency', false);
                    canPublishTests = task.getInput('publishTests', false);
                    canGenerateCodeCoverage = task.getBoolInput("generateCodeCoverageReport", false);
                    extraArgs = task.getDelimitedInput('extraArgs', ',', false);
                    return [4 /*yield*/, runTests(flutterPath, (concurrency ? Number(concurrency) : null), updateGoldens, testName, testPlainName, canGenerateCodeCoverage, extraArgs)];
                case 1:
                    results = _a.sent();
                    if (!canPublishTests) return [3 /*break*/, 3];
                    return [4 /*yield*/, publishTests(results)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    if (results.isSuccess) {
                        task.setResult(task.TaskResult.Succeeded, "All tests passed");
                    }
                    else {
                        task.setResult(task.TaskResult.Failed, "Some tests failed");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function publishTests(results) {
    return __awaiter(this, void 0, void 0, function () {
        var publisher, junitResults, xmlBuilder, xml, xmlPath;
        return __generator(this, function (_a) {
            publisher = new task.TestPublisher("JUnit");
            task.debug("results: " + JSON.stringify(results));
            junitResults = createJunitResults(results);
            xmlBuilder = new xml2js.Builder();
            xml = xmlBuilder.buildObject(junitResults);
            xmlPath = path.join(task.cwd(), "junit.xml");
            task.writeFile(xmlPath, xml);
            // 2. Publishing to task
            publisher.publish([xmlPath], "false", "", "", "VSTS - Flutter", "true", "");
            return [2 /*return*/];
        });
    });
}
function runTests(flutter, concurrency, updateGoldens, name, plainName, canGenerateCodeCoverage, extraArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var testRunner, currentSuite, allSuitesDict, results, globalFailure, _a, allKeys;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    testRunner = task.tool(flutter);
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
                    currentSuite = {
                        title: undefined,
                        isSuccess: false,
                        succeeded: 0,
                        failed: 0,
                        cases: []
                    };
                    allSuitesDict = {};
                    results = {
                        isSuccess: false,
                        suites: []
                    };
                    globalFailure = 0;
                    testRunner.on('stdout', function (line) {
                        var filename = undefined;
                        var allTestRegex = /\s*\d\d:\d\d (\+\d+)?(\s+\-\d+)?:\s* \s*(.*\.dart)\s*/;
                        var filenameRegex = /(\w+.dart)/;
                        var allRegexResult = allTestRegex.exec(line);
                        if (allRegexResult && allRegexResult[3]) {
                            var filepath = allRegexResult[3];
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
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, testRunner.exec()];
                case 2:
                    _b.sent();
                    results.isSuccess = true;
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    allKeys = Object.keys(allSuitesDict);
                    allKeys.forEach(function (k) {
                        results.suites.push(allSuitesDict[k]);
                    });
                    return [2 /*return*/, results];
            }
        });
    });
}
function createTestCase(suite, output, globalFailure) {
    var testRunRegex = /\s*\d\d:\d\d (\+\d+)?(\s+\-\d+)?:\s*(.*)/;
    var match = testRunRegex.exec(output);
    if (match) {
        var title = match[3];
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
        if (hasNewCase) {
            if (suite.cases.length > 0) {
                suite.cases[suite.cases.length - 1].ended = newCase.started;
            }
        }
        var caseExistsIdx = suite.cases.findIndex(function (i) {
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
    results.suites.forEach(function (suite) {
        var testCases = [];
        suite.cases.forEach(function (c) {
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
main().catch(function (error) {
    task.setResult(task.TaskResult.Failed, error);
});
