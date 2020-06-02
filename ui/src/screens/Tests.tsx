import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { css, cx } from 'emotion';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
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

const marginTop = css`
  margin-top: 16px;
`;

const marginBottom = css`
  margin-bottom: 16px;
`;

const getDesktopStyles = (isEditing: boolean) => css`
  padding: 12px;
  border-radius: 4px;
  border: 5px solid ${isEditing ? '#FFF59D' : 'white'};
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

      <div className={marginBottom}>
        <EditModeToggle
          isEditing={isEditing}
          onStatusChanged={(newState: boolean) => setIsEditing(newState)}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>

      {loading && <Spinner />}

      <Card className={cx(getDesktopStyles(isEditing))}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Button
              className={marginBottom}
              disabled={!isEditing}
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              onClick={() => history.push(`/slots/${slot?.id}/create`)}
            >
              Create Test
            </Button>
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

      <Button className={cx(marginTop)} startIcon={<ArrowBackIcon />} color="primary" onClick={() => history.push(`/`)}>
        Back to Slots
      </Button>
    </div>
  );
};
