"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mr = require("azure-pipelines-task-lib/mock-run");
var fs = require("fs");
var path = require("path");
var taskPath = path.join(__dirname, "../index.js");
var runner = new mr.TaskMockRunner(taskPath);
function assertDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}
// ENV
var rootPath = path.join(__dirname, "..", "..", "..");
var tempPath = path.join(rootPath, "temp");
var agentPath = path.join(tempPath, "agent");
var dropPath = path.join(tempPath, "drop");
process.env["BUILD_BUILDNUMBER"] = "1";
assertDirectory(tempPath);
assertDirectory(agentPath);
assertDirectory(dropPath);
assertDirectory(process.env["AGENT_HOMEDIRECTORY"] = path.join(agentPath, "home"));
assertDirectory(process.env["AGENT_TOOLSDIRECTORY"] = path.join(agentPath, "tools"));
assertDirectory(process.env["AGENT_TEMPDIRECTORY"] = path.join(agentPath, "temp"));
assertDirectory(process.env["AGENT_BUILDDIRECTORY"] = path.join(agentPath, "build"));
// Run install tests
process.env["FlutterToolPath"] = path.join(agentPath, "tools", "Flutter", "3.10.6", "windows", "flutter", "bin");
runner.setInput("projectDirectory", path.join(rootPath, "sample_project"));
runner.setInput("publishTests", "true");
runner.run(true);
