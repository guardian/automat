import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Test } from '../types';
import { Button, Typography, Paper, TextField, Tabs, Tab, Grid, Card, Switch } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const rootStyles = css`
  width: 100%;
`;

const cardStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px;
`;

const headingStyles = css`
  font-weight: bold;
  margin: 0 auto 24px;
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

const footerTextStyles = css``;

type Props = {
  test: Test;
  onTestUpdated: Function;
  onTestDeleted: Function;
  isEditing: boolean;
};

export const TestConfig = ({ test, onTestUpdated, onTestDeleted, isEditing }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onTabClick = (event: any, newTabIndex: any) => setActiveTabIndex(newTabIndex);

  // Make dates nice for presentation
  const formattedCreatedDate = new Date(test.created).toLocaleString().slice(0, 10);
  const formattedUpdatedDate = new Date(test.updated).toLocaleString().replace(',', ' - ');

  return (
    <Card className={cx(cardStyles)}>
      <div className={rootStyles}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography component="h4" variant="h6" align="left" className={cx(headingStyles)}>
              {test.name}
            </Typography>
          </Grid>
          <Grid item>
            <div className={switchLabelStyles}>
              Live on <b>theguardian.com</b>{' '}
              <Switch
                checked={test.isEnabled}
                onChange={(e) => {
                  const isEnabled = e.currentTarget.checked;
                  onTestUpdated({ ...test, isEnabled });
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
                value={test.name}
                disabled={!isEditing}
                onChange={(e) => onTestUpdated({ ...test, name: e.currentTarget.value })}
                label="Test Name"
                variant="outlined"
              />
            </div>
            <div className={formFieldStyles}>
              <TextField
                className={inputStyles}
                value={test.description}
                disabled={!isEditing}
                onChange={(e) => onTestUpdated({ ...test, description: e.currentTarget.value })}
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
            <p className={footerTextStyles}>
              {test.author && test.author.firstName && test.author.lastName ? (
                <>
                  Test created on {formattedCreatedDate} by {`${test.author.firstName} ${test.author.lastName}`} <br /> Last updated: {formattedUpdatedDate}
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
            <Button disabled={!isEditing} variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => onTestDeleted(test.id)}>
              Delete Test
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
