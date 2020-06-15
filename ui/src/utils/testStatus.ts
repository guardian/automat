import { colors } from '../utils/theme';

type StatusData = {
  label: string;
  color: string;
};

type StatusCode = 'SCHEDULED' | 'RUNNING' | 'EXPIRED' | 'INACTIVE';
type TestStatus = Record<StatusCode, StatusData>;

const TEST_STATUS: TestStatus = {
  SCHEDULED: {
    label: 'Scheduled', // Not yet supported
    color: colors.darkerGrey,
  },
  RUNNING: {
    label: 'Running',
    color: colors.green,
  },
  EXPIRED: {
    label: 'Expired', // Not yet supported
    color: colors.orange,
  },
  INACTIVE: {
    label: 'Inactive',
    color: colors.red,
  },
};

export const getTestStatus = (isEnabled: boolean) => {
  let statusCode: StatusCode = 'RUNNING';

  if (!isEnabled) {
    statusCode = 'INACTIVE';
  }

  return TEST_STATUS[statusCode];
};
