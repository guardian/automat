import { Filter } from '../types';

export const filters: Filter[] = [
  {
    id: 'authstatus',
    name: 'Authentication Status',
    helpText: 'Restrict the test audience to signed-in or signed-out users only',
    control: 'options',
    allowMultiple: false,
    options: [
      {
        value: 'loggedin',
        label: 'Signed-in users',
      },
      {
        value: 'loggedout',
        label: 'Signed-out users',
      },
    ],
  },
  {
    id: 'subspropensity',
    name: 'Propensity to Subscribe',
    helpText: 'Restrict the test audience to users who fit into a given propensity level',
    control: 'options',
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
    name: 'Audience Sampling Rate',
    helpText: 'Restrict the test audience to a percentage of its users',
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
