import { Test } from '../types';

export const mockTests: Test[] = [
  {
    id: 'test1',
    name: 'Test 1',
    description: 'Example test 1',
    isEnabled: false,
    variants: ['subsmpu', 'commercialmpu'],
    created: '2020-06-01T10:30:15',
    filters: [
      {
        filterId: 'authstatus',
        selectedOptionIds: ['signedin'],
      },
      {
        filterId: 'subspropensity',
        selectedOptionIds: ['hot', 'warm'],
      },
    ],
    author: {
      id: 'automat.dev@guardian.co.uk',
      firstName: 'Automat',
      lastName: 'Admin',
    },
  },
  {
    id: 'test2',
    name: 'Test 2',
    description: 'Example test 2',
    isEnabled: true,
    created: '2020-06-02T18:15:30',
    variants: ['contributionsbanner'],
    filters: [
      {
        filterId: 'contributorstatus',
        selectedOptionIds: ['currentcontributor'],
      },
      {
        filterId: 'samplerate',
        selectedOptionIds: ['25'],
      },
    ],
    author: {
      id: 'automat.dev@guardian.co.uk',
      firstName: 'Automat',
      lastName: 'Admin',
    },
  },
];
