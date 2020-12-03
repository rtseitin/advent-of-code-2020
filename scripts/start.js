const { spawn } = require("child_process");
const { readdirSync } = require("fs");
const { exit } = require("process");
const { cp } = require("shelljs");

const day = process.argv[2];
const days = readdirSync("./src");

if (!days.includes(day)) {
    console.log(`Creating file structure for ${day}...`);
    cp("-r", "src/template", `src/${day}`);
    process.exit();
}

spawn("nodemon", ["-x", "ts-node", `src/${day}/index.ts`], {
  stdio: "inherit",
});
