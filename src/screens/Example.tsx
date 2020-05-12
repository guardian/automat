import React from 'react';
import { Counter } from '../components/Counter';
import { useHistory } from 'react-router-dom';

export const Example = () => {
  const history = useHistory();
  return (
    <div>
      <h2>Example</h2>
      <Counter name="Roberto" />
      <p>
        <button onClick={() => history.goBack()}>Go back</button>
      </p>
    </div>
  );
};
