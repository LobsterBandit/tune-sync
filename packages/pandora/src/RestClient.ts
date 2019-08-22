import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cookie from 'cookie';
import { PandoraUser } from './PandoraUser';
import { ServiceConfiguration } from '@favtunes/common';

export type ApiConfig = {
  version?: string;
};

export class RestClient {
  private csrfTokenName = 'csrftoken';
  private csrfToken: string | null = null;
  private csrfHeaderName = 'X-CsrfToken';
  private baseURL = 'https://www.pandora.com/';
  private apiClient: AxiosInstance;
  private config: ServiceConfiguration<PandoraUser>;

  public cookies = new Map<string, string>();
  public user: PandoraUser | null = null;

  constructor(config: ServiceConfiguration<PandoraUser>) {
    this.apiClient = axios.create({
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CsrfToken',
    });
    this.config = config;
  }

  async request<T = any>(
    endpoint: string,
    options: AxiosRequestConfig,
    apiConfig: ApiConfig = {},
  ) {
    if (!this.csrfToken) {
      await this.getCSRFToken();
    }

    options.url = `${this.baseURL}api/${apiConfig.version || 'v1'}/${endpoint}`;
    options.method = options.method || 'post';
    options.responseType = options.responseType || 'json';
    options.withCredentials = options.withCredentials || true;

    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
    options.headers[this.csrfHeaderName] = this.csrfToken;
    if (options.withCredentials) {
      options.headers.cookie = options.headers.cookie
        ? options.headers.cookie + [...this.cookies.values()].join('; ')
        : [...this.cookies.values()].join('; ');
      if (this.user) {
        options.headers['X-AuthToken'] = this.user.authToken;
      }
    }

    const response = await this.apiClient.request<T>(options);

    if (response.headers['set-cookie']) {
      this.setCookies(response.headers['set-cookie']);
    }

    return response;
  }

  setCookies(header: string[]) {
    header.map(c => {
      const name = c.substring(0, c.indexOf('='));
      this.cookies.set(name, c);

      if (name === this.csrfTokenName) {
        const token = cookie.parse(c);
        this.csrfToken = token[this.csrfTokenName];
      }
    });
  }

  async getCSRFToken() {
    const res = await axios.head(this.baseURL);
    this.setCookies(res.headers['set-cookie'] || []);
    return res;
  }

  // try to load authToken from config first
  // only log in with password if its not present or doesnt work
  async authLogin(username: string, password: string) {
    const res = await this.request<PandoraUser>('auth/login', {
      data: {
        username,
        password,
        existingAuthToken: null,
        keepLoggedIn: true,
      },
    });
    return res;
  }

  getAuthToken() {
    return this.user ? this.user.authToken : null;
  }

  getConfig() {
    return this.config;
  }
}
