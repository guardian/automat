import { Filter } from '../types';

export const filters: Filter[] = [
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
    id: 'currentcontributor',
    name: 'Contributor Status',
    helpText: 'Narrow the test audience based on the contributor status of the user',
    control: 'options',
    allowMultiple: true,
    options: [
      {
        value: 'currentcontributor',
        label: 'User must be a Current Contributor',
      },
      {
        value: 'pastcontributor',
        label: 'User must be a Past Contributor',
      },
    ],
  },
  {
    id: 'paidcontent',
    name: 'Paid Content',
    helpText: 'Narrow the test audience based on whether the content is paid or not',
    control: 'options',
    allowMultiple: false,
    options: [
      {
        value: 'paid',
        label: 'Article must be Paid Content',
      },
      {
        value: 'notpaid',
        label: 'Article must NOT be Paid Content',
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
