/* eslint-disable no-console */
import * as fs from 'fs';
import yargs, { Arguments } from 'yargs';
import { AxiosError } from 'axios';
import { PandoraService } from '@tune-sync/pandora';
import { PandoraLoginArgs } from '../../plugins';

// https://github.com/yargs/yargs/blob/master/docs/advanced.md#example-async-credentials-middleware
// add middleware to intercept login and check for saved user json file?
exports.command = 'login';
exports.desc = 'Get an auth token from pandora';
exports.builder = (yargBuilder: yargs.Argv) => {
  return yargBuilder.options({
    u: {
      alias: 'username',
      type: 'string',
      demandOption: true,
      describe: 'pandora password',
    },
    p: {
      alias: 'password',
      type: 'string',
      demandOption: true,
      describe: 'pandora password',
    },
  });
};
exports.handler = async function pandoraLogin(
  argv: Arguments<PandoraLoginArgs>,
) {
  try {
    const service = new PandoraService();
    await service.login(argv.username, argv.password);
    const user = service.getUser();
    if (!user) {
      throw new Error('Authentication failed!');
    }
    console.log('Successfully signed in!');
    fs.writeFileSync('./pandora_user.json', JSON.stringify(user, null, 2));
    console.log('Wrote user data to ./pandora_user.json');
  } catch (error) {
    const err: AxiosError = error;
    if (err.response) {
      console.log(`${err.response.status} - ${err.response.statusText}`);
      console.log(err.response.data);
    }
  }
};
