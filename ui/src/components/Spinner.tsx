import React from 'react';
import { css } from 'emotion';
import { CircularProgress } from '@material-ui/core';

const spinnerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
`;

export const Spinner = () => (
  <div className={spinnerStyles}>
    <CircularProgress />
  </div>
);
