import React from 'react';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { ListSlots } from '../components/ListSlots';
import { Slot } from '../types';

const rootStyles = css`
  width: 100%;
`;

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

type Props = {
  slots: Slot[];
};

export const Slots = ({ slots }: Props) => {
  return (
    <div className={rootStyles}>
      <Helmet>
        <title>Automat UI | Slots</title>
      </Helmet>
      <Typography component="h1" variant="h4" noWrap className={cx(headingStyles)}>
        Slots
      </Typography>
      {slots && <ListSlots slots={slots} />}
    </div>
  );
};
