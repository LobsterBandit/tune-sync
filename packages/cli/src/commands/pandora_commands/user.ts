/* eslint-disable no-console */
import * as fs from 'fs';
import { PandoraUser } from '@tune-sync/pandora';

exports.command = 'user';
exports.describe = 'show saved user profile';
exports.builder = {};
exports.handler = function pandoraUserHandler() {
  if (!fs.existsSync('./pandora_user.json')) {
    throw new Error('No saved user profile');
  }
  const user = JSON.parse(
    fs.readFileSync('./pandora_user.json', 'utf8'),
  ) as PandoraUser;
  console.log('The User Profile:');
  console.log(JSON.stringify(user, null, 2));
};
