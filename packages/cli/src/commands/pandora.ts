/* eslint-disable no-console */
import * as yargsTypes from 'yargs';

exports.command = 'pandora <command> [options]';

exports.describe = 'pandora tune-sync plugin';

exports.builder = function pandoraBuilder(yargs: yargsTypes.Argv) {
  return yargs
    .commandDir('pandora_commands', { extensions: ['js', 'ts'] })
    .usage('Usage: $0 pandora <command> [options]')
    .example('$0 pandora login -u user -p password', 'Log in to Pandora');
};

exports.handler = function pandoraHandler() {};
