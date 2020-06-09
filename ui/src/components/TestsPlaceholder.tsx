import React from 'react';
import { css, cx } from 'emotion';
import { Card } from '@material-ui/core';
import { LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';
import { Heading } from './Heading';

const rootStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  background-color: #eee;
  border: #bdbdbd;
`;

const iconStyles = css`
  font-size: 36px;
  margin-bottom: 12px;
`;

const textStyles = css`
  text-align: center;
  margin-bottom: 0;
`;

export const TestsPlaceholder = () => {
  return (
    <Card className={cx(rootStyles)} elevation={0}>
      <LibraryBooksIcon className={cx(iconStyles)} />
      <Heading level={2} supressMargin>
        No tests to display
      </Heading>
      <p className={textStyles}>
        Click the <b>Create Test</b> button above to run <br />
        your own test in this slot.
      </p>
    </Card>
  );
};
