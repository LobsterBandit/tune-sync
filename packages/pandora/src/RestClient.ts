import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cookie from 'cookie';
import { PandoraUser } from './PandoraUser';
import { LoginOptions } from './request-types';

export type ApiConfig = {
  version?: string;
  authToken?: string;
};

export class RestClient {
  private csrfTokenName = 'csrftoken';
  private csrfToken: string | null = null;
  private csrfHeaderName = 'X-CsrfToken';
  private baseURL = 'https://www.pandora.com/';
  private apiClient: AxiosInstance;

  public cookies = new Map<string, string>();

  constructor() {
    this.apiClient = axios.create({
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CsrfToken',
    });
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
      options.headers['X-AuthToken'] = apiConfig.authToken || '';
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

  async authLogin({
    username,
    password = '',
    authToken,
    keepLoggedIn = true,
  }: Partial<LoginOptions>) {
    const res = await this.request<PandoraUser>('auth/login', {
      data: {
        username,
        password,
        existingAuthToken: authToken,
        keepLoggedIn,
      },
    });
    return res;
  }
}
