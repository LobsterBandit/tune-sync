/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import pandoraConfig from './PandoraConfig';
import { RestClient } from './RestClient';
import {
  GetStationsRequest,
  GetStationDetailsRequest,
  GetStationFeedbackRequest,
  GetListenerProfileRequest,
  GetFeedbackRequest,
  LoginOptions,
} from './request-types';
import {
  GetStationsResponse,
  GetStationDetailsResponse,
  GetStationFeedbackResponse,
  GetListenerProfileResponse,
  AnnotateObjectsSimpleResponse,
  GetFeedbackResponse,
} from './response-types';
import { PandoraUser } from './PandoraUser';
import { AxiosError } from 'axios';

export class PandoraService {
  private client: RestClient;
  private user?: PandoraUser;

  constructor() {
    this.client = new RestClient();
  }

  public async getConfig() {
    const config = await pandoraConfig.getConfig();
    if (config) {
      this.user = config;
    }
    return config;
  }

  public async tryLogin({
    username,
    password,
    keepLoggedIn = true,
  }: LoginOptions) {
    let success = false;
    try {
      const loginRes = await this.client.authLogin({
        username,
        password,
        keepLoggedIn,
      });

      if (loginRes.status === 200) {
        success = true;
        this.user = loginRes.data;
        await pandoraConfig.saveConfig(loginRes.data);
      }
    } catch (error) {
      success = false;
      const err: AxiosError = error;
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log('Error', err.message);
      }
    }

    return success;
  }

  public async getUser() {
    if (this.user) {
      return this.user;
    }

    const config = await this.getConfig();
    if (config) {
      this.user = config;
    }

    return this.user;
  }

  public async getBookmarks() {
    const res = await this.client.request('bookmark/getBookmarks', {});
    return res;
  }

  public async getStations(options: GetStationsRequest) {
    const res = await this.client.request<GetStationsResponse>(
      'station/getStations',
      {
        data: { ...options },
      },
    );
    return res;
  }

  public async getStationDetails(options: GetStationDetailsRequest) {
    const res = await this.client.request<GetStationDetailsResponse>(
      'station/getStationDetails',
      { data: options },
    );
    return res;
  }

  public async getStationFeedback(options: GetStationFeedbackRequest) {
    const res = await this.client.request<GetStationFeedbackResponse>(
      'station/getStationFeedback',
      { data: options },
    );
    return res;
  }

  public async getListenerProfile(options: GetListenerProfileRequest) {
    const res = await this.client.request<GetListenerProfileResponse>(
      'listener/getProfile',
      { data: options },
    );
    return res;
  }

  public async getFeedback({
    pageSize = 50,
    startIndex = 0,
  }: Partial<GetFeedbackRequest> = {}) {
    const user = await this.getUser();
    if (!user) {
      throw new Error('Not logged in');
    }
    const res = await this.client.request<GetFeedbackResponse>(
      'station/getFeedback',
      {
        data: {
          pageSize,
          startIndex,
          webname: user.webname,
        },
      },
      {
        authToken: user.authToken,
      },
    );
    return res;
  }

  public async annotateObjectsSimple(options: { pandoraIds: string[] }) {
    const res = await this.client.request<AnnotateObjectsSimpleResponse>(
      'catalog/annotateObjectsSimple',
      { data: options },
      { version: 'v4' },
    );
    return res;
  }

  public async writeOutput(filename: string, data: any) {
    const dest = path.join(pandoraConfig.configDir, filename);
    await fs.promises.writeFile(dest, data);
    return dest;
  }
}
