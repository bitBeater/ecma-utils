import { GIT_REMOTE, PROJETCT_ROOT } from "./consts.ts";
import { execSync } from "node:child_process";
import { logColors } from "@bitbeater/ecma-utils/cons";
import { readSync } from "node:fs";
import packageJson from '../package.json' with { type: 'json' };



const msg = process.argv[2];
process.chdir(PROJETCT_ROOT);






function chekArguments() {


    if (!msg) {
        console.error('Usage: npm run tag <message>');
        process.exit(1);
    }
}

function confirmTagCreation() {
    console.log(`You are about to create and push to ${GIT_REMOTE} a new git tag with the following details:`);
    console.log(`Tag Name:\t${logColors.underscore + logColors.fg.yellow + packageJson.version + logColors.reset}`);
    console.log(`Message:\t"${logColors.underscore + logColors.fg.yellow + msg + logColors.reset}"`);
    process.stdout.write(`type again the tag name "${logColors.underscore + logColors.fg.yellow + packageJson.version + logColors.reset}" to confirm: `);

    const buffer = Buffer.alloc(packageJson.version.length);

    readSync(0, buffer, 0, packageJson.version.length, null);

    const response = buffer.toString('utf-8').trim().toLowerCase().replaceAll('\n', '');

    if (response !== packageJson.version.toLowerCase()) {
        console.log(`You entered: "${response}". Tag creation aborted.`);
        process.exit(0);
    }
}

function checkGitStatus() {
    const status = execSync('git status --porcelain').toString().trim();

    if (status) {
        execSync('git status -s', { stdio: 'inherit' });

        console.error(`\n\n` + logColors.underscore + logColors.fg.red + 'There are uncommited changes in the repository. Please commit or stash them before creating a tag.');
        process.exit(1);
    }
}

function createTag() {
    try {
        execSync(`git tag ${packageJson.version} -m "${msg}"`, { stdio: 'inherit' });
        execSync(`git push ${GIT_REMOTE} ${packageJson.version}`, { stdio: 'inherit' });
        console.log(logColors.fg.green + `Tag "${packageJson.version}" created successfully!` + logColors.reset);
    } catch (error) {
        console.error(logColors.fg.red + `Failed to create tag "${packageJson.version}".` + logColors.reset);
        console.error(error);
        process.exit(1);
    }
}

function chekIfTagExists() {
    try {
        execSync(`git rev-parse ${packageJson.version}`);
        console.error(logColors.fg.red + `Tag "${packageJson.version}" already exists. Please update the version in package.json before creating a new tag.` + logColors.reset);
        process.exit(1);
    } catch (error) {
        // Tag does not exist, continue with creation
    }
}

chekIfTagExists();
chekArguments();
checkGitStatus();
confirmTagCreation();
execSync('npm run test', { stdio: 'inherit' });
createTag();