/* eslint-disable no-console */
import yargs from 'yargs';

// eslint-disable-next-line no-unused-expressions
yargs
  .commandDir('commands', { extensions: ['js', 'ts'] })
  .demandCommand()
  .help('h')
  .alias('h', 'help').argv;
