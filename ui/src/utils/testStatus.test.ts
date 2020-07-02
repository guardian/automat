import { getTestStatus } from './testStatus';

describe('getTestStatus', () => {
  it(`should identify a running test`, () => {
    const isEnabled = true;
    const obtainedStatus = getTestStatus(isEnabled);

    expect(obtainedStatus).toHaveProperty('label');
    expect(obtainedStatus).toHaveProperty('color');
    expect(obtainedStatus.label).toEqual('Running');
  });

  it(`should identify an inactive test`, () => {
    const isEnabled = false;
    const obtainedStatus = getTestStatus(isEnabled);

    expect(obtainedStatus).toHaveProperty('label');
    expect(obtainedStatus).toHaveProperty('color');
    expect(obtainedStatus.label).toEqual('Inactive');
  });
});
