import { AppUser } from './user';

export interface ServiceConfiguration<T extends AppUser> {
  configDir: string;
  configFile: string;
  getConfig(): Promise<T | undefined>;
  saveConfig(user: T): Promise<void>;
}
