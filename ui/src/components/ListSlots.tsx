import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { slots } from '../dummyData/slots';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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

export const ListSlots = (): JSX.Element => (
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
                <Chip label={`${slot.testCount} tests`} className={cx(chipStyles)} />
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
