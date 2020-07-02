import { Filter } from '../types';

export const mockFilters: Filter[] = [
  {
    id: 'authstatus',
    name: 'Authentication Status',
    helpText: 'Narrow the test audience based on the authentication status of the user',
    control: 'options',
    allowMultiple: false,
    options: [
      {
        value: 'signedin',
        label: 'User must be Signed In',
      },
      {
        value: 'signedout',
        label: 'User must be Signed Out',
      },
    ],
  },
  {
    id: 'subspropensity',
    name: 'Propensity to Subscribe',
    helpText: 'Narrow the test audience based on the propensity of the user to subscribe',
    control: 'options',
    allowMultiple: true,
    options: [
      {
        value: 'hot',
        label: 'Very Likely (Hot)',
      },
      {
        value: 'warm',
        label: 'Likely (Warm)',
      },
      {
        value: 'cold',
        label: 'Unlikely (Cold)',
      },
    ],
  },
  {
    id: 'samplerate',
    name: 'Audience Sampling Rate',
    helpText: 'Narrow the test audience to a percentage of the current cohort',
    control: 'slider',
    allowMultiple: false,
    options: [
      {
        value: '0',
        label: '0%',
      },
      {
        value: '100',
        label: '100%',
      },
    ],
  },
];
