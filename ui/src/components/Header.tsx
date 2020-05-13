import React from 'react';
import { palette } from '@guardian/src-foundations';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { Button } from '@guardian/src-button';
import { ThemeProvider } from 'emotion-theming';

// TODO: abstract into our own Button component
const buttonStyles = {
  textPrimary: palette.neutral[7],
  backgroundPrimary: palette.brandAlt.main,
  backgroundPrimaryHover: palette.brandAlt.dark,
  textSecondary: palette.neutral[7],
  backgroundSecondary: palette.neutral[93],
  backgroundSecondaryHover: palette.neutral[86],
  borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
  button: buttonStyles,
  link: buttonStyles,
};

const headerStyles = css`
  width: calc(100% - 40px);
  height: 40px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette.brand.main};
`;

const linkStyles = css`
  display: flex;
  justify-content: space-between;
`;

const autoLogoStyles = css`
  height: 35px;
`;

const guLogoStyles = css`
  height: 35px;
  margin-left: 20px;
`;

const loginStyles = css`
  display: flex;
  align-items: center;
`;

export const Header: React.FC = () => {
  return (
    <ThemeProvider theme={contributionsTheme}>
      <header className={headerStyles}>
        <Link to="/" className={linkStyles}>
          <img src="/automat-logo.png" alt="Automat logo" className={autoLogoStyles} />
        </Link>
        <div className={loginStyles}>
          <Button priority="primary">Sign In</Button>
          <img src="/guardian-logo.png" alt="The Guardian logo" className={guLogoStyles} />
        </div>
      </header>
    </ThemeProvider>
  );
};
