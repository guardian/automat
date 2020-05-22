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

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Home</title>
      </Helmet>
      <h2 className={headlineStyles}>Home</h2>
      {/* <p className={dummyStyles}>
        Click here to go to the <Link to="/example">Example Page</Link>
      </p> */}
      <ul>
        <li>
          <Link to="/slots">Slots</Link>
        </li>
      </ul>
    </div>
  );
};
