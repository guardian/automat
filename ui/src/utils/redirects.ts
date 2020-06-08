import { Test } from '../types';

export const goToTestByIndex = (tests: Test[], currentIndex: number, slotId: number, history: any) => {
  const nextTest = tests[currentIndex];
  const goTo = nextTest ? `/slots/${slotId}/tests/${nextTest.id}` : `/slots/${slotId}`;
  history.push(goTo);
};
