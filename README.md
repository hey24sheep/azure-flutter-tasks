# Flutter for Azure DevOps 

[Flutter](http://flutter.io) build task for [Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/).

All credit goes to the original author for his awesome work.
This extension is a custom/updated/maintained fork of Alois Deniel's extension [Github](https://github.com/aloisdeniel/vsts-flutter-tasks)

<p>
<a href="https://www.buymeacoffee.com/hey24sheep" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174">
</a>
</p>

## Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=hey24sheep.flutter).

## Source Code

Source code can be found on [Github](https://github.com/hey24sheep/vsts-flutter-tasks).

Original repo : [Github](https://github.com/aloisdeniel/vsts-flutter-tasks).

## Usage

Add the tasks to your build definition.

### Install

![](images/step_install.png)

Installs the [Flutter SDK](https://flutter.io/sdk-archive/) onto the running agent if not already installed. Then uses it for following tasks.

* Select the `channel`: `stable` (default), `beta`, or `dev`.
* Select the `version` of the SDK to install:  `latest` (default), `custom`. If `custom` is specified, a `customVersion` must be set.
* _(Optional)_. Set the `customVersion` (in a `<M>.<m>.<p>` semver format) if needed.

### Build

![](images/step_build.png)

Build the given mobile application project. You must call the `Flutter Install` task or use the optional `flutterDirectory` task input that points to your `flutter/bin` folder before execution. All application bundles are created in the `build/outputs` folder of your project.

* Select the `projectDirectory` that contains the `pubspec.yaml` file.
* Select the `target` platform. Options are: `apk` (default), `aab`, `ios`, `web`, `all mobile` (all mobile platforms only), `desktop (windows)`, `desktop (macos)`, `desktop (linux)`, `all desktop` (all desktop platforms only) , `all` (all platforms).
* _(Optional)_. Set `flutterDirectory` to set path to the Flutter SDK if you were not using `Flutter Install` task before this one
* _(Optional)_. Set `buildName` (like `1.2.3`) that will override the manifest's one.
* _(Optional)_. Set `buildNumber` (like `12`) that will override the manifest's one.
* _(Optional)_. Set `buildFlavour` (like `development`) to specify a build flavour. Must match Android Gradle flavor definition or XCode scheme.
* _(Optional)_. Set `entryPoint` to override the main entry point file of the application. Default is 'lib/main.dart'.
* _(Optional)_. Set `verboseMode` if you wish to get detailed verbose log output for diagnoses purposes. Default is `false`.
* _(Optional)_. Set `debugMode` if you wish to override the default release mode for the build. Default is `false`.
* _(Optional)_. Set `dartDefine` compile-time variables. Example: "Some_Var=Some_val --dart-define=Some_Var2=Val"
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments. Example: "--no-tree-shake-icons --publish-to-play"
* __(Android)__._(Optional)_. Set `apkTargetPlatform` for the Android platform architecture target: `android-arm` (default), `android-arm64`.
* __(Android)__._(Optional)_. Set the build mode `splitPerAbi` to compile the code into an APK per target ABI. Otherwise the build will result in a single APK.
* __(iOS)__._(Optional)_. Set `iosTargetPlatform` for the iOS target: `device` (default), `simulator`.
* __(iOS)__._(Optional)_. Set `iosCodesign` to configure whenever the bundle odesign the application bundle (only available on device builds, and activated by default). **Warning: you must install a valid certificate before build with the `Install an Apple Certificate`task**

### Test

![](images/step_test.png)

Launch tests and publish a report as build test results.

* Select the `projectDirectory` that contains to `pubspec.yaml` file.
* _(Optional)_. Set `testName` as a regular expression matching substrings of the names of tests to run.
* _(Optional)_. Set `testPlainName` as a plain-text substring of the names of tests to run.
* _(Optional)_. Set `updateGoldens`: whether `matchesGoldenFile()` calls within your test methods should update the golden files rather than test for an existing match.
* _(Optional)_. Set `generateCodeCoverageReport` to generate code coverage report based on tests in the project. The report file is located in the specified `projectDirectory` in `coverage/lcov.info`.
* _(Optional)_. Set `concurrency` to specify the number of concurrent test processes to run. Default is `6`.

### Analyze

![](images/step_analyze.png)

Launch analyze on flutter directory.

* Select the `projectDirectory` that contains the `pubspec.yaml` file.
* _(Optional)_. Set `pubGet` if you wish to run `pub get` command before analyze. Default is `true`.
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments. Example: "--fatal-infos --fatal-warnings"


### Command

![](images/step_command.png)

Launch a Flutter command with custom arguments.

* Set the `arguments` to your custom valid flutter command.
* Select the `projectDirectory` that contains the `pubspec.yaml` file.
* _(Optional)_. Set `flutterDirectory` to set path to the Flutter SDK if you were not using `Flutter Install` task before this one

## FAQ


> Flutter command isn't recognized ?

Make sure that you have a `Flutter Install` at the beginning of your definition.

> Can I run a custom Flutter command ?

Yes, right after the `Flutter Install` task, a `FlutterToolPath` environment variable points to the `bin` of the Flutter SDK directory. You just have to use `$(FlutterToolPath)` in your following tasks. Example: "$(FlutterToolPath)/flutter packages get"

> Can I run Dart program ?

Yes, right after the `Flutter Install` task, a `DartToolPath` environment variable points to the `bin` of the Dart SDK directory. You just have to use `$(DartToolPath)` in your following tasks. Example: "$(DartToolPath)/dart program.dart arg1 arg2"

> Can I access Flutter's pub-cache ?

Yes, right after the `Flutter Install` task, a `FlutterPubCachePath` environment variable points to the `pub-cache` directory that Flutter installs all depdencies. You just have to use `$(FlutterPubCachePath)` in your following tasks. Example: "$(FlutterPubCachePath)/pubver set $(Version)"

## License

[MIT](https://raw.githubusercontent.com/hey24sheep/vsts-flutter-tasks/master/LICENSE)
