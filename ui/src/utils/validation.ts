import { Test, ValidatedFields } from '../types';

export const validateTests = (tests: Test[]) => {
  const errors = tests.map((test) => {
    const { id, name, variants } = test;
    const fields: ValidatedFields = {};

    if (!name.trim()) {
      fields.name = 'Name cannot be blank';
    }

    if (variants.length === 0) {
      fields.variants = 'Your test must have at least one variant';
    }

    return { id, fields };
  });

  return errors.reduce((errors: any, error) => {
    const { id, fields } = error;
    if (Object.keys(fields).length > 0) {
      errors[id] = fields;
    }
    return errors;
  }, {});
};
