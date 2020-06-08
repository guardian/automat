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
import { TestEditor } from '../components/TestEditor';
import { EditModeToggle } from '../components/EditModeToggle';
import { createTest } from '../lib/testFactory';

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

const getWorktopStyles = (isEditing: boolean) => css`
  padding: 12px;
  border-radius: 4px;
  border: 5px solid ${isEditing ? '#ffeb3b' : 'white'};
`;

type Props = {
  slots: Slot[];
};

export const Tests = ({ slots }: Props) => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);

  const { slotId, testId } = useParams();
  const slot = slots.find((slot) => slot.id === slotId);

  const { data, loading } = useApi<any>(`http://localhost:3004/tests`);
  const [workingTests, setWorkingTests] = useState([] as Test[]);
  const [savedTests, setSavedTests] = useState([] as Test[]);
  const [testName, setTestName] = useState('');
  const [workingTest, setWorkingTest] = useState(undefined as Test | undefined);

  // Handle change checks
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    const hasChanges = JSON.stringify(workingTests) !== JSON.stringify(savedTests);
    setHasChanges(hasChanges);
  }, [workingTests, savedTests]);

  useEffect(() => {
    if (data) {
      setSavedTests(data);
      setWorkingTests(data);
    }
  }, [data]);

  useEffect(() => {
    const workingTest = workingTests.find((test: Test) => testId === test.id);
    if (workingTest) {
      setWorkingTest(workingTest);
    }
  }, [testId, workingTests]);

  useEffect(() => {
    const savedTest = savedTests.find((test: Test) => testId === test.id);
    if (savedTest) {
      setTestName(savedTest.name);
    } else {
      setTestName('Untitled Test'); // New test
    }
  }, [testId, savedTests, workingTests]);

  const onCreateTest = () => {
    const newTest = createTest({});
    const updatedTestList = [newTest, ...workingTests];
    setWorkingTests(updatedTestList);

    // Redirect to first test in list
    const nextTest = updatedTestList[0];
    if (slot) {
      history.push(`/slots/${slot.id}/tests/${nextTest.id}`);
    }
  };

  const onUpdateTest = (updatedTest: Test) => {
    const updatedTestList = workingTests.map((test: Test) => (updatedTest.id === test.id ? updatedTest : test));
    setWorkingTests([...updatedTestList]);
  };

  const onDeleteTest = (deletedTestId: string) => {
    const testIndex = workingTests.findIndex((test: Test) => deletedTestId === test.id);
    const updatedTestList = workingTests.filter((test: Test, index: number) => index !== testIndex);
    setWorkingTests([...updatedTestList]);

    // Redirect to next test in list
    const nextTest = updatedTestList[testIndex];
    if (slot) {
      const goTo = nextTest ? `/slots/${slot.id}/tests/${nextTest.id}` : `/slots/${slot.id}`;
      history.push(goTo);
    }
  };

  const onSaveChanges = () => {
    // TODO: API WORK
    setSavedTests(workingTests);
    setIsEditing(false);
  };

  const onRevertChanges = () => {
    setWorkingTests(savedTests);
    setIsEditing(false);
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
        <EditModeToggle isEditing={isEditing} hasChanges={hasChanges} onUnlock={() => setIsEditing(true)} onSave={onSaveChanges} onRevert={onRevertChanges} />
      </div>

      {loading && <Spinner />}

      <Card className={cx(getWorktopStyles(isEditing))}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Button className={marginBottom} disabled={!isEditing} startIcon={<AddIcon />} color="primary" variant="contained" onClick={onCreateTest}>
              Create Test
            </Button>
            {slot && workingTests && <ListTests workingTests={workingTests} savedTests={savedTests} slot={slot} selectedTestId={testId} />}
          </Grid>
          <Grid item xs>
            {slot && workingTest && (
              <TestEditor workingTest={workingTest} testName={testName} onTestUpdated={onUpdateTest} onTestDeleted={onDeleteTest} isEditing={isEditing} />
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
