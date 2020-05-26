import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography } from '@material-ui/core';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';
import { Slot, Test } from '../types';

const rootStyles = css`
  flex-grow: 1;
`;

const paperStyles = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
  padding: 12px;
`;

const testLinkStyles = css`
  color: inherit;
  display: block;
  text-decoration: none;
`;

const testInfoStyles = css`
  margin-top: 0;
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
};

export const ListTests = ({ tests, slot }: Props): JSX.Element => (
  <Grid container className={cx(rootStyles)} spacing={2}>
    <Grid item xs={12}>
      {tests.map((test: Test) => (
        <Card key={test.id} className={cx(paperStyles)}>
          <div className={testHeaderStyles}>
            <div>
              <Typography component="p" variant="h6">
                <Link to={`/slots/${slot.id}/tests/${test.id}`} className={testLinkStyles}>
                  {test.name}
                </Link>
              </Typography>
            </div>
            {test.enabled ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
          <p className={testInfoStyles}>{test.description}</p>
          <p className={testInfoStyles}>{test.variants.length} variants</p>
        </Card>
      ))}
    </Grid>
  </Grid>
);
