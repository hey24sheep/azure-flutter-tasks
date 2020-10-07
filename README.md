# Flutter for Azure DevOps

[Flutter](http://flutter.io) build task for [Azure DevOps](https://azure.microsoft.com/fr-fr/services/devops/).

All credit goes to original author for his awesome work.
This extension is custom/updated/maintained fork of Alois Deniel's extension [Github](https://github.com/aloisdeniel/vsts-flutter-tasks)

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=hey24sheep.flutter).

## Source Code

Source code can be found on [Github](https://github.com/hey24sheep/vsts-flutter-tasks).

Original Author : [Github](https://github.com/aloisdeniel/vsts-flutter-tasks).

## Usage

Add the tasks to your build definition.

### Install

![](images/step_install.png)

Installs the [Flutter SDK](https://flutter.io/sdk-archive/) onto the running agent if not already installed. Then uses it for following tasks.

* Select the `channel`: `stable (default)`, `beta`, or `dev`.
* Select the `version` of the SDK to install:  `latest (default)`, `custom`. If `custom` is specified, a `custom version` must be set.
* _(Optional)_. Set the `custom version` (in a `<M>.<m>.<p>` semver format) if needed for example : 'v1.22+3' or '1.17.0'.

### Build

![](images/step_build.png)

Build the given mobile application project. You must call the `Flutter Install` task, set a `FlutterToolPath` environment variable, or use the optional Flutter SDK Path task entry that points to your `flutter/bin` folder before execution. All the application bundles are created into the `build/outputs` folder of your project.

* Select the `project source directory` (that contains to `pubspec.yaml` file).
* Select the `target` platform: `Android (default)`, `iOS`, or `All` for both.
* _(Optional)_. Set `flutter sdk path` if using a local agent with a pre-installed Flutter SDK, can specify the path to utilize it.  Otherwise use Flutter Install.
* _(Optional)_. Set `package name` (like `1.2.3`) that will override the manifest's one.
* _(Optional)_. Set `package number` (like `12`) that will override the manifest's one.
* _(Optional)_. Set `build flavour` (like `development`) to specify a build flavour.  Must match Android Gradle flavor definition or XCode scheme.
* _(Optional)_. Set `verbose` if you wish to get detailed verbose log output for diagnoses purposes.
* _(Optional)_. Set `debug` if you wish to override the default release mode for the build.
* _(Optional)_. Set `dart-define` compile-time variables. Example : "Some_Var=Some_val --dart-define=Some_Var2=Val"
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments. Example : "--no-tree-shake-icons --publish-to-play"
* __(Android)__._(Optional)_. Set `platform` for the Android target: `android-arm (default)`, `android-arm64`.
* __(Android)__._(Optional)_. Set the build mode `split-per-abi` to compile the code into an APK per target ABI.  Otherwise the build will result in a single APK.
* __(iOS)__._(Optional)_. Set `platform` for the iOS target: `device (default)`, `simulator`.
* __(iOS)__._(Optional)_. Codesign the application bundle (only available on device builds, and activated by default). **Warning: you must install a valid certificate before build with the `Install an Apple Certificate`task**

### Test

![](images/step_test.png)

Launch tests and publish a report as build test results.

* Select the `project source directory` (that contains to `pubspec.yaml` file).
* _(Optional)_. Set `test name` as a regular expression matching substrings of the names of tests to run.
* _(Optional)_. Set `Test plain name` as a plain-text substring of the names of tests to run.
* _(Optional)_. Set `Test plain name` as a plain-text substring of the names of tests to run.
* _(Optional)_. Set `update goldens`: whether `matchesGoldenFile()` calls within your test methods should update the golden files rather than test for an existing match.
* _(Optional)_. The number of `concurrent` test processes to run. (defaults to `6`)

### Analyze

![](images/step_analyze.png)

Launch analyze on flutter directory.

* Select the `project source directory` (that contains to `pubspec.yaml` file).
* _(Optional)_. Set `pub get` if you wish to pub get before analyze: `true (default)`.


### Command

![](images/step_command.png)

Launch a Flutter command with custom arguments.


## FAQ


> Flutter command isn't recognized ?

Make sure that you have a `Flutter Install` at the beginning of your definition.

> Can I run a custom Flutter command ?

Yes, right after the `Flutter Install` task, a `FlutterToolPath` environment variable points to the `bin` of the Flutter SDK directory. You just have to use `$(FlutterToolPath)` in your following tasks. Example command "$(FlutterToolPath)/flutter packages get"

> Can I run Dart program ?

Yes, actually a Dart runtime is embedded with Flutter tools (in the `/cache/dart-sdk/bin` subdirectory). 

A task example :

```yaml
- task: CmdLine@2
  displayName: 'Execute Dart program'
  inputs:
    script: '$(FlutterToolPath)/cache/dart-sdk/bin/dart program.dart arg1 arg2'
    workingDirectory: 'src'
```

## License

[MIT](https://raw.githubusercontent.com/hey24sheep/vsts-flutter-tasks/master/LICENSE)
