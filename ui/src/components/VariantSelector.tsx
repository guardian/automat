import React from 'react';
import { css, cx } from 'emotion';
import { Card, Grid, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Heading } from './Heading';
import { Variant } from '../types';
import { colors } from '../utils/theme';
import { alphabet } from '../utils/alphabet';

const rootStyles = css`
  width: 100%;
  background-color: ${colors.lighterGrey};
  border: 1px solid ${colors.darkerGrey};
  padding: 3px 0 3px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const gridStyles = css`
  width: 100%;
`;

const indexStyles = css`
  font-size: 48px;
  text-align: center;
  margin: 0;
`;

const noMargin = css`
  margin: 0;
`;

type Props = {
  index: number;
  variant: Variant;
  isEditing: boolean;
  onChange: Function;
};

export const VariantSelector = ({ index, variant, isEditing }: Props) => {
  return (
    <Card elevation={0} className={rootStyles}>
      <Grid container spacing={2} justify="flex-start" alignItems="center" className={cx(gridStyles)}>
        <Grid item xs={1} alignContent="center">
          <p className={indexStyles}>{alphabet[index]}</p>
        </Grid>
        <Grid item xs={10}>
          <Heading level={2} supressMargin>
            {variant.name}
          </Heading>
          <p className={noMargin}>{variant.description}</p>
        </Grid>
        <Grid item xs={1}>
          <IconButton disabled={!isEditing}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};
