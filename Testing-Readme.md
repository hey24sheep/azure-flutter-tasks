## How to test locally

>**Note : Not all tests are written and they cannot mock every scenario**

### Task Build - first, build the the task (.ts) to (.js)
- `tsc tasks/test/index.ts`

### Test Build - second, build the test (.ts) file to a .js file

- `tsc tasks/test/tests/basic.ts`

### Test Run - thrid, you can run the test (.js) file using the below command

- `node ./tasks/test/tests/basic.js`
