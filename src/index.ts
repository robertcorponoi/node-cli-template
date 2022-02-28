#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Here we define our CLI. The yargs documentation that goes more in depth 
 * with all this can be found here: https://yargs.js.org/docs/
 * 
 * 1. We pass in the the arguments to yargs. However, we first pass the 
 * arguments to `hideBin`, which is a yargs helper that handles slicing the 
 * arguments to get rid of the extra elements that are not needed. 
 * 
 * 2. We provide the path to our `commands` directory that contains all of the 
 * commands for our CLI.
 * 
 * 3. We enable strict mode. This makes it so that if any required arguments 
 * are not provided, an error will be thrown.
 * 
 * 4. Finally, `.argv` gets the arguments passed by the user as an object.
 */
yargs(hideBin(process.argv))
    .commandDir("commands")
    .strict()
    .argv;