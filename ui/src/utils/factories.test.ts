import { v4 as uuidv4 } from 'uuid';
import { createNewTest } from './factories';

describe('createNewTest', () => {
  const id = uuidv4();
  const created = new Date();

  it(`should create a test with expected defaults`, () => {
    const expectedTest = {
      id,
      name: 'Untitled Test',
      description: '',
      isEnabled: false,
      created,
      author: {
        id: 'automat.dev@guardian.co.uk',
        firstName: 'Automat',
        lastName: 'Admin',
      },
      variants: [],
      filters: [],
    };
    const obtainedTest = createNewTest({ id, created });

    expect(obtainedTest).toEqual(expectedTest);
  });
});
