## [0.4.6] - 10 October 2026
- Extension version bump to 0.4.6
- *Test Task* version bump to "0.4.4"
- *Test Task* fixes the published test report showing the wrong number of tests and missing failures, fixes [#111](https://github.com/hey24sheep/azure-flutter-tasks/issues/111)
    - output is now parsed line by line (previously several lines arriving together were dropped)
    - results after a skipped test are no longer ignored
    - test files with the same name in different folders are kept as separate suites
    - NOTE: when tests run concurrently (the default), Flutter's console output does not list every passing test, set `concurrency: 1` for an exact count
- *Build Task* version bump to "0.4.3"
- *Build Task* `buildFlavour` is now passed for iOS simulator builds too, fixes [#103](https://github.com/hey24sheep/azure-flutter-tasks/issues/103)
- Readme notes that the analyze task is used as `FlutterAnalyzeTask@0`, fixes [#91](https://github.com/hey24sheep/azure-flutter-tasks/issues/91)

## [0.4.5] - 10 October 2026
- Extension version bump to 0.4.5
- **Common** all tasks add the `Node24` execution handler (Node 6/10/16 are removed from agents on 24 November 2026 and Node 20 is end-of-support)
- *Install Task* version bump to "0.4.4"
- *Install Task* removes the downloaded archive and the extracted temp copy after caching, cutting disk usage by about two thirds, fixes [#139](https://github.com/hey24sheep/azure-flutter-tasks/issues/139)
- *Install Task* `customVersion` accepts `<M>.<m>` or `<M>.<m>.x` (like `3.29`) to get the latest patch release, fixes [#132](https://github.com/hey24sheep/azure-flutter-tasks/issues/132)
- *Install Task* clear error message when the requested version or arch is not found
- *Install Task* replaced the deprecated `request` lib, the release list now uses the agent proxy & certificate settings like the SDK download
- *Build Task* version bump to "0.4.2"
- *Build Task* clear error message when the Flutter path is not set
- *Test Task* version bump to "0.4.3"
- *Test Task* `publishTests: false` is now respected
- *Test Task* clear error message when the Flutter path is not set
- *Analyze Task* version bump to "0.4.2", clear error message when the Flutter path is not set
- *Command Task* version bump to "0.4.2", clear error message when the Flutter path is not set
- *Env Task* version bump to "0.4.2", removed unused dependencies
- Readme badges moved to vsmarketplacebadges.dev (shields.io retired the marketplace badges)
- Readme fixed the *Build Task* `target` names ([merged#134](https://github.com/hey24sheep/azure-flutter-tasks/pull/134)), thanks to @ManuelRauber
- Publish scripts pin TypeScript to 5.4.5

## [0.4.4] - 5 October 2024
- Extension version bump to 0.4.4
- *Test Task* version bump to "0.4.2"
- *Test Task* reworked test case parsing, each case is added once and marked as failed when Flutter reports `[E]` for it, thanks to @ipuhakka

## [0.4.3] - 15 September 2024
- Extension version bump to 0.4.3
- *Install Task* version bump to "0.4.3"
- *Install Task* keeps the OS name and the CPU arch separate when finding the release, better debug output

## [0.4.2] - 15 September 2024
- Extension version bump to 0.4.2
- *Install Task* version bump to "0.4.2"
- *Install Task* logs the detected platform

## [0.4.1] - 15 September 2024
- Extension version bump to 0.4.1
- **Common** all tasks version bump to "0.4.1"
- **Common** execution handlers set to `Node10`, `Node16` and `Node20_1` so older agents keep working

## [0.4.0] - 15 September 2024
- Extension version bump to 0.4.0
- **Common** all tasks version bump to "0.4.0"
- **Common** migrated all tasks to Node 20 (`azure-pipelines-task-lib` 4.x, `azure-pipelines-tool-lib` 2.x)

## [0.3.18] - 12 October 2023
- Extension version bump to 0.3.18
- *Test Task* version bump to "0.3.4"
- *Test Task* logic change to fix false negative test case

## [0.3.17] - 12 October 2023
- Extension version bump to 0.3.17
- Updated support links in readme

## [0.3.16] - 05 August 2023
- Extension version bump to 0.3.16
- *Build Task* version bump to "0.3.10"
- *Build Task* Added `buildName` and `buildNumber` to `buildWeb`
- *Test Task* version bump to "0.3.3"
- *Test Task* re-written the test suite & case processing and creation

## [0.3.15] - 25 July 2023
- Extension version bump to 0.3.15
- *Build Task* version bump to "0.3.9"
- *Build Task* fixes the `extraArgs` handling in `buildWeb`
- *Test Task* version bump to "0.3.2"
- *Test Task* fixes task failing with null error and failing to publish results in simillar cases 
- Added a `Testing-Readme` guide for easier test setup
- Sample project updated to latest Flutter

## [0.3.14] - 24 July 2023
- Extension version bump to 0.3.14
- **Common** a new separator input parameter is added to *Build*, *Command* & *Analyze* task
    - Please refer to the updated `Readme` for the argument names and how to guide
- **NOTE: this update fixes the previous build fails by adding a different way to handle multiple values in extra args or dart define inputs**

## [0.3.13] - 22 July 2023
- Extension version bump to 0.3.13
- *Test Task* version bump to "0.3.1"
- *Test Task* added a null check, probably fixes [#83](https://github.com/hey24sheep/azure-flutter-tasks/issues/83)
- *Command Task* version bump to "0.3.1"
- *Command Task* changes to how `arguments` input param are passed for execution
- *Build Task* version bump to "0.3.7"
- *Build Task* changes to how `dartDefine`, `dartDefineMulti` and `extraArgs` input param are passed for execution
- **NOTE: These multi argument input params are now handled in a different way to fix this bug [#89](https://github.com/hey24sheep/azure-flutter-tasks/issues/89)**

## [0.3.12] - 13 May 2023
- Extension version bump to 0.3.12
- *Install Task* version bump to "0.3.6"
- *Install Task* prepends path of "Flutter", "FlutterPubCache", "Dart" to main path 
- *Env Task* version bump to "0.3.2"
- *Env Task* now prepends path of "Flutter", "FlutterPubCache", "Dart" to main path 

## [0.3.11] - 15 April 2023
- Extension version bump to 0.3.11
- *Build Task* version bump to "0.3.6"
- *Build Task* added `--target` to `web` build
- *Build Task* added `--build-name` & `--build-number` to `desktop` builds

## [0.3.10] - 4 October 2022
- Extension version bump to 0.3.10
- *Build Task* version bump to "0.3.5"

## [0.3.9] - 4 October 2022
- Extension version update to 0.3.9
- *Build Task* version update to "0.3.4"
- *Build Task* adds new build target `--profile`
- *Build Task* fixes missing build target `--debug` from `web` & `desktop` builds
- *Install Task* version update to "0.3.5"
- *Install Task* removes 'dev' channel, (has been retired by Google)

## [0.3.8] - 12 August 2022
- Extension version update to 0.3.8
- *Env Task* version update to "0.3.1"
- *Env Task* fixes pub cache path and debug output

## [0.3.7] - 9 July 2022
- Extension version update to 0.3.7
- *Build Task* version update to "0.3.3"
- *Build Task* fixes `dartDefine` and `dartDefineMulti` not being passed to the desktop builds

## [0.3.6] - 17 June 2022
- Extension version update to 0.3.6
- *Install Task* version update to "0.3.4"
- *Install Task* fixes `customVersion` arch type won't apply edge case bug

## [0.3.5] - 17 June 2022
- Extension version update to 0.3.5
- *Install Task* version update to "0.3.3"
- *Install Task* fixes cache issue where version key should be valid semver

## [0.3.4] - 15 June 2022
- Extension version update to 0.3.4
- *Install Task* version update to "0.3.2"
- *Install Task* now parses version info from `customUrl`, fixes bug [#46](https://github.com/hey24sheep/azure-flutter-tasks/issues/46)

## [0.3.3] - 15 June 2022
- Extension version update to 0.3.3
- *Install Task* version update to "0.3.1"
- *Install Task* Adds `customArch` and auto 'arch' detecting ([merged#45](https://github.com/hey24sheep/azure-flutter-tasks/pull/45))

## [0.3.2] - 30 April 2022
- Extension version update to 0.3.2
- *Build Task* version update to "0.3.2"
- *Build Task* Adds `dart-define` to Web and Desktop build

## [0.3.1] - 13 March 2022
- Extension Version update to 0.3.1
- *Build Task* version update to "0.3.1"
- *Build Task* : Fixed `dartDefine` not working for IOS and AAB
- *Build Task* : Added new `dartDefineMulti` for multiple "dart-define" arguments, (space separated) use as key1=val1 foo=bar
- FAQ update
- Readme update

## [0.3.0] - 13 Nov 2021 
- Minor version bump across to "0.3.0" for easy maintainance
- Migrate to Node10 as per Microsoft [deperication notice](https://aka.ms/migrateTaskNode10)
- Fixes issue [#26](https://github.com/hey24sheep/azure-flutter-tasks/issues/26)
- Multiple `extraArgs` not working bug fixed
- Multiple `dartDefine` not working bug fixed
- Fixed few major tests
- Add tests for `Env Task`
- Added changelog