import React from 'react';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { ListSlots } from '../components/ListSlots';

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Slots</title>
      </Helmet>

      <Typography component="h1" variant="h4" noWrap className={cx(headingStyles)}>
        Slots
      </Typography>

      <ListSlots />
    </div>
  );
};
