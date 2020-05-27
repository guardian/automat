import React from 'react';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { Test } from '../types';
import { Card, Switch } from '@material-ui/core';

const rootStyles = css`
  width: 100%;
`;

const cardStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;

const headingStyles = css`
  font-weight: bold;
  margin: 0 auto 20px;
`;

type Props = {
  test: Test;
  onTestUpdated: Function;
  onTestDeleted: Function;
};

export const TestConfig = ({ test, onTestUpdated, onTestDeleted }: Props) => {
  // const [test, setTest] = useState(unmodifiedTest);

  // useEffect(() => {
  //   // TODO: confirm discard changes
  //   setTest(unmodifiedTest);
  // }, [unmodifiedTest]);

  return (
    <Card className={cx(cardStyles)}>
      <div className={rootStyles}>
        <Typography component="h4" variant="h6" align="left" className={cx(headingStyles)}>
          {test.name}
        </Typography>

        <p>
          Live on theguardian.com{' '}
          <Switch
            checked={test.enabled}
            onChange={(e) => {
              const enabled = e.currentTarget.checked;
              onTestUpdated({ ...test, enabled });
            }}
            color="primary"
          />
        </p>

        <p>{test.description}</p>
      </div>
    </Card>
  );
};
