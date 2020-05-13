import React from 'react';
import { Counter } from '../components/Counter';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';
import { Button } from '../components/Button';

const headlineStyles = css`
  ${headline.small()}
  margin: 0;
  margin-bottom: 20px;
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
        <Button onClickAction={() => history.goBack()} priority="secondary">
          Go back
        </Button>
      </p>
    </div>
  );
};
