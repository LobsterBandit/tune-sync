export interface SpotifyOidcClientSettings {
  client_id: string;
  response_type: string;
  redirect_uri: string;
  scope?: string;
}

export class SpotifyOidcClient {
  public accessToken?: string;

  public readonly baseURL = 'https://accounts.spotify.com/';

  public readonly settings: SpotifyOidcClientSettings;

  public defaultSettings: SpotifyOidcClientSettings = {
    client_id: '9a8461f044054bb89fb17e02925191ee',
    response_type: 'token',
    redirect_uri: 'http://localhost:3000/signin-redirect',
    scope: 'user-library-read user-read-private playlist-read-private',
  };

  public lastRequestState?: string;

  constructor(settings?: SpotifyOidcClientSettings) {
    this.settings = settings || this.defaultSettings;
  }

  /**
   * Start the implicit oidc flow to ask for user consent
   * and authorize the application.
   */
  public getAccessToken() {
    let authorizeRedirect = `${this.baseURL}authorize?`;

    // add query params
    authorizeRedirect += `client_id=${encodeURIComponent(
      this.settings.client_id,
    )}`;
    authorizeRedirect += `&response_type=${encodeURIComponent(
      this.settings.response_type,
    )}`;
    authorizeRedirect += `&redirect_uri=${encodeURIComponent(
      this.settings.redirect_uri,
    )}`;
    authorizeRedirect += this.settings.scope
      ? `&scope=${encodeURIComponent(this.settings.scope)}`
      : '';

    // create state and add as param to verify upon response
    this.lastRequestState = 'randomstring';
    authorizeRedirect += `&state=${encodeURIComponent(this.lastRequestState)}`;

    // fire the authorization query by redirecting
    window.location.replace(authorizeRedirect);

    // will be redirected to the redirect_uri where
    // you can set token and fetch user info
  }
}
