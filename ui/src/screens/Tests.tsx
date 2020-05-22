import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { headline, textSans } from '@guardian/src-foundations/typography/cjs';
import { css } from 'emotion';
import { slots } from '../dummyData/slots';
import { Link } from 'react-router-dom';

const headlineStyles = css`
  ${headline.small()}
  margin-top: 0;
  margin-bottom: 40px;
`;

const subHeadlineStyles = css`
  ${headline.xxsmall()}
  margin-top: 0;
  margin-bottom: 20px;
`;

const testListStyles = css`
  margin: 0;
  padding: 0;
`;

const testItemStyles = css`
  list-style: none;
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
`;

const linkStyles = css`
  ${textSans.medium({ fontWeight: 'bold' })}
  margin: 0;
  text-decoration: none;
`;

const testTextStyles = css`
  ${textSans.small()}
`;

const backStyles = css`
  ${textSans.small()}
  margin: 0;
  cursor: pointer;
  text-decoration: underline;
`;

type Variant = string;
type Section = string;

interface Test {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  variants: Variant[];
  sections: Section[];
}

export const Tests = () => {
  const { slotId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);
  const history = useHistory();

  const [tests, setTests] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9000/admin/slots/${slotId}/tests`, {
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
      .then((data) => setTests(data.tests))
      .catch((error): void => console.error(error));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Automat UI | {slot?.name}</title>
      </Helmet>
      <h2 className={headlineStyles}>{slot?.name} Slot</h2>

      <h3 className={subHeadlineStyles}>Configured Tests</h3>
      <ul className={testListStyles}>
        {tests.map((test: Test) => (
          <li key={test.id} className={testItemStyles}>
            <Link to={`slots/${slotId}/test/${test.id}`} className={linkStyles}>
              {test.name}
            </Link>
            <p className={testTextStyles}>{test.description}</p>
            <p className={testTextStyles}>{test.enabled ? 'Active' : 'Inactive'}</p>
          </li>
        ))}
      </ul>
      <p className={backStyles} onClick={() => history.goBack()}>
        Go back
      </p>
    </div>
  );
};
