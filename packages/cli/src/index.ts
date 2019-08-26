/* eslint-disable no-console */
import yargs from 'yargs';

const argv = yargs
  .commandDir('commands', { extensions: ['js', 'ts'] })
  .demandCommand()
  .help('h')
  .alias('h', 'help').argv;

console.log(argv);
