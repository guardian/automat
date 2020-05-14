import React from 'react';
import { palette } from '@guardian/src-foundations';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { Button } from '@guardian/src-button';
import { ThemeProvider } from 'emotion-theming';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

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

// TODO: doesn't belong here. Env variable? Or app config somewhere
const clientId = '831915016487-plnb057inq29g9t4rp409l5f3495217e.apps.googleusercontent.com';

type Props = {
  isSignedIn: boolean;
  onUserProfileUpdated: Function;
  onAccessTokenUpdated: Function;
};

export const Header: React.FC<Props> = ({ isSignedIn, onUserProfileUpdated, onAccessTokenUpdated }: Props) => {
  return (
    <ThemeProvider theme={contributionsTheme}>
      <header className={headerStyles}>
        <Link to="/" className={linkStyles}>
          <img src="/automat-logo.png" alt="Automat logo" className={autoLogoStyles} />
        </Link>
        <div className={loginStyles}>
          {!isSignedIn && (
            <GoogleLogin
              clientId={clientId}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              onSuccess={(response: any) => {
                const { profileObj: userProfile, accessToken } = response;
                onUserProfileUpdated(userProfile);
                onAccessTokenUpdated(accessToken);
              }}
              onFailure={(response) => {
                onUserProfileUpdated(null);
                onAccessTokenUpdated(null);
              }}
              onAutoLoadFinished={() => {}}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} priority="primary">
                  Log In
                </Button>
              )}
            />
          )}
          {isSignedIn && (
            <GoogleLogout
              clientId={clientId}
              onLogoutSuccess={() => {
                onUserProfileUpdated(null);
                onAccessTokenUpdated(null);
              }}
              render={(renderProps) => (
                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} priority="secondary">
                  Logout
                </Button>
              )}
            ></GoogleLogout>
          )}
          <img src="/guardian-logo.png" alt="The Guardian logo" className={guLogoStyles} />
        </div>
      </header>
    </ThemeProvider>
  );
};
