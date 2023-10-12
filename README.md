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
<a href="https://ko-fi.com/J3J6Q1QXE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/buymeacoffee-F5E800.svg?style=for-the-badge&logoColor=white&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwABOvYAATr2ATqxVzoAAAAHdElNRQfnAhALDBqwztzyAAADc0lEQVRo3u2YW0hUQRjHf3tRu5FmNytKSO2qkGKmFWRBURFdBIsgepEi6NGHeowg6K2XqCfBfPHFBH3oihaKRiVKiaHlRnbVzPJSu+u6u6cH181zzuzZOVurPZz/sMvOzP+b73++OTPzzYIFCxYsWJhl2EimmJVx9hLgPT18wC/qvIQHJe5lHBeVHCNVL+DVDLj/I+Mxx5mvFvB2BgUoKHioImu6gL4ZFqCg8IyCPwI+zoIAhU62Tgn4MisCFFpYDWDHHuclGAnbuYATbAyyJE4uJqjChR1wsIG9Oj/fKaURhgwD5cONX9AexIsbL0EDWze7ws6c7KFZx67E4Yw4BR6e0EobI6yggG3kMifUM85zGmjFSxKFHCCfhKjR8NPIG25wSNVazCYYEarv5TQLplFTOEU7CgqvKCN5Wk8q5QxEjcAkNtOjYkxQDmMC08/sFTxFBnXcI1vXbuOkcCL1AqBcw6kHt8D0SoRALmGZsN3OVUkBBfxQcbrs2HSkIWojCPjGV2F7kBq+RX0PAFy8U9VTRAJ6eSM12HR081qK52ZEVV8sEuBlwrQAP+NSvCTmqeoOkYAEHKYF2ATjiJDGKlV9RLQLpGtIMkhhqRQvU7MffhdFYDn5pgXkkiHBsrOPRFXLO5EAJ0dJMuU+kdLwPmmEHZxQ1YM0QUCwgoc5YkpACaMS+0A2LRpGH1uIcJy0sc5E+LuibsXJnOCFjlGBw0Ywwvt7lzN8knC/kQqKhD0TXOclNhJZyEEKdZPUTwlPMDhOb7MiqvssHsWYEQW4PPnoRid6bZQFuZaHMadkNVN3hIAhrY41Bu4fxOz+HulTw/ijUO+rs/gwMmN+eh/VkwmpnACFJnJ07tfTGKP7Pi6qEhp8EkbPNXtjNs0xuPbj4ho52lXnlTLuZGfYYgtPpWyC+Angw8MQbVRzjrWiDPSXpP5e9gNQRIekxXvOcpLD7CaPRZFP2FHJ4RQ+cIoSTVppVNpFl3E9hk3MopufJthNmuRDCDtuGZUhzNXe7Q0xiE9GQL+JIc2hQ/yXjFbAHZS4uB/gjhwxD1eMW4pxuSmfWZYJb0d/V55JpWghJHCe/n/o3E8DebLObaE3oYhz7CbNIGxK+DvyL/DQST23GDQnAMBJJjmsDOUHQQh9T+ULQd1H1DJKN2PywbdgwYIFC/8BfgOoCejMt+kv6wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xNlQxMToxMjoyNSswMDowMACYcDAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTZUMTE6MTI6MjUrMDA6MDBxxciMAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjc2NTQ1OTQ14l6OBQAAABJ0RVh0VGh1bWI6OlNpemUAOTUwMkJC9h0QPgAAAEV0RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L1hjQ3Bmd3ovMzkxMi9rb2ZpX2xvZ29faWNvbl8yNDc4OTQucG5nH4ex2wAAAABJRU5ErkJggg==&logoColor=white" alt="Buy Me A Coffee" height="41" width="174">
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
* _(Optional)_. Set the `customArch` (example 'arm64') if needed.

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
* _(Optional)_. Set `debugMode` if you wish to override the default release mode for the build. Default is `false`. This flag cannot be combined with `profileMode=true`.
* _(Optional)_. Set `profileMode` if you wish to add the `--profile` flag to the build. Default is `false`. This flag cannot be combined with `debugMode=true`.
* _(Optional)_. Set `dartDefine` compile-time variables, use as : `foo=bar` (use 'dartDefineMulti' for multiple args)"
* _(Optional)_. Set `dartDefineMulti` compile-time variables, use as (space separated) : `foo=bar key1=val1 key2=val2` (use for multiple --dart-define arguments)"
* _(Optional)_. Set `dartDefineMultiArgSeparator` Separator used in params passed to `dartDefineMulti`. Default is single space (' ')
* _(Optional)_. Set `extraArgs` if you want to pass more official/custom command arguments, `Space Separated`. Example: "--no-tree-shake-icons --publish-to-play"
* _(Optional)_. Set `extraArgsSeparator` Separator used in params passed to `extraArgs`. Default is single space (' ')
* __(Android)__._(Optional)_. Set `apkTargetPlatform` for the Android platform architecture target: `default` __(default set by Flutter sdk)__ `android-arm` , `android-arm64`, `android-x86`, `android-x64`, `custom`.
* __(Android)__._(Optional)_. Set `customApkTargetPosition` for the `custom` target platform architecture, provide your own combination (comma separated) of valid values. _Example_ like `android-arm,android-arm64,android-x64`
* __(Android)__._(Optional)_. Set the build mode `splitPerAbi` to compile the code into an APK per target ABI. Otherwise the build will result in a single APK.
* __(iOS)__._(Optional)_. Set `iosTargetPlatform` for the iOS target: `device` (default), `simulator`.
* __(iOS)__._(Optional)_. Set `iosCodesign` to configure whenever the bundle odesign the application bundle (only available on device builds, and activated by default). **Warning: you must install a valid certificate before build with the `Install an Apple Certificate`task**
* __(ipa)__._(Optional)_. Set `exportOptionsPlist` to the path of your `ExportOptions.plist` to configure `--export-options-plist`. This flag cannot be combined with '--split-debug-info'. Optionally export an IPA with these options. See 'xcodebuild -h' for available exportOptionsPlist keys.

> NOTE : for `--release` builds, pass `debugMode=false` and `profileMode=false`

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
* _(Optional)_. Set `extraArgsSeparator` Separator used in params passed to `extraArgs`. Default is single space (' ')


### Command

![](images/step_command.png)

Launch a Flutter command with custom arguments.

* Set the `arguments` to your custom valid flutter command.
* Select the `projectDirectory` that contains the `pubspec.yaml` file.
* _(Optional)_. Set `flutterDirectory` to set path to the Flutter SDK if you were not using `Flutter Install` task before this one
* _(Optional)_. Set `argSeparator` Separator used in params passed to `extraArgs`. Default is single space (' ')

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

First, please read the [WIKI](https://github.com/hey24sheep/azure-flutter-tasks/wiki) and then [FAQs](https://github.com/hey24sheep/azure-flutter-tasks#faq) before opening any new issues.

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

Read this issue [#37](https://github.com/hey24sheep/azure-flutter-tasks/issues/37) and this [wiki setup](https://github.com/hey24sheep/azure-flutter-tasks/wiki/IOS-&-Android-Example-Setup-Guide)

> iOS build fails with: "Xcode couldn't find any iOS App Development provisioning profiles matching..."

Read this issue [#49](https://github.com/hey24sheep/azure-flutter-tasks/issues/49)

<br/>

## Sample Build Pipeline Config (3rd Party)

> Disclaimer : These are 3rd Party YAML config, please use them on your own discretion

- [xeladu - Flutter Build Pipeline](https://github.com/xeladu/flutter_build_pipeline)

## Improve

First, please read the [WIKI](https://github.com/hey24sheep/azure-flutter-tasks/wiki) and then [FAQs](https://github.com/hey24sheep/azure-flutter-tasks#faq) before opening any new issues.
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
