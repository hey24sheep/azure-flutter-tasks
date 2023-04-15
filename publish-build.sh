# Build TS
cd ./tasks/test
tsc 
cd ../install
tsc
cd ../build
tsc
cd ../analyze
tsc 
cd ../command
tsc 
cd ../env
tsc 
cd ../../

# install tfx
npm install -g tfx-cli

# Create extension
tfx extension create --manifest-globs vss-extension.json

# > Author https://marketplace.visualstudio.com/manage/publishers/hey24sheep