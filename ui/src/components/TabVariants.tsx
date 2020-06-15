import React from 'react';
import { css } from 'emotion';
import { Heading } from './Heading';
import { Test } from '../types';

const rootStyles = css``;

type Props = {
  test: Test;
  isEditing: boolean;
  onTestUpdated: Function;
};

export const TabVariants = ({ test, isEditing, onTestUpdated }: Props) => {
  return (
    <div className={rootStyles}>
      <Heading level={2}>Variants</Heading>
    </div>
  );
};
