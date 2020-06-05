import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Card, Typography, Chip } from '@material-ui/core';
import { Slot, Test, SimpleTest } from '../types';
import { getTestStatus } from '../lib/testStatusHelpers';

const rootStyles = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const getCardStyles = (isSelected: boolean, isLast: boolean, isModified: boolean) => css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
  background-color: ${isSelected ? '#EEE' : '#FFF'};
  border: ${isModified ? '2px' : '2px'} solid ${isModified ? '#ffeb3b' : '#bdbdbd'};
  margin-bottom: ${isLast ? 0 : '16px'};
`;

const getChipStyles = (color: string) => css`
  background-color: ${color};
  height: auto;
  padding: 2px 0;
  color: #fff;
  margin-left: 6px;
  width: 80px;
`;

const getTestNameStyles = (isModified: boolean) => css`
  margin-bottom: ${isModified ? '0' : '6px'};
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
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const modifiedStyles = css`
  font-size: 12px;
`;

type Props = {
  tests: Test[];
  originalTests: Test[];
  simpleTests: SimpleTest[];
  slot: Slot;
  selectedTestId?: string;
};

export const ListTests = ({ tests, originalTests, simpleTests, slot, selectedTestId }: Props): JSX.Element => {
  if (tests.length === 0) {
    return <p>There are currently no tests configured in this slot.</p>;
  }
  return (
    <div className={rootStyles}>
      {tests.map((test: Test, index: number) => {
        const isSelected = selectedTestId === test.id;
        const isLast = index === tests.length - 1;

        const originalTest = originalTests.find((originalTest: SimpleTest) => originalTest.id === test.id);
        const simpleTest = simpleTests.find((simpleTest: SimpleTest) => simpleTest.id === test.id);
        const name = simpleTest?.name || 'Untitled Test';
        const description = simpleTest?.description;

        const isModified = JSON.stringify(test) !== JSON.stringify(originalTest);

        let status;
        if (simpleTest) {
          status = getTestStatus(simpleTest);
        }

        return (
          <Link key={test.id} to={`/slots/${slot.id}/tests/${test.id}`} className={testLinkStyles}>
            <Card className={cx(getCardStyles(isSelected, isLast, isModified))} elevation={0}>
              <div className={testHeaderStyles}>
                <Typography component="p" variant="h6" className={cx(getTestNameStyles(isModified))}>
                  {isModified ? (
                    <>
                      {name}
                      <br />
                      <div className={modifiedStyles}>(Modified)</div>
                    </>
                  ) : (
                    name
                  )}
                </Typography>
                {status && <Chip label={status.label} className={cx(getChipStyles(status.color))} />}
              </div>

              <p className={testInfoStyles}>{description}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
