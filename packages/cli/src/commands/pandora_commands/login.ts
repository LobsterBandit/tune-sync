/* eslint-disable no-console */
import promptly from 'promptly';
import { PandoraService } from '@tune-sync/pandora';

exports.command = 'login';
exports.desc = 'Log in to your pandora account';
exports.builder = {};
exports.handler = async function pandoraLogin() {
  const service = new PandoraService();

  const username = await promptly.prompt('Username: ');
  const password = await promptly.password(`Password for ${username}: `, {
    replace: '*',
  });
  const passwordLogin = await service.tryLogin({
    username,
    password,
  });

  if (passwordLogin) {
    const user = await service.getUser();
    console.log(`Logged in successfully as ${user && user.username}`);
    return;
  }

  console.log('Authentication failed');
};
