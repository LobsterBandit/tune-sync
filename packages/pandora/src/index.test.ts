import { addingMachine } from './index';

describe('addingMachine', () => {
  it('adds 2 to the number', () => {
    const got = addingMachine(4);
    const want = 6;

    expect(got).toBe(want);
  });
});
