// const { expect } = require('chai');
const { exec } = require('child_process');


describe('Badger updates readme', () => {
  it('Should add badges to the README.md file', () => {
    exec('../index arshad/test');
  });
});
