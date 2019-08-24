/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';
import { PandoraUser } from '@favtunes/pandora';

const argv = yargs
  .command('user [key]', 'show user profile', {}, () => {
    const user = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../pandorauser.json'), 'utf8'),
    ) as PandoraUser;
    console.log('The User Profile:');
    console.log(JSON.stringify(user, null, 2));
  })
  .demandCommand()
  .help().argv;

console.log(argv);
