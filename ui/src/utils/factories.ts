import { Test } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ConfigurableTestProps {
  id?: string;
  name?: string;
  description?: string;
  isEnabled?: boolean;
}

export const createNewTest = ({ id = uuidv4(), name = 'Untitled Test', description = '', isEnabled = false }: ConfigurableTestProps): Test => ({
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
