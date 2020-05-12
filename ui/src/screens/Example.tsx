import React from 'react';
import { Counter } from '../components/Counter';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';

const headlineStyles = css`
  ${headline.small()}
`;

export const Example = () => {
  const history = useHistory();
  return (
    <div>
      <Helmet>
        <title>Automat UI | Example</title>
      </Helmet>
      <h2 className={headlineStyles}>Example</h2>
      <Counter />
      <p>
        <button onClick={() => history.goBack()}>Go back</button>
      </p>
    </div>
  );
};
