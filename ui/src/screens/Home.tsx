import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline, body } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';

const headlineStyles = css`
  ${headline.small()}
  margin: 0;
`;

const dummyStyles = css`
  ${body.medium()};
`;

const userProfileStyles = css`
  padding: 20px;
  border: 1px solid grey;
  margin-top: 20px;
  border-radius: 5px;
`;

type Props = {
  userProfile?: any;
  accessToken?: string | null;
};

export const Home = ({ userProfile, accessToken }: Props) => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Home</title>
      </Helmet>
      <h2 className={headlineStyles}>Home</h2>
      {userProfile && accessToken && (
        <div className={userProfileStyles}>
          <p className={dummyStyles}>Welcome back, {userProfile.givenName}</p>
          <p className={dummyStyles}>
            Your access token is <pre style={{ display: 'inline', background: 'grey', color: 'white', padding: '4px' }}>{accessToken}</pre> but don't tell
            anyone.
          </p>
          <p className={dummyStyles}>
            Click here to go to the <Link to="/example">Example Page</Link>
          </p>
        </div>
      )}
    </div>
  );
};
