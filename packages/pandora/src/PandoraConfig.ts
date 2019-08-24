import { ServiceConfiguration } from '@tune-sync/common';
import { PandoraUser } from './PandoraUser';

export class PandoraConfig implements ServiceConfiguration<PandoraUser> {
  public readonly homeDir =
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] || '.';
  public readonly appFolder = 'pandora';
  public readonly settingsFile = 'user.json';

  getSettings() {
    return {} as PandoraUser;
  }

  saveSettings(user: PandoraUser) {
    // eslint-disable-next-line no-console
    console.log(user);
  }
}

export default new PandoraConfig();
