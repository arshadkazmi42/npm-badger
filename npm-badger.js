const Fs = require('fs');
const npmBadge = require('npm-badge-generator');
const { UserRepo } = require('@gh-conf/gh-conf-parse');
const fetch = require('node-fetch');
const _ = require('lodash');
const Strmat = require('strmat');


const externals = {};


externals.generate = (path) => {
  
  
  const response = fetch(Strmat.format(
    UserRepo['REPO_DETAILS'], {
      username: username,
      repository: repository
    }
  ));

  const repositoryData = response.json();
  const owner = _.get(repositoryData, 'parent.owner.login');
  const ownerRepo = _.get(repositoryData, 'parent.name');
  
  const { repository, username } = UserRepo();
  const badges = npmBadge.generate(repository, repository, ownerRepo);

  const readme = Fs.readFileSync(`${path}/README.md`, 'utf-8');
  const readmeLines = readme.split('\n');

  readmeLines[1] = `\n${badges}\n${readmeLines[1]}`;

  const readmeWithBadges = readmeLines.join('\n');

  Fs.writeFileSync(`${path}/README.md`, readmeWithBadges, 'utf-8');
};


module.exports = externals;