import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';
import { slots } from '../dummyData/slots';

const headlineStyles = css`
  ${headline.small()}
  margin: 0;
`;

const linkStyles = css`
  ${textSans.small()}
  margin: 0;
`;

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Automat UI | Home</title>
      </Helmet>
      <h2 className={headlineStyles}>Automat Slots</h2>
      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            <Link to={`/slots/${slot.id}`} className={linkStyles}>
              {slot.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
