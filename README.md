# Flutter Extension for Azure DevOps 

[![](https://img.shields.io/badge/hey24sheep.com-202124.svg?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADIAAAAcCAMAAAAURxzFAAAADFBMVEUAAAAbvfUcvfUcvfXEslmQAAAAA3RSTlMA4PgXbk0cAAAATElEQVR42u3RgQbAMAyE4dvu%2Fd95Y%2FiHkRyEkUPTK5%2BqajMZ32FH00kriWltYkqDsHJekmd8AQiBvPWfSPH8iPhQcEv0lYycCDGWzQW5CAN5SL8q5AAAAABJRU5ErkJggg%3D%3D)](https://hey24sheep.com)

![](https://img.shields.io/visual-studio-marketplace/release-date/hey24sheep.flutter?color=green&style=flat-square)
![](https://img.shields.io/visual-studio-marketplace/azure-devops/installs/total/hey24sheep.flutter?style=flat-square)
![](https://img.shields.io/visual-studio-marketplace/last-updated/hey24sheep.flutter?style=flat-square)
![](https://img.shields.io/visual-studio-marketplace/r/hey24sheep.flutter?color=green&style=flat-square)
![](https://img.shields.io/visual-studio-marketplace/v/hey24sheep.flutter?label=current%20version&style=flat-square)

Latest [Flutter](http://flutter.io) tasks for [Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/).

Initially a [fork](https://github.com/hey24sheep/vsts-flutter-tasks) maintained by me of the awesome work done by original author [Github](https://github.com/aloisdeniel/vsts-flutter-tasks). As per people's request, this is now a separate repo as this is now an advanced/latest extension with more features. 

> NOTE : I will no longer maintain my fork instead this repository will be updated, as this has developed into a lot more than the original extension.

## Support
<p>
PRs are always welcome. Feel free to create an issue if you face any problem.
</p>

<p>Don't forget to star this repo, thanks 👍</p>
<p>

<a href="https://www.buymeacoffee.com/hey24sheep" target="_blank"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-F5E800.svg?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48dGl0bGU+QnV5IE1lIEEgQ29mZmVlIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0yMC4yMTYgNi40MTVsLS4xMzItLjY2NmMtLjExOS0uNTk4LS4zODgtMS4xNjMtMS4wMDEtMS4zNzktLjE5Ny0uMDY5LS40Mi0uMDk4LS41Ny0uMjQxLS4xNTItLjE0My0uMTk2LS4zNjYtLjIzMS0uNTcyLS4wNjUtLjM3OC0uMTI1LS43NTYtLjE5Mi0xLjEzMy0uMDU3LS4zMjUtLjEwMi0uNjktLjI1LS45ODctLjE5NS0uNC0uNTk3LS42MzQtLjk5Ni0uNzg4YTUuNzIzIDUuNzIzIDAgMDAtLjYyNi0uMTk0Yy0xLS4yNjMtMi4wNS0uMzYtMy4wNzctLjQxNmEyNS44MzQgMjUuODM0IDAgMDAtMy43LjA2MmMtLjkxNS4wODMtMS44OC4xODQtMi43NS41LS4zMTguMTE2LS42NDYuMjU2LS44ODguNTAxLS4yOTcuMzAyLS4zOTMuNzctLjE3NyAxLjE0Ni4xNTQuMjY3LjQxNS40NTYuNjkyLjU4LjM2LjE2Mi43MzcuMjg0IDEuMTIzLjM2NiAxLjA3NS4yMzggMi4xODkuMzMxIDMuMjg3LjM3IDEuMjE4LjA1IDIuNDM3LjAxIDMuNjUtLjExOC4yOTktLjAzMy41OTgtLjA3My44OTYtLjExOS4zNTItLjA1NC41NzgtLjUxMy40NzQtLjgzNC0uMTI0LS4zODMtLjQ1Ny0uNTMxLS44MzQtLjQ3My0uNDY2LjA3NC0uOTYuMTA4LTEuMzgyLjE0Ni0xLjE3Ny4wOC0yLjM1OC4wODItMy41MzYuMDA2YTIyLjIyOCAyMi4yMjggMCAwMS0xLjE1Ny0uMTA3Yy0uMDg2LS4wMS0uMTgtLjAyNS0uMjU4LS4wMzYtLjI0My0uMDM2LS40ODQtLjA4LS43MjQtLjEzLS4xMTEtLjAyNy0uMTExLS4xODUgMC0uMjEyaC4wMDVjLjI3Ny0uMDYuNTU3LS4xMDguODM4LS4xNDdoLjAwMmMuMTMxLS4wMDkuMjYzLS4wMzIuMzk0LS4wNDhhMjUuMDc2IDI1LjA3NiAwIDAxMy40MjYtLjEyYy42NzQuMDE5IDEuMzQ3LjA2NyAyLjAxNy4xNDRsLjIyOC4wMzFjLjI2Ny4wNC41MzMuMDg4Ljc5OC4xNDUuMzkyLjA4NS44OTUuMTEzIDEuMDcuNTQyLjA1NS4xMzcuMDguMjg4LjExMS40MzFsLjMxOSAxLjQ4NGEuMjM3LjIzNyAwIDAxLS4xOTkuMjg0aC0uMDAzYy0uMDM3LjAwNi0uMDc1LjAxLS4xMTIuMDE1YTM2LjcwNCAzNi43MDQgMCAwMS00Ljc0My4yOTUgMzcuMDU5IDM3LjA1OSAwIDAxLTQuNjk5LS4zMDRjLS4xNC0uMDE3LS4yOTMtLjA0Mi0uNDE3LS4wNi0uMzI2LS4wNDgtLjY0OS0uMTA4LS45NzMtLjE2MS0uMzkzLS4wNjUtLjc2OC0uMDMyLTEuMTIzLjE2MS0uMjkuMTYtLjUyNy40MDQtLjY3NS43MDEtLjE1NC4zMTYtLjE5OS42Ni0uMjY3IDEtLjA2OS4zNC0uMTc2LjcwNy0uMTM1IDEuMDU2LjA4Ny43NTMuNjEzIDEuMzY1IDEuMzcgMS41MDJhMzkuNjkgMzkuNjkgMCAwMDExLjM0My4zNzYuNDgzLjQ4MyAwIDAxLjUzNS41M2wtLjA3MS42OTctMS4wMTggOS45MDdjLS4wNDEuNDEtLjA0Ny44MzItLjEyNSAxLjIzNy0uMTIyLjYzNy0uNTUzIDEuMDI4LTEuMTgyIDEuMTcxLS41NzcuMTMxLTEuMTY1LjItMS43NTYuMjA1LS42NTYuMDA0LTEuMzEtLjAyNS0xLjk2Ni0uMDIyLS42OTkuMDA0LTEuNTU2LS4wNi0yLjA5NS0uNTgtLjQ3NS0uNDU4LS41NC0xLjE3NC0uNjA1LTEuNzkzbC0uNzMxLTcuMDEzLS4zMjItMy4wOTRjLS4wMzctLjM1MS0uMjg2LS42OTUtLjY3OC0uNjc4LS4zMzYuMDE1LS43MTguMy0uNjc4LjY3OWwuMjI4IDIuMTg1Ljk0OSA5LjExMmMuMTQ3IDEuMzQ0IDEuMTc0IDIuMDY4IDIuNDQ2IDIuMjcyLjc0Mi4xMiAxLjUwMy4xNDQgMi4yNTcuMTU2Ljk2Ni4wMTYgMS45NDIuMDUzIDIuODkyLS4xMjIgMS40MDgtLjI1OCAyLjQ2NS0xLjE5OCAyLjYxNi0yLjY1Ny4zNC0zLjMzMi42ODMtNi42NjMgMS4wMjQtOS45OTVsLjIxNS0yLjA4N2EuNDg0LjQ4NCAwIDAxLjM5LS40MjZjLjQwMi0uMDc4Ljc4Ny0uMjEyIDEuMDc0LS41MTguNDU1LS40ODguNTQ2LTEuMTI0LjM4NS0xLjc2NnptLTEuNDc4Ljc3MmMtLjE0NS4xMzctLjM2My4yMDEtLjU3OC4yMzMtMi40MTYuMzU5LTQuODY2LjU0LTcuMzA4LjQ2LTEuNzQ4LS4wNi0zLjQ3Ny0uMjU0LTUuMjA3LS40OTgtLjE3LS4wMjQtLjM1My0uMDU1LS40Ny0uMTgtLjIyLS4yMzYtLjExMS0uNzEtLjA1NC0uOTk1LjA1Mi0uMjYuMTUyLS42MDkuNDYzLS42NDYuNDg0LS4wNTcgMS4wNDYuMTQ4IDEuNTI2LjIyLjU3Ny4wODggMS4xNTYuMTU5IDEuNzM3LjIxMiAyLjQ4LjIyNiA1LjAwMi4xOSA3LjQ3Mi0uMTQuNDUtLjA2Ljg5OS0uMTMgMS4zNDUtLjIxLjM5OS0uMDcyLjg0LS4yMDYgMS4wOC4yMDYuMTY2LjI4MS4xODguNjU3LjE2Mi45NzRhLjU0NC41NDQgMCAwMS0uMTY5LjM2NHptLTYuMTU5IDMuOWMtLjg2Mi4zNy0xLjg0Ljc4OC0zLjEwOS43ODhhNS44ODQgNS44ODQgMCAwMS0xLjU2OS0uMjE3bC44NzcgOS4wMDRjLjA2NS43OC43MTcgMS4zOCAxLjUgMS4zOCAwIDAgMS4yNDMuMDY1IDEuNjU4LjA2NS40NDcgMCAxLjc4Ni0uMDY1IDEuNzg2LS4wNjUuNzgzIDAgMS40MzQtLjYgMS40OTktMS4zOGwuOTQtOS45NWEzLjk5NiAzLjk5NiAwIDAwLTEuMzIyLS4yMzhjLS44MjYgMC0xLjQ5MS4yODQtMi4yNi42MTN6Ii8+PC9zdmc+&logoColor=white" alt="Buy Me A Coffee" height="41" width="174">
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
* _(Optional)_. Set `buildNumber` (like `12`) that will override the manifest's one. Use `$(Build.BuildNumber)` to use build number as auto incremental number.
* _(Optional)_. Set `buildFlavour` (like `development`) to specify a build flavour. Must match Android Gradle flavor definition or XCode scheme.
* _(Optional)_. Set `entryPoint` to override the main entry point file of the application. Default is 'lib/main.dart'.
* _(Optional)_. Set `verboseMode` if you wish to get detailed verbose log output for diagnoses purposes. Default is `false`.
* _(Optional)_. Set `debugMode` if you wish to override the default release mode for the build. Default is `false`.
* _(Optional)_. Set `dartDefine` compile-time variables, use as : `foo=bar` (use 'dartDefineMulti' for multiple args)"
* _(Optional)_. Set `dartDefineMulti` compile-time variables, use as (space separated) : `foo=bar key1=val1 key2=val2` (use for multiple --dart-define arguments)"
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments, `Space Separated`. Example: "--no-tree-shake-icons --publish-to-play"
* __(Android)__._(Optional)_. Set `apkTargetPlatform` for the Android platform architecture target: `default` __(default set by Flutter sdk)__ `android-arm` , `android-arm64`, `android-x86`, `android-x64`, `custom`.
* __(Android)__._(Optional)_. Set `customApkTargetPosition` for the `custom` target platform architecture, provide your own combination (comma separated) of valid values. _Example_ like `android-arm,android-arm64,android-x64`
* __(Android)__._(Optional)_. Set the build mode `splitPerAbi` to compile the code into an APK per target ABI. Otherwise the build will result in a single APK.
* __(iOS)__._(Optional)_. Set `iosTargetPlatform` for the iOS target: `device` (default), `simulator`.
* __(iOS)__._(Optional)_. Set `iosCodesign` to configure whenever the bundle odesign the application bundle (only available on device builds, and activated by default). **Warning: you must install a valid certificate before build with the `Install an Apple Certificate`task**
* __(ipa)__._(Optional)_. Set the path of your `path/to/ExportOptions.plist` to configure `--export-options-plist`. This flag cannot be combined with '--split-debug-info'. Optionally export an IPA with these options. See 'xcodebuild -h' for available exportOptionsPlist keys.

### Test

![](images/step_test.png)

Launch tests and publish a report as build test results.

* Select the `projectDirectory` that contains to `pubspec.yaml` file.
* _(Optional)_. Set `testName` as a regular expression matching substrings of the names of tests to run.
* _(Optional)_. Set `testPlainName` as a plain-text substring of the names of tests to run.
* _(Optional)_. Set `updateGoldens`: whether `matchesGoldenFile()` calls within your test methods should update the golden files rather than test for an existing match.
* _(Optional)_. Set `generateCodeCoverageReport` to generate code coverage report based on tests in the project. The report file is located in the specified `projectDirectory` in `coverage/lcov.info`.
* _(Optional)_. Set `concurrency` to specify the number of concurrent test processes to run. Default is `6`.
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments, `Comma Separated`. Example: "--no-sound-null-safety,--dart-define=<foo=bar>"

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

> Facing error - "No toolchains found in the NDK toolchains folder for ABI with prefix: arm-linux-androideabi" ?

Read this issue [#16](https://github.com/hey24sheep/azure-flutter-tasks/issues/16) for solution or this [stackoverflow](https://stackoverflow.com/questions/60404457/no-version-of-ndk-matched-the-requested-version/65698078#65698078)

> How to run "Integeration Tests" ?

Read this [wiki](https://github.com/hey24sheep/azure-flutter-tasks/wiki/Integeration-Test-Support) for steps, thanks to [@maksymgendin](https://github.com/maksymgendin) for the help.

> IOS build fail "Provisional Profile Errors" ?

Read this [#35](https://github.com/hey24sheep/azure-flutter-tasks/issues/35#issuecomment-1063794699) for help

> Any IOS or Android Examples (Setup Guide/YAML config)

Read this issue [#37](https://github.com/hey24sheep/azure-flutter-tasks/issues/37) and this [wiki setup](https://github.com/hey24sheep/azure-flutter-tasks/wiki/IOS-Example)

<br/>

## Improve

Help me by reporting bugs, creating PRs, **submit new ideas** for features or anything else that you want to share.

- Just [write an issue](https://github.com/hey24sheep/azure-flutter-tasks/issues) on GitHub. ✏️

## More

Check out my other useful **Flutter** packages on [pub.dev](https://pub.dev/publishers/hey24sheep.com/packages) 
    or more **DevOps** extensions on [marketplace](https://marketplace.visualstudio.com/publishers/Hey24sheep)

## Source Code

Source code can be found on [Github](https://github.com/hey24sheep/azure-flutter-tasks).

Previous fork : [Github](https://github.com/hey24sheep/vsts-flutter-tasks)

Original repo : [Github](https://github.com/aloisdeniel/vsts-flutter-tasks).

<br/>

## License

[MIT](https://raw.githubusercontent.com/hey24sheep/vsts-flutter-tasks/master/LICENSE)
