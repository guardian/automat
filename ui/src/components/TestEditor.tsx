import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { Test } from '../types';
import { Button, Typography, Paper, TextField, Tabs, Tab, Grid, Card, Switch } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { Heading } from './Heading';
import { ConfirmDialog } from './ConfirmDialog';

const rootStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;

const wrapperStyles = css`
  width: 100%;
`;

const headerStyles = css`
  margin-bottom: 8px;
`;

const switchLabelStyles = css`
  margin: 0;
`;

const formFieldStyles = css`
  margin: 1em 0;
`;

const tabWrapperStyles = css`
  flex-grow: 1;
  background-color: #eeeeee;
  margin-bottom: 24px;
`;

const inputStyles = css`
  width: 100%;
`;

const footerTextStyles = css`
  color: #9e9e9e;
  font-size: 12px;
`;

type Props = {
  workingTest: Test;
  testName: string;
  onTestUpdated: Function;
  onTestDeleted: Function;
  isEditing: boolean;
};

export const TestEditor = ({ workingTest, testName, onTestUpdated, onTestDeleted, isEditing }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Resets active tab when switching tests
  useEffect(() => {
    setActiveTabIndex(0);
  }, [workingTest]);

  const onTabClick = (event: any, newTabIndex: any) => setActiveTabIndex(newTabIndex);

  // Make dates nice for presentation
  const formattedCreatedDate = new Date(workingTest.created).toLocaleString().slice(0, 10);
  const formattedUpdatedDate = new Date(workingTest.updated).toLocaleString().replace(',', ' - ');

  return (
    <Card className={cx(rootStyles)}>
      <div className={wrapperStyles}>
        <Grid container spacing={2} justify="space-between" className={cx(headerStyles)}>
          <Grid item xs={8}>
            <Heading level={2} supressMargin>
              {testName}
            </Heading>
          </Grid>
          <Grid item>
            <div className={switchLabelStyles}>
              Live on <b>theguardian.com</b>{' '}
              <Switch
                checked={workingTest.isEnabled}
                onChange={(e) => {
                  const isEnabled = e.currentTarget.checked;
                  onTestUpdated({ ...workingTest, isEnabled });
                }}
                color="primary"
                disabled={!isEditing}
              />
            </div>
          </Grid>
        </Grid>

        <Paper elevation={0} className={cx(tabWrapperStyles)}>
          <Tabs value={activeTabIndex} onChange={onTabClick} indicatorColor="primary" textColor="primary">
            <Tab label="Basic" />
            <Tab label="Variants" />
            <Tab label="Filters" />
          </Tabs>
        </Paper>

        {activeTabIndex === 0 && (
          <>
            <div className={formFieldStyles}>
              <TextField
                className={inputStyles}
                value={workingTest.name}
                disabled={!isEditing}
                onChange={(e) => onTestUpdated({ ...workingTest, name: e.currentTarget.value })}
                label="Test Name"
                variant="outlined"
              />
            </div>
            <div className={formFieldStyles}>
              <TextField
                className={inputStyles}
                value={workingTest.description}
                disabled={!isEditing}
                onChange={(e) => onTestUpdated({ ...workingTest, description: e.currentTarget.value })}
                label="Description"
                variant="outlined"
                multiline
                rows={4}
              />
            </div>
          </>
        )}

        <Grid container spacing={2} justify="space-between" alignItems="center">
          <Grid item>
            <p className={cx(footerTextStyles)}>
              {workingTest.author && workingTest.author.firstName && workingTest.author.lastName ? (
                <>
                  Test created on {formattedCreatedDate} by {`${workingTest.author.firstName} ${workingTest.author.lastName}`} <br /> Last updated:{' '}
                  {formattedUpdatedDate}
                </>
              ) : (
                <>
                  Test created on {formattedCreatedDate}.
                  <br /> Last updated: {formattedUpdatedDate}
                </>
              )}
            </p>
          </Grid>
          <Grid item>
            <Button disabled={!isEditing} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => setDeleteConfirmation(true)}>
              Delete Test
            </Button>
            {deleteConfirmation && (
              <ConfirmDialog
                title={`Delete '${workingTest.name}'?`}
                message="Are you sure you want to delete this test?"
                buttons={
                  <>
                    <Button onClick={() => setDeleteConfirmation(false)} variant="contained">
                      Cancel
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        onTestDeleted(workingTest.id);
                        setDeleteConfirmation(false);
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Delete Test
                    </Button>
                  </>
                }
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
