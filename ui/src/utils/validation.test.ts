import { v4 as uuidv4 } from 'uuid';
import { createNewTest } from './factories';
import { validateTests } from './validation';

describe('validateTests', () => {
  const id = uuidv4();

  it(`should identify a test in its default state as invalid`, () => {
    const originalTest = createNewTest({ id });

    const obtainedValidation = validateTests([originalTest]);
    const expectedValidation = { [id]: { variants: 'Your test must have at least one variant' } };

    expect(obtainedValidation).toEqual(expectedValidation);
  });

  it(`should identify a test whose name is blank`, () => {
    const originalTest = createNewTest({ id });
    const modifiedTest = {
      ...originalTest,
      name: '',
      variants: ['dummyVariant'],
    };

    const obtainedValidation = validateTests([modifiedTest]);
    const expectedValidation = { [id]: { name: 'Name cannot be blank' } };

    expect(obtainedValidation).toEqual(expectedValidation);
  });

  it(`should identify a test whose variants are empty`, () => {
    const originalTest = createNewTest({ id });
    const modifiedTest = {
      ...originalTest,
      variants: [],
    };

    const obtainedValidation = validateTests([modifiedTest]);
    const expectedValidation = { [id]: { variants: 'Your test must have at least one variant' } };

    expect(obtainedValidation).toEqual(expectedValidation);
  });
});
