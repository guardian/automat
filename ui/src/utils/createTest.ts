import { Test } from '../types';

type ConfigurableTestProps = {
  id?: string;
  name?: string;
  description?: string;
  isEnabled?: boolean;
};

// TODO: agree a format for IDs generated client-side
export const createTest = ({
  id = new Date().getTime().toString(),
  name = 'Untitled Test',
  description = '',
  isEnabled = false,
}: ConfigurableTestProps): Test => ({
  id,
  name,
  description,
  isEnabled,
  created: new Date(),
  author: {
    id: 'automat.dev@guardian.co.uk',
    firstName: 'Automat',
    lastName: 'Admin',
  },
  variants: [],
  filters: [],
});
