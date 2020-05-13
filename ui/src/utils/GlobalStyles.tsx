import React from 'react';
import { Global } from '@emotion/core';
import { css } from 'emotion';
import { FocusStyleManager } from '@guardian/src-foundations/utils';

export const GlobalStyles: React.FC = () => {
  FocusStyleManager.onlyShowFocusOnTabs();
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
      `}
    />
  );
};
