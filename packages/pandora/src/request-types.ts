import { PandoraUser } from './PandoraUser';

export type PagedRequest = {
  pageSize: number;
  startIndex: number;
};

export type LoginOptions = {
  username: string;
  password: string;
  authToken?: string;
  keepLoggedIn?: boolean;
};

export type GetStationsRequest = PagedRequest;

export type GetStationDetailsRequest = {
  stationId: string;
  isCurrentStation: boolean;
};

export type GetStationFeedbackRequest = PagedRequest & {
  stationId: string;
  positive: boolean;
};

export type GetListenerProfileRequest = {
  webname: PandoraUser['webname'];
};

export type GetFeedbackRequest = PagedRequest & {
  webname: PandoraUser['webname'];
};
