import { AppUser } from './user';

export interface ServiceConfiguration<T extends AppUser> {
  homeDir: string;
  appFolder: string;
  settingsFile: string;
  getSettings(): T;
  saveSettings(user: T): void;
}
