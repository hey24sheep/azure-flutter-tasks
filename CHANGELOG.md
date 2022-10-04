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