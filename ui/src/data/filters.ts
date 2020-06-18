import { Filter } from '../types';

export const filters: Filter[] = [
  {
    id: 'authstatus',
    name: 'Authentication Status',
    helpText: 'Restrict the test audience to logged-in or not logged-in users',
    allowMultiple: false,
    options: [
      {
        value: 'loggedin',
        label: 'Logged In Users',
      },
      {
        value: 'notloggedin',
        label: 'Not Logged-in Users',
      },
    ],
  },
  {
    id: 'subspropensity',
    name: 'Propensity to Subscribe',
    helpText: 'Restrict the test audience to users who fit into a given propensity level',
    allowMultiple: true,
    options: [
      {
        value: 'hot',
        label: 'Hot (very likely to subscribe)',
      },
      {
        value: 'warm',
        label: 'Warm (likely to subscribe)',
      },
      {
        value: 'cold',
        label: 'Cold (unlikely to subscribe)',
      },
    ],
  },
  {
    id: 'samplerate',
    name: 'Custom Sampling Rate',
    helpText: 'Restrict the test audience to a percentage of users in the cohort',
    allowMultiple: false,
    options: [
      {
        value: '100',
        label: '100%',
      },
      {
        value: '50',
        label: '50%',
      },
      {
        value: '20',
        label: '20%',
      },
      {
        value: '10',
        label: '10%',
      },
      {
        value: '5',
        label: '5%',
      },
      {
        value: '2',
        label: '2%',
      },
      {
        value: '1',
        label: '1%',
      },
    ],
  },
];
