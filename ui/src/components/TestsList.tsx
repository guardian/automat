import React from 'react';
import { css } from 'emotion';
import isEqual from 'lodash.isequal';
import { TestsItem } from './TestsItem';
import { TestsPlaceholder } from './TestsPlaceholder';
import { Test, TestErrors } from '../types';

const rootStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  slotId: string;
  workingTests: Test[];
  testErrors: TestErrors;
  savedTests: Test[];
  selectedTestId?: string;
};

export const TestsList = ({ workingTests, testErrors, savedTests, slotId, selectedTestId }: Props): JSX.Element => {
  if (workingTests.length === 0) {
    return <TestsPlaceholder />;
  }

  return (
    <div className={rootStyles}>
      {workingTests.map((workingTest: Test, index: number) => {
        const savedTest = savedTests.find((savedTest: Test) => savedTest.id === workingTest.id);

        const { id } = workingTest;
        const isEnabled = savedTest?.isEnabled || false;
        const name = savedTest?.name || 'Untitled Test';
        const description = savedTest?.description || '';
        const link = `/slots/${slotId}/tests/${workingTest.id}`;

        const isModified = !isEqual(workingTest, savedTest);
        const isSelected = selectedTestId === workingTest.id;
        const isLastItem = index === workingTests.length - 1;
        const isInvalid = !!testErrors[id];

        return (
          <TestsItem
            key={id}
            id={id}
            name={name}
            description={description}
            link={link}
            isEnabled={isEnabled}
            isSelected={isSelected}
            isModified={isModified}
            isLastItem={isLastItem}
            isInvalid={isInvalid}
          />
        );
      })}
    </div>
  );
};
