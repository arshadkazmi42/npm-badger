const Fs = require('fs');
const {
  expect
} = require('chai');

const badger = require('../npm-badger');

const BADGES = [
  '[![Build](https://github.com/arshadkazmi42/npm-badger/actions/workflows/nodejs.yml/badge.svg)](https://github.com/arshadkazmi42/npm-badger/actions/workflows/nodejs.yml)',
  '[![NPM Version](https://img.shields.io/npm/v/npm-badger.svg)](https://www.npmjs.com/package/npm-badger)',
  '[![NPM Downloads](https://img.shields.io/npm/dt/npm-badger.svg)](https://www.npmjs.com/package/npm-badger)',
  '[![Github Repo Size](https://img.shields.io/github/repo-size/arshadkazmi42/npm-badger.svg)](https://github.com/arshadkazmi42/npm-badger)',
  '[![LICENSE](https://img.shields.io/npm/l/npm-badger.svg)](https://github.com/arshadkazmi42/npm-badger/blob/master/LICENSE)',
  '[![Contributors](https://img.shields.io/github/contributors/arshadkazmi42/npm-badger.svg)](https://github.com/arshadkazmi42/npm-badger/graphs/contributors)',
  '[![Commit](https://img.shields.io/github/last-commit/arshadkazmi42/npm-badger.svg)](https://github.com/arshadkazmi42/npm-badger/commits/master)'
];


describe('Badger updates readme', () => {
  before(() => {
    let readmeFile = Fs.readFileSync(`${process.cwd()}/README.md`, 'utf-8');
    for (const badge of BADGES) {
      readmeFile = readmeFile.replace(badge, '');
    }

    Fs.writeFileSync(`${process.cwd()}/README.md`, readmeFile, 'utf-8');
  });
  it('Should add badges to the README.md file', () => {
    
    badger.generate(process.cwd());

    const readmeFile = Fs.readFileSync(`${process.cwd()}/README.md`, 'utf-8');
    for (const badge of BADGES) {
      expect(readmeFile).to.include(badge);
    }
  });
});