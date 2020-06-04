import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography } from '@material-ui/core';
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

const slotNameStyles = css`
  font-weight: bold;
  margin-bottom: 12px;
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
            <Typography component="h6" variant="h6" className={cx(slotNameStyles)}>
              {slot.name}
            </Typography>
          </Paper>
        </Link>
      </Grid>
    ))}
  </Grid>
);
