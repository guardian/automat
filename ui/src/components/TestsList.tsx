import React from 'react';
import { css } from 'emotion';
import { TestsItem } from './TestsItem';
import { Test } from '../types';

const rootStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

type Props = {
  slotId: string;
  workingTests: Test[];
  savedTests: Test[];
  selectedTestId?: string;
};

export const TestsList = ({ workingTests, savedTests, slotId, selectedTestId }: Props): JSX.Element => {
  if (workingTests.length === 0) {
    return <p>There are currently no tests configured in this slot.</p>;
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

        const isModified = JSON.stringify(workingTest) !== JSON.stringify(savedTest);
        const isSelected = selectedTestId === workingTest.id;
        const isLastItem = index === workingTests.length - 1;

        return (
          <TestsItem
            id={id}
            name={name}
            description={description}
            link={link}
            isEnabled={isEnabled}
            isSelected={isSelected}
            isModified={isModified}
            isLastItem={isLastItem}
          />
        );
      })}
    </div>
  );
};
