import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Grid, Typography, Button, ButtonGroup, Card } from '@material-ui/core';
import { Add as AddIcon, Save as SaveIcon, Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { ListTests } from '../components/ListTests';
import { useApi } from '../lib/useApi';
import { Spinner } from '../components/Spinner';
import { Test, Slot } from '../types';
import { TestConfig } from '../components/TestConfig';
import { EditModeToggle } from '../components/EditModeToggle';

const rootStyles = css`
  width: 100%;
`;

const headingStyles = css`
  font-weight: bold;
  margin: 20px auto;
`;

const backLinkStyles = css`
  margin-top: 16px;
`;

const getDesktopStyles = (isEditing: boolean) => css`
  padding: 12px;
  border-radius: 4px;
  background-color: ${isEditing ? '#fff59d' : 'white'};
`;

type Props = {
  slots: Slot[];
};

export const Tests = ({ slots }: Props) => {
  const history = useHistory();

  const [isEditing, setIsEditing] = useState(false);

  const { slotId, testId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);

  const { data, loading } = useApi<any>(`http://localhost:9000/admin/slots/${slotId}/tests`);
  const [tests, setTests] = useState([] as Test[]);
  useEffect(() => {
    if (data && data.tests) {
      setTests(data.tests);
    }
  }, [data]);

  let test: Test | undefined;
  if (tests) {
    test = tests.find((test: Test) => test.id === testId);
  }

  const handleTestUpdate = (updatedTest: Test) => {
    const updatedTests = tests.map((test: Test) => (updatedTest.id === test.id ? updatedTest : test));
    setTests([...updatedTests]);
  };

  return (
    <div className={rootStyles}>
      <Helmet>
        <title>Automat UI | {slot?.name} Slot</title>
      </Helmet>
      <Typography component="h1" variant="h4" color="inherit" className={cx(headingStyles)}>
        {slot?.name} Slot
      </Typography>

      <EditModeToggle
        isEditing={isEditing}
        onStatusChanged={(newState: boolean) => setIsEditing(newState)}
        onSave={() => setIsEditing(false)}
        onCancel={() => setIsEditing(false)}
      />

      <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h6" className={cx(headingStyles)}>
            Configured Tests
          </Typography>
        </Grid>
        <Grid item>
          <Button disabled={!isEditing} startIcon={<AddIcon />} color="primary" variant="contained" onClick={() => history.push(`/slots/${slot?.id}/create`)}>
            Create Test
          </Button>
        </Grid>
      </Grid>

      {loading && <Spinner />}

      <Card className={cx(getDesktopStyles(isEditing))}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {slot && tests && <ListTests tests={tests} slot={slot} selectedTestId={test?.id} />}
          </Grid>
          <Grid item xs>
            {slot && tests && test && (
              <TestConfig
                test={test}
                onTestUpdated={handleTestUpdate}
                onTestDeleted={(deletedTest: Test) => console.log('Test Deleted: ', deletedTest)}
                isEditing={isEditing}
              />
            )}
          </Grid>
        </Grid>
      </Card>

      <Button className={cx(backLinkStyles)} startIcon={<ArrowBackIcon />} color="primary" onClick={() => history.push(`/`)}>
        Back to Slots
      </Button>
    </div>
  );
};
