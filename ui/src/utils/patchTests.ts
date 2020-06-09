import { Test } from '../types';
import { checkForErrors } from '../utils/checkForErrors';

export const patchTestsBySlot = (slotId: string, tests: Test[]) => {
  const apiPrefix = process.env.REACT_APP_AUTOMAT_API_URL;
  const apiUrl = `${apiPrefix}/admin/slotss/${slotId}`;
  return fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tests: tests }),
  })
    .then(checkForErrors)
    .then((response) => response.json());
};
