import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Grid, Typography, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ListTests } from '../components/ListTests';
import { useApi } from '../lib/useApi';
import { Spinner } from '../components/Spinner';
import { Test, Slot } from '../types';
import { TestConfig } from '../components/TestConfig';

const rootStyles = css`
  width: 100%;
`;

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

const buttonBarStyles = css`
  margin-top: 4px;
`;

const textLinkStyles = css`
  font-weight: bold;
  color: inherit;
`;

type Props = {
  slots: Slot[];
};

export const Tests = ({ slots }: Props) => {
  const history = useHistory();

  const { slotId, testId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);

  const { data, loading } = useApi<any>(`http://localhost:9000/admin/slots/${slotId}/tests`);

  let test: Test | undefined;
  if (data && data.tests) {
    test = data.tests.find((test: Test) => test.id === testId);
  }

  return (
    <div className={rootStyles}>
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

      <Grid container spacing={4}>
        <Grid item xs={4}>
          {data && data.tests && slot && <ListTests tests={data.tests} slot={slot} selectedTestId={test?.id} />}
        </Grid>
        <Grid item xs>
          {data && data.tests && test && (
            <TestConfig
              test={test}
              onTestUpdated={(test: Test) => console.log('Test Updated: ', test)}
              onTestDeleted={(test: Test) => console.log('Test Deleted: ', test)}
            />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} direction="row" alignItems="center" className={cx(buttonBarStyles)}>
        <Grid item>
          <Button startIcon={<AddIcon />} color="primary" variant="contained" onClick={() => history.push(`/slots/${slot?.id}/create`)}>
            Create Test
          </Button>
        </Grid>
        <Grid item>
          <span style={{ fontWeight: 'bold' }}>OR</span>
        </Grid>
        <Grid item>
          <Link to="/" className={cx(textLinkStyles)}>
            Back to Slots
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
