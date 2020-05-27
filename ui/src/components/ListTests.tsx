import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';
import { Slot, Test } from '../types';

const rootStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const getCardStyles = (isSelected: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 16px;
  padding: 12px;
  background-color: ${isSelected ? 'lightgray' : 'white'};
`;

const testLinkStyles = css`
  color: inherit;
  display: block;
  text-decoration: none;
`;

const testInfoStyles = css`
  margin: 0;
`;

const testHeaderStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  tests: Test[];
  slot: Slot;
  selectedTestId?: string;
};

export const ListTests = ({ tests, slot, selectedTestId }: Props): JSX.Element => (
  <div className={rootStyles}>
    {tests.map((test: Test) => (
      <Link key={test.id} to={`/slots/${slot.id}/tests/${test.id}`} className={testLinkStyles}>
        <Card className={cx(getCardStyles(selectedTestId === test.id))}>
          <div className={testHeaderStyles}>
            <Typography component="p" variant="h6">
              {test.name}
            </Typography>
            {test.enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
          <p className={testInfoStyles}>{test.description}</p>
        </Card>
      </Link>
    ))}
  </div>
);
