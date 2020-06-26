import React from 'react';
import { css, cx } from 'emotion';
import { Link } from 'react-router-dom';
import { Grid, Card } from '@material-ui/core';
import { ViewQuilt as ViewQuiltIcon } from '@material-ui/icons';
import { Heading } from '../components/Heading';
import { Slot } from '../types';

const cardStyles = css`
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

const iconStyles = css`
  font-size: 36px;
`;

type Props = {
  slots: Slot[];
};

export const SlotsList = ({ slots }: Props): JSX.Element => (
  <Grid container spacing={2} role="list">
    {slots.map((slot) => (
      <Grid key={slot.id} item role="listitem">
        <Link to={`/slots/${slot.id}`} className={cx(linkStyles)}>
          <Card className={cx(cardStyles)}>
            <Heading level={2} supressMargin>
              {slot.name}
            </Heading>
            <ViewQuiltIcon className={iconStyles} />
          </Card>
        </Link>
      </Grid>
    ))}
  </Grid>
);
