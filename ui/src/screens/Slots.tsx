import React from 'react';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { ListSlots } from '../components/ListSlots';
import { Spinner } from '../components/Spinner';
import { useApi } from '../lib/useApi';

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

export const Slots = () => {
  const { data, loading, error } = useApi<any>(`http://localhost:9000/admin/slots`);

  return (
    <div>
      <Helmet>
        <title>Automat UI | Slots</title>
      </Helmet>

      <Typography component="h1" variant="h4" noWrap className={cx(headingStyles)}>
        Slots
      </Typography>

      {loading && <Spinner />}

      {data && <ListSlots slots={data.slots} />}
    </div>
  );
};
