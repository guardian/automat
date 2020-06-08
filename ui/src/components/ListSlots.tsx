import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { Heading } from '../components/Heading';
import { Slot } from '../types';

const paperStyles = css`
  height: 160px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const linkStyles = css`
  text-decoration: none;
`;

type Props = {
  slots: Slot[];
};

export const ListSlots = ({ slots }: Props): JSX.Element => (
  <Grid container spacing={2}>
    {slots.map((slot) => (
      <Grid key={slot.id} item>
        <Link to={`/slots/${slot.id}`} className={cx(linkStyles)}>
          <Paper className={cx(paperStyles)}>
            <Heading level={2}>{slot.name}</Heading>
          </Paper>
        </Link>
      </Grid>
    ))}
  </Grid>
);
