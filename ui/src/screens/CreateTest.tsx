import React from 'react';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { Slot } from '../types';

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

type Props = {
  slots: Slot[];
};

export const CreateTest = ({ slots }: Props) => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Create Test</title>
      </Helmet>

      <Typography component="h1" variant="h4" noWrap className={cx(headingStyles)}>
        Create Test
      </Typography>

      <p>Coming Soon</p>
    </div>
  );
};
