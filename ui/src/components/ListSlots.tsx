import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Paper, Grid, Chip, Typography } from '@material-ui/core';

const rootStyles = css`
  flex-grow: 1;
`;

const paperStyles = css`
  height: 180px;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const itemStyles = css`
  text-decoration: none;
  color: inherit;
  display: block;
  text-align: center;
`;

const slotNameStyles = css`
  font-weight: bold;
  margin-bottom: 12px;
`;

const chipStyles = css`
  cursor: pointer;
  pointer-events: none;
`;

interface Slot {
  id: string;
  name: string;
  testCount?: number;
}

type Props = {
  slots: Slot[];
};

export const ListSlots = ({ slots }: Props): JSX.Element => (
  <Grid container className={cx(rootStyles)} spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        {slots.map((slot) => (
          <Grid key={slot.id} item>
            <Link to={`/slots/${slot.id}`} className={cx(itemStyles)}>
              <Paper className={cx(paperStyles)}>
                <Typography component="h6" variant="h6" className={cx(slotNameStyles)}>
                  {slot.name}
                </Typography>
                {slot.testCount !== undefined && <Chip label={`${slot.testCount} tests`} className={cx(chipStyles)} />}
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
