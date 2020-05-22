import React, { useState, useEffect } from 'react';
// import { Counter } from '../components/Counter';
// import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';
// import { Button } from '../components/Button';

const headlineStyles = css`
  ${headline.small()}
  margin: 0;
  margin-bottom: 20px;
`;

export const Slots = () => {
  // const history = useHistory();
  // const slots

  useEffect(() => {
    fetch('http://localhost:9000/admin/slots/1/tests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        console.log('Respose: ');
        console.log(json);
      })
      .catch((error): void => console.error(error));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Automat UI | Example</title>
      </Helmet>
      <h2 className={headlineStyles}>Slots</h2>
    </div>
  );
};
