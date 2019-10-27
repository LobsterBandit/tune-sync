export type GetStationsResponse = {
  totalStations: number;
  sortedBy: string;
  index: number;
  stations: {
    stationId: string;
    stationFactoryPandoraId: string;
    pandoraId: string;
    name: string;
    art: ArtDetail[];
    dateCreated: string;
    lastPlayed: string;
    totalPlayTime: number;
    isNew: boolean;
    allowDelete: boolean;
    allowRename: boolean;
    allowEditDescription: boolean;
    allowAddSeed: boolean;
    isShared: boolean;
    isTransformAllowed: boolean;
    isOnDemandEditorialStation: boolean;
    isAdvertiserStation: boolean;
    canShuffleStation: boolean;
    canAutoshare: boolean;
    advertisingKey: string;
    isArtistMessagesEnabled: boolean;
    stationNameWithTwitterHandle: string;
    isThumbprint: boolean;
    isShuffle: boolean;
    genre: string[];
    genreSponsorship: string;
    adGenre: string;
    antiTarget: boolean;
    initialSeed: {
      musicId: string;
      pandoraId: string;
    };
    adkv: {
      artist: string;
      genre: string;
      clean: string;
      gcat: string;
    };
    creatorWebname: string;
    artId: string;
    dominantColor: string;
  };
};

export type GetStationDetailsResponse = {
  seeds: [
    {
      musicId: string;
      pandoraId: string;
      artist: {
        artistName: string;
        isComposer: boolean;
        isComedy: boolean;
        artistDetailUrl: string;
      };
      listenerCount: number;
      seoToken: string;
      art: ArtDetail[];
    },
  ];
  positiveFeedbackCount: number;
  negativeFeedbackCount: number;
  stationId: string;
  stationFactoryPandoraId: string;
  pandoraId: string;
  name: string;
  art: ArtDetail[];
  dateCreated: string;
  lastPlayed: string;
  isNew: boolean;
  allowDelete: boolean;
  allowRename: boolean;
  allowEditDescription: boolean;
  allowAddSeed: boolean;
  isShared: boolean;
  isTransformAllowed: boolean;
  isOnDemandEditorialStation: boolean;
  isAdvertiserStation: boolean;
  canShuffleStation: boolean;
  canAutoshare: boolean;
  advertisingKey: string;
  isArtistMessagesEnabled: boolean;
  isThumbprint: boolean;
  isShuffle: boolean;
  genre: string[];
  genreSponsorship: string;
  adGenre: string;
  antiTarget: boolean;
  initialSeed: {
    musicId: string;
    pandoraId: string;
    artist: {
      artistName: string;
      isComposer: boolean;
      isComedy: boolean;
      artistDetailUrl: string;
    };
    listenerCount: number;
    seoToken: string;
    art: ArtDetail[];
  };
  adkv: {
    artist: string;
    genre: string;
    clean: string;
    gcat: string;
  };
  creatorWebname: string;
  artId: string;
  dominantColor: string;
};

export type GetStationFeedbackResponse = {
  total: number;
  feedback: PandoraStationFeedback[];
};

export type GetListenerProfileResponse = {
  listenerId: string;
  webname: string;
  private: boolean;
  followState: string;
  positiveFeedbackCount: number;
  stationCount: number;
  bookmarkCount: number;
  followingCount: number;
  followersCount: number;
};

export interface GetFeedbackResponse {
  total: number;
  feedback: PandoraTrackFeedback[];
}

export type PandoraTrackFeedback = {
  feedbackId: string;
  isPositive: boolean;
  stationId: string;
  stationName: string;
  musicId: string;
  pandoraId: string;
  songTitle: string;
  albumTitle: string;
  artistName: string;
  artistSeoToken: string;
  artistDetailUrl: string;
  trackSeoToken: string;
  trackDetailUrl: string;
  albumSeoToken: string;
  trackNum: number;
  trackLength: number;
  albumArt: ArtDetail[];
};

export type PandoraStationFeedback = PandoraTrackFeedback & {
  sampleUrl: string;
  amazonUrl: string;
  amazonDigitalAsin: string;
  albumAmazonDigitalAsin: string;
  itunesUrl: string;
  discNum: number;
};

export type ArtDetail = {
  url: string;
  size: number;
};

export type AnnotateObjectsSimpleResponse = {
  [pandoraId: string]: {
    name: string;
    sortableName: string;
    duration: number;
    trackNumber: number;
    icon: {
      dominantColor: string;
      artId: string;
    };
    rightsInfo: {
      hasInteractive: boolean;
      hasOffline: boolean;
      hasNonInteractive: boolean;
      hasStatutory: boolean;
      hasRadioRights: boolean;
      expirationTime: number;
    };
    albumId: string;
    albumName: string;
    artistId: string;
    artistName: string;
    explicitness: string;
    shareableUrlPath: string;
    hasRadio: boolean;
    modificationTime: number;
    slugPlusPandoraId: string;
    pandoraId: string;
    type: string;
    scope: string;
    __type: string;
  };
};
