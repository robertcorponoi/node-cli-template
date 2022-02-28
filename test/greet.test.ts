import test from "ava";
import { promisify } from "util";
import { exec } from "child_process";

// Promisify the `exec` function so we can use async/await.
const execPromisified = promisify(exec);

test("the `greet` command should return 'Hello, Bob' when passed in an argument of 'Bob'", async t => {
    const { stdout } = await execPromisified("node dist/index.js greet Bob");

    t.is(stdout, "Hello, Bob\n");
});
