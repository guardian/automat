import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';

const headlineStyles = css`
  ${headline.small()}
`;

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Home</title>
      </Helmet>
      <h2 className={headlineStyles}>Home</h2>
      <ul>
        <li>
          <Link to="/example">Example Page</Link>
        </li>
      </ul>
    </div>
  );
};
