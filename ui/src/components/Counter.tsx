import React, { useState } from 'react';
import { body, headline } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';
import { css } from 'emotion';
import { Button } from '../components/Button';

// This is a dummy/example component copied across from another repo.
// TODO: delete this
type Props = {
  startFrom?: number;
};

const wrapperStyles = css`
  border-radius: 5px;
`;

const headingStyles = css`
  ${headline.xsmall()}
  margin-top: 0;
  margin-bottom: ${space[3]}px;
`;

const bodyStyles = css`
  ${body.medium()};
  margin: 0 auto ${space[2]}px;
`;

export const Counter: React.FC<Props> = ({ startFrom = 1 }: Props) => {
  const [counter, setCounter] = useState(startFrom);

  return (
    <div className={wrapperStyles}>
      <h1 className={headingStyles}>This is a counter.</h1>
      <p className={bodyStyles}>Counter: {counter}</p>
      <Button onClickAction={(): void => setCounter(counter + 1)} priority="primary">
        Increment
      </Button>
    </div>
  );
};
