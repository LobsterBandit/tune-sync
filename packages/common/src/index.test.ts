import { add2 } from './index';

describe('add2', () => {
  it('adds 2 to number', () => {
    const got = add2(2);
    const want = 4;

    expect(got).toBe(want);
  });
});
