import { Test, SimpleTest } from '../types';

type StatusData = {
  label: string;
  color: string;
};

type StatusCode = 'SCHEDULED' | 'RUNNING' | 'EXPIRED' | 'INACTIVE';
type TestStatus = Record<StatusCode, StatusData>;

const TEST_STATUS: TestStatus = {
  SCHEDULED: {
    // Not yet supported
    label: 'Scheduled',
    color: '#9e9e9e',
  },
  RUNNING: {
    label: 'Running',
    color: '#4caf50',
  },
  EXPIRED: {
    // Not yet supported
    label: 'Expired',
    color: '#ffc107',
  },
  INACTIVE: {
    label: 'Inactive',
    color: '#f44336',
  },
};

export const getTestStatus = (test: Test | SimpleTest) => {
  let statusCode: StatusCode = 'RUNNING';

  if (!test.isEnabled) {
    statusCode = 'INACTIVE';
  }

  return TEST_STATUS[statusCode];
};
