const Fs = require('fs');
const npmBadge = require('npm-badge-generator');
const { UserRepo } = require('@gh-conf/gh-conf-parse');


const externals = {};


externals.generate = (path) => {

  const { repository, username } = UserRepo();
  const badges = npmBadge.generate(repository, repository, username);

  const readme = Fs.readFileSync(`${path}/README.md`, 'utf-8');
  const readmeLines = readme.split('\n');

  readmeLines[1] = `\n${badges}\n${readmeLines[1]}`;

  const readmeWithBadges = readmeLines.join('\n');

  Fs.writeFileSync(`${path}/README.md`, readmeWithBadges, 'utf-8');
};


module.exports = externals;