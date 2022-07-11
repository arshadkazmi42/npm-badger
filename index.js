#!/usr/bin/env node

const badger = require('./npm-badger');

badger.generate(process.cwd());

console.log('✔ Badges injected sucessfully!');