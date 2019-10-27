import fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import makeDir from 'make-dir';
import { ServiceConfiguration } from '@tune-sync/common';
import { PandoraUser } from './PandoraUser';

export class PandoraConfig implements ServiceConfiguration<PandoraUser> {
  public readonly configDir = path.join(
    process.env[os.platform() === 'win32' ? 'USERPROFILE' : 'HOME'] || '.',
    `${os.platform() !== 'win32' ? '.' : ''}tune-sync`,
  );
  public readonly configFile = 'pandora_user.json';

  private configFileFull = path.join(this.configDir, this.configFile);

  async getConfig() {
    if (fs.existsSync(this.configFileFull)) {
      // TODO: decrypt the file
      const configRaw = fs.readFileSync(this.configFileFull, {
        encoding: 'utf8',
      });
      const config: PandoraUser = JSON.parse(configRaw);
      return config;
    }
    return undefined;
  }

  async saveConfig(user: PandoraUser) {
    if (!fs.existsSync(this.configFileFull)) {
      await makeDir(this.configDir);
    }
    // TODO: encrypt the file
    fs.writeFileSync(this.configFileFull, JSON.stringify(user));
  }
}

export default new PandoraConfig();
