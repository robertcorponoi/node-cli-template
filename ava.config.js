/**
 * Configuration for the Ava test runner.
 * https://github.com/avajs/ava/blob/main/docs/06-configuration.md
 */
module.exports = {
    // An array of glob patterns to the test files to run.
    files: [
        "test/**/*",
    ],
    // The extensions of the test files to run.
    extensions: [
        "ts",
    ],
    // Enables us to use TypeScript on our tests.
    // https://github.com/avajs/ava/blob/main/docs/recipes/typescript.md#for-packages-without-type-module
    require: [
        "ts-node/register",
    ],
};
