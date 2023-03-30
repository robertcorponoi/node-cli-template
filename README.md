<div align="center">

# **Node CLI Template**

An opinionated template to use for Node.JS CLI applications. This template can be easily extended to include any arguments and options you need.

<div align="center">

**Table of Contents**

-   [Tools](#tools)
-   [Visual Studio Code Extensions](#visual-studio-code-extensions)
-   [Concepts](#concepts)
    -   [Adding a command](#adding-a-command)
    -   [Renaming the CLI](#renaming-the-cli)
    -   [Running Locally](#running-locally)
    -   [Testing](#testing)
-   [Scripts](#scripts)
-   [GitHub Actions](#github-actions)
-   [Keeping Up To Date With Template Changes](#keeping-up-to-date-with-template-changes)
-   [License](#license)

## Tools

The following tools are used to build the template and improve the development experience.

-   [yargs](https://yargs.js.org/) to parse command line arguments and handle them elegantly.
-   [TypeScript](https://www.typescriptlang.org/) for type safety and a more predictable development experience.
-   [Prettier](https://prettier.io/) to enforce a consistent code style throughout the application.
-   [ESLint](https://eslint.org/) to find problems in the code before deploying.
-   [Ava](https://github.com/avajs/ava) as the test runner.
-   [concurrently](https://github.com/open-cli-tools/concurrently) to run commands concurrently.

## **Visual Studio Code Extensions**

The follow extensions for code formatting and linting should be recommended to you if you open the project in Visual Studio Code:

-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## **Concepts**

### **Adding a Command**

To demonstrate adding a command, we'll use the current example command, `greet`, which can be found at [./src/commands/greet.ts](./src/commands/greet.ts).

Let's create the `greet` command from scratch.

1. Create the file for the command under the [./src/commands](./src/commands/) directory. The file should be named the name of the command.

2. Import what we need to build the command. We'll need three things: `Argv, Arguments, CommandBuilder`. There are types that help us build the command.

```ts
import { Argv, Arguments, CommandBuilder } from "yargs";
```

3. Next, we'll define a `type` for the options that can be passed to our command. The `greet` command will take one argument, the name of the user to greet.

```ts
// The arguments that can be passed to this command.
type Options = {
    // The name of the user to greet.
    name: string;
};
```

4. We also need to let `yargs` know what it should show to the user in the help documentation. We'll have one that shows usage information and another that describes the command.

```ts
// Shows how to use this command when the CLI help text is displayed.
export const command = "greet <name>";

// A description of the command used whenever the help text is displayed.
export const description = "Prints a simple greeting directed to <name>";
```

5. Next, we map the `Options` that we defined to yargs by providing the name of the argument, its type, and whether it is required or not.

```ts
/**
 * Defines the options for the command. Here we define that we need a `name`
 * argument that is a string value and that it is required.
 *
 * @param {Argv<Options>} yargs The yargs builder.
 *
 * @returns {Argv<Options>} Returns the yargs builder.
 */
export const builder: CommandBuilder<Options> = (
    yargs: Argv<Options>,
): Argv<Options> => {
    return (
        yargs
            // We define our `name` argument which is used to build the string
            // that is printed to the terminal. This is a required argument.
            .positional("name", {
                type: "string",
                demandOption: true,
            })
    );
};
```

6. Now we have to tell yargs what to do when the `greet` command is run. Simply, we're going to get the name from the arguments, creating the greeting message, log the message to the console, and lastly exit the application.

```ts
/**
 * Handles processing the arguments for the `greet` command and prints the
 * greeting to the terminal.
 *
 * @param {Arguments<Options>} argv The arguments passed by the user.
 */
export const handler = (argv: Arguments<Options>) => {
    // Get the name of the person to greet from the arguments passed by the
    // user in the terminal.
    const { name } = argv;

    // Build the greeting string from the name provided by the user.
    const greeting = `Hello, ${name}`;

    // Print the greeting to the terminal.
    console.log(greeting);

    // We're done with the command so we exit.
    process.exit(0);
};
```

7. There's actually not a 7th step but in case you're wondering about having to import the command and specify that yargs should watch for it ... you don't.

In the [./src/index.ts](./src/index.ts) file, you'll see the following:

```ts
yargs(hideBin(process.argv)).commandDir("commands").strict().argv;
```

What this does is tell yargs that all of our commands are in a directory named `commands`. Anything in this directory is automatically picked up by yargs.

Make sure to check the [./src/index.ts](./src/index.ts) file for more information about this, including a like to the yargs documentation about it.

### **Renaming the CLI**

The name that users will use to run your CLI is defined in the `bin` property of the [package.json](./package.json) file.

By default, it looks like below:

```json
"bin": {
    "my-cli": "./dist/index.js"
},
```

You can rename `my-cli` to whatever you would like to name your tool.

### **Running Locally**

To run your CLI locally, you can:

1. Run `npm link` which will install your CLI.

2. Run your CLI by its name. With the default name and functionality it would look like `my-cli greeting Bob`.

3. Once you're done running it locally, run `npm unlink -g` to uninstall it.

### **Testing**

We use [Ava](https://github.com/avajs/ava) as our test runner. While we won't go in-depth on how to write tests, as the Ava documentation does a great job at it, you can see an example in the [./test/greet.test.ts](./test/greet.test.ts) file.

This test function tests the `greet` command by running it with an argument and making sure that the output is what we expect.

The test runner has a configuration file at [ava.config.js](./ava.config.js) and it specifies that we have TypeScript tests, and that our test files reside in the `test` directory. Any tests you add should have a similar format and go in the [test](./test/) directory as well. If you want to use a different set up, just update the [ava.config.js](./ava.config.js) file to reflect the changes.

To run tests, simply use `npm test`.

## **Scripts**

-   `set-permissions` - This is used to set the permission of the built `index.js` file so that it can be run. This script is run automatically after the `build` and `build:watch` scripts.

-   `build` - This is used to compile the TypeScript files and output the resulting JavaScript files into the `dist` directory. This will also run the `set-permissions` script to give the `index.js` file the correct permissions to run.

-   `build:watch` - This does the same thing the `build` script does but it also watches the `./src` directory for changes and recompiles and re-runs the `set-permissions` script when a change is made.

-   `test` - This runs the tests in the `test` directory.

## **GitHub Actions**

The workflow at [.github/workflows/build-and-test.yml](./.github/workflows/build-and-test.yml) will run whenever a pull request is made.

This action will install the dependencies, create the build, and then run the tests.

## **Dependabot**

This template uses [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates) to create pull requests for dependencies that are out of date. The configuration file can be found at [.github/dependabot.yml](./.github/dependabot.yml).

## **Keeping Up To Date With Template Changes**

This template will be updated when dependencies need updating, new packages are added, and new or better concepts are found. To keep up with changes you might want from the template:

1. Add the template repository as a remote:

```sh
git remote add template git@github.com:robertcorponoi/node-cli-template.git
```

2. Fetch the changes:

```sh
git fetch --all
```

3. Merge the changes from the main branch of the template repository:

```sh
git merge template/main
```

## **License**

[MIT](./LICENSE)
