import { RestClient } from './RestClient';

describe('RestService', () => {
  it('returns a CSRF token', async () => {
    const got = await new RestClient().getCSRFToken();
    expect(got).toBeDefined();
  });
});
