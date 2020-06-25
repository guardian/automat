import { getTestStatus } from './testStatus';

describe('getTestStatus', () => {
  it(`should identity a running test`, () => {
    const obtainedStatus = getTestStatus(true);

    expect(obtainedStatus).toHaveProperty('label');
    expect(obtainedStatus).toHaveProperty('color');
    expect(obtainedStatus.label).toEqual('Running');
  });

  it(`should identity an inactive test`, () => {
    const obtainedStatus = getTestStatus(false);

    expect(obtainedStatus).toHaveProperty('label');
    expect(obtainedStatus).toHaveProperty('color');
    expect(obtainedStatus.label).toEqual('Inactive');
  });
});
