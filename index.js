#!/usr/bin/env node


const { UserRepo } = require('@gh-conf/gh-conf-parse');
const npmBadge = require('npm-badge-generator');
const logSymbols = require('log-symbols');
const ora = require('ora');


const MESSAGES = {
  GENERATING: 'Generating Badges',
  WRITING: 'Adding badges to README.md',
  COMPLETE: 'Badges added successfully'
};


const generateBadge = (path) => {

  const spinner = ora(MESSAGES.GENERATING).start();

  const { repository, username } = UserRepo();
  const badges = npmBadge.generate(repository, repository, username);

  spinner.text = MESSAGES.WRITING;

  const readme = Fs.readSync(`${path}/README.md`, 'utf-8');
  const readmeLines = readme.split('\n');

  readmeLines[1] = `\n${npmBadge}\n${readmeLines[1]}`;

  const readmeWithBadges = readmeLines.join('\n');

  Fs.writeSync(`${path}/README.md`, readmeWithBadges, 'utf-8');

  spinner.stop;
  console.log(logSymbols.success, MESSAGES.COMPLETE);
}