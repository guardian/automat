import React from 'react';
import { Global } from '@emotion/core';
import { css } from 'emotion';

export const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }
    `}
  />
);
