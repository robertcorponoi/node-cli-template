import { Argv, Arguments, CommandBuilder } from "yargs";

// The arguments that can be passed to this command.
type Options = {
    // The name of the user to greet.
    name: string;
};

// Shows how to use this command when the CLI help text is displayed.
export const command = "greet <name>";

// A description of the command used whenever the help text is displayed.
export const description = "Prints a simple greeting directed to <name>";

/**
 * Defines the options for the command. Here we define that we need a `name` 
 * argument that is a string value and that it is required.
 * 
 * @param {Argv<Options>} yargs The yargs builder.
 * 
 * @returns {Argv<Options>} Returns the yargs builder.
 */
export const builder: CommandBuilder<Options> = (yargs: Argv<Options>): Argv<Options> => {
    return yargs
        // We define our `name` argument which is used to build the string 
        // that is printed to the terminal. This is a required argument.
        .positional("name", {
            type: "string",
            demandOption: true,
        });
};

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
