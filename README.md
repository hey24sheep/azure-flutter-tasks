# Flutter Extension for Azure DevOps 

Latest [Flutter](http://flutter.io) tasks for [Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/).

Initially a [fork](https://github.com/hey24sheep/vsts-flutter-tasks) maintained by me of the awesome work done by original author [Github](https://github.com/aloisdeniel/vsts-flutter-tasks). As per people's request, this is now a separate repo as this is now an advanced/latest extension with more features. 

> NOTE : I will no longer maintain my fork instead this repository will be updated, as this has developed into a lot more than the original extension.


## Support

Don't forget to star this repo, thanks.

<p>
<a href="https://www.buymeacoffee.com/hey24sheep" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174">
</a>
</p>

<br/>

## Installation & Usage

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=hey24sheep.flutter). Add the tasks to your build definition.

<br/>

# Pipeline Tasks

### Install

![](images/step_install.png)

Installs the [Flutter SDK](https://flutter.io/sdk-archive/) onto the running agent if not already installed. Then uses it for following tasks.

* Select the `Release Url Mode`: `auto` (default), `custom`. If `custom` is specified, a `Custom (Flutter SDK Install Url)` must be set.
* Select the `channel`: `stable` (default), `beta`, or `dev`.
* Select the `version` of the SDK to install:  `latest` (default), `custom`. If `custom` is specified, a `customVersion` must be set.
* _(Optional)_. Set the `customVersion` (in a `<M>.<m>.<p>` semver format) if needed.
* _(Optional)_. Set the `Custom (Flutter SDK Install Url)` to release install url like `https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_2.2.1-stable.zip` or any other available on (https://flutter.dev/docs/development/tools/sdk/releases?tab=windows).

### Build

![](images/step_build.png)

Build the given mobile application project. You must call the `Flutter Install` task or use the optional `flutterDirectory` task input that points to your `flutter/bin` folder before execution. All application bundles are created in the `build/outputs` folder of your project.

* Select the `projectDirectory` that contains the `pubspec.yaml` file.
* Select the `target` platform. Options are: `apk` (default), `aab`, `ios`, `ipa`, `web`, `all mobile` (all mobile platforms only), `desktop (windows)`, `desktop (macos)`, `desktop (linux)`, `all desktop` (all desktop platforms only) , `all` (all platforms).
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

### Env

![](images/step_env.png)

Task to create the environment variables `FlutterToolPath`, `FlutterPubCachePath` and `DartToolPath`.

* Pick the `Flutter path from` either to `Custom Path` or `File Path`.
* Select the `Custom Path` to give a path string like "`$(Agent.ToolsDirectory)/<yourPath>/flutter`"
* Select the `File Path` to set path to the Flutter SDK

> NOTE :  Do not give path to 'bin' folder

<br/>

# Environment Variables
Environment variables created by the `Install` or `Env` tasks are :

* `$(FlutterToolPath)` - can be used as "`$(FlutterToolPath)/flutter packages get`"
* `$(FlutterPubCachePath)` can be used as "`$(FlutterPubCachePath)/pubver set $(Version)`"
* `$(DartToolPath)` - can be used as "`$(DartToolPath)/dart prog.dart arg1`"

<br/>

# FAQ


> Flutter command isn't recognized ?

Make sure that you have a `Flutter Install` at the beginning of your definition.

> Can I run a custom Flutter command ?

Yes, right after the `Flutter Install` task, a `FlutterToolPath` environment variable points to the `bin` of the Flutter SDK directory. You just have to use `$(FlutterToolPath)` in your following tasks. Example: "`$(FlutterToolPath)/flutter packages get`"

> Can I run Dart program ?

Yes, right after the `Flutter Install` task, a `DartToolPath` environment variable points to the `bin` of the Dart SDK directory. You just have to use `$(DartToolPath)` in your following tasks. Example: "`$(DartToolPath)/dart program.dart arg1 arg2`"

> Can I access Flutter's pub-cache ?

Yes, right after the `Flutter Install` task, a `FlutterPubCachePath` environment variable points to the `pub-cache` directory that Flutter installs all depdencies. You just have to use `$(FlutterPubCachePath)` in your following tasks. Example: "`$(FlutterPubCachePath)/pubver set $(Version)`"

<br/>

## Source Code

Source code can be found on [Github](https://github.com/hey24sheep/azure-flutter-tasks).

Previous fork : [Github](https://github.com/hey24sheep/vsts-flutter-tasks)

Original repo : [Github](https://github.com/aloisdeniel/vsts-flutter-tasks).

<br/>

## License

[MIT](https://raw.githubusercontent.com/hey24sheep/vsts-flutter-tasks/master/LICENSE)
