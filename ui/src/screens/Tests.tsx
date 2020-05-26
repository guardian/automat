import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography, Button } from '@material-ui/core';
import { ListTests } from '../components/ListTests';
import { slots } from '../dummyData/slots';

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

export const Tests = () => {
  const { slotId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);
  const history = useHistory();

  // TODO: abstract into lib file
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
  }, [slotId]);

  return (
    <div>
      <Helmet>
        <title>Automat UI | {slot?.name}</title>
      </Helmet>

      <Typography component="h1" variant="h4" color="inherit" className={cx(headingStyles)}>
        {slot?.name} Slot
      </Typography>

      <Typography component="h1" variant="h6" color="inherit" className={cx(headingStyles)}>
        Configured Tests
      </Typography>

      <ListTests tests={tests} slot={slot} />

      <Button variant="contained" onClick={() => history.goBack()}>
        Go Back
      </Button>
    </div>
  );
};
