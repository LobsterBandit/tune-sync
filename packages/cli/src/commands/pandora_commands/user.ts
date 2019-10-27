/* eslint-disable no-console */
import { PandoraService } from '@tune-sync/pandora';

exports.command = 'user';
exports.describe = 'Display stored user profile';
exports.builder = {};
exports.handler = async function pandoraUserHandler() {
  const service = new PandoraService();
  const config = await service.getConfig();

  if (config) {
    console.log('The User Profile:');
    console.log(JSON.stringify(config, null, 2));
  } else {
    console.log('No stored user profile');
    console.log('Use the login command to log in');
  }
};
