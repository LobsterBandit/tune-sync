import pandoraConfig from './PandoraConfig';
import { RestClient } from './RestClient';
import {
  GetStationsRequest,
  GetStationDetailsRequest,
  GetStationFeedbackRequest,
  GetListenerProfileRequest,
  GetFeedbackRequest,
} from './request-types';
import {
  GetStationsResponse,
  GetStationDetailsResponse,
  GetStationFeedbackResponse,
  GetListenerProfileResponse,
  AnnotateObjectsSimpleResponse,
  GetFeedbackResponse,
} from './response-types';

export class PandoraService {
  private client: RestClient;

  constructor() {
    this.client = new RestClient(pandoraConfig);
  }

  public async login(
    username: string,
    password: string,
    authToken?: string | null,
  ) {
    const loginOptions = {
      username,
      password,
      authToken,
      keepLoggedIn: true,
    };

    if (authToken) {
      // if authToken is present, send empty password
      // only send password if authToken fails
      loginOptions.password = '';
    }

    const res = await this.client.authLogin(username, password);
    this.client.user = res.data;
    return res;
  }

  public getUser() {
    return this.client.user;
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

  public async getFeedback(options: GetFeedbackRequest) {
    const res = await this.client.request<GetFeedbackResponse>(
      'station/getFeedback',
      { data: options },
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
}
