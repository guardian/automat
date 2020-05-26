import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography, Button } from '@material-ui/core';
import { ListTests } from '../components/ListTests';
import { useApi } from '../lib/useApi';
import { Spinner } from '../components/Spinner';
import { Slot } from '../types';

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

type Props = {
  slots: Slot[];
};

export const Tests = ({ slots }: Props) => {
  const history = useHistory();

  const { slotId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);

  const { data, loading } = useApi<any>(`http://localhost:9000/admin/slots/${slotId}/tests`);

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

      {loading && <Spinner />}

      {data && data.tests && slot && <ListTests tests={data.tests} slot={slot} />}

      <Button variant="contained" onClick={() => history.goBack()}>
        Go Back
      </Button>
    </div>
  );
};
