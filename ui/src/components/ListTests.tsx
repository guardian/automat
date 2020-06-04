import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Card, Typography, Chip } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';
import { Slot, Test } from '../types';
import { getTestStatus } from '../lib/testStatusHelpers';

const rootStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const getCardStyles = (isSelected: boolean, isLast: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  background-color: ${isSelected ? '#EEE' : '#FFF'};
  border: 1px solid #bdbdbd;
  margin-bottom: ${isLast ? 0 : '16px'};
`;

const getChipStyles = (color: string) => css`
  background-color: ${color};
  height: auto;
  padding: 3px 0;
  margin: 3px 0 6px;
  color: #fff;
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

export const ListTests = ({ tests, slot, selectedTestId }: Props): JSX.Element => {
  if (tests.length === 0) {
    return <p>There are currently no tests configured in this slot.</p>;
  }
  return (
    <div className={rootStyles}>
      {tests.map((test: Test, index: number) => {
        const isSelected = selectedTestId === test.id;
        const isLast = index === tests.length - 1;
        const status = getTestStatus(test);

        return (
          <Link key={test.id} to={`/slots/${slot.id}/tests/${test.id}`} className={testLinkStyles}>
            <Card className={cx(getCardStyles(isSelected, isLast))} elevation={0}>
              <div className={testHeaderStyles}>
                <Typography component="p" variant="h6">
                  {test.name}
                </Typography>
                {test.isEnabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
              <Chip label={status.label} className={cx(getChipStyles(status.color))} />
              <p className={testInfoStyles}>{test.description}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
