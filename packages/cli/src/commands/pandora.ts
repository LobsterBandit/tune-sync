/* eslint-disable no-console */
import * as yargsTypes from 'yargs';

exports.command = 'pandora <command> [options]';

exports.describe = 'pandora tune-sync plugin';

exports.builder = function pandoraBuilder(yargs: yargsTypes.Argv) {
  return yargs
    .commandDir('pandora_commands', { extensions: ['js', 'ts'] })
    .usage('Usage: pandora <command> [options]');
};

exports.handler = function pandoraHandler() {};
