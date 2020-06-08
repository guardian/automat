import React from 'react';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';

const getRootStyles = (supressMargin: boolean) => css`
  font-weight: bold;
  margin: ${supressMargin ? '0' : '20px'} auto;
`;

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingMatch {
  component: HeadingVariant;
  variant: HeadingVariant;
}

type HeadingLevel = 1 | 2;

type LevelConfig = Record<HeadingLevel, HeadingMatch>;

const levels: LevelConfig = {
  1: {
    component: 'h1',
    variant: 'h4',
  },
  2: {
    component: 'h4',
    variant: 'h6',
  },
};

type Props = {
  children: JSX.Element | string;
  level?: HeadingLevel;
  center?: false;
  supressMargin?: boolean;
};

export const Heading = ({ level = 1 as HeadingLevel, children, center = false, supressMargin = false }: Props) => {
  const levelConfig = levels[level] as HeadingMatch;
  if (levelConfig) {
    const { component, variant } = levelConfig;
    return (
      <Typography component={component} variant={variant} align={center ? 'center' : 'left'} className={cx(getRootStyles(supressMargin))}>
        {children}
      </Typography>
    );
  }
  return null;
};
