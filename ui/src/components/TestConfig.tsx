import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Typography } from '@material-ui/core';
import { Test } from '../types';
import { Paper, TextField, Tabs, Tab, Grid, Card, Switch, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

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
  margin: 0 auto 20px;
`;

const switchLabelStyles = css`
  margin: 0;
`;

const tabWrapperStyles = css`
  flex-grow: 1;
  background-color: #eeeeee;
`;

const inputStyles = css`
  width: 100%;
`;

type Props = {
  test: Test;
  onTestUpdated: Function;
  onTestDeleted: Function;
  isEditing: boolean;
};

export const TestConfig = ({ test, onTestUpdated, onTestDeleted, isEditing }: Props) => {
  const now = new Date();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date(now));
  const [endDate, setEndDate] = useState(new Date(now.setMonth(now.getMonth() + 1)));

  const onTabClick = (event: any, newTabIndex: any) => {
    setActiveTabIndex(newTabIndex);
  };

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
            <p className={switchLabelStyles}>
              Live on <b>theguardian.com</b>{' '}
              <Switch
                checked={test.enabled}
                onChange={(e) => {
                  const enabled = e.currentTarget.checked;
                  onTestUpdated({ ...test, enabled });
                }}
                color="primary"
                disabled={!isEditing}
              />
            </p>
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
          <div>
            <p>
              <TextField
                className={inputStyles}
                value={test.name}
                disabled={!isEditing}
                onChange={(e) => onTestUpdated({ ...test, name: e.currentTarget.value })}
                label="Test Name"
                variant="outlined"
              />
            </p>
            <p>
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
            </p>

            <Grid container spacing={2}>
              <Grid item>
                <InputLabel>
                  <b>Start Date</b>
                </InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker disabled={!isEditing} margin="dense" format="dd/MM/yyyy" value={startDate} onChange={(date: any) => setStartDate(date)} />
                  <KeyboardTimePicker disabled={!isEditing} margin="dense" value={startDate} onChange={(date: any) => setStartDate(date)} />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <InputLabel>
                  <b>End Date</b>
                </InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker disabled={!isEditing} margin="dense" format="dd/MM/yyyy" value={endDate} onChange={(date: any) => setEndDate(date)} />
                  <KeyboardTimePicker disabled={!isEditing} margin="dense" value={endDate} onChange={(date: any) => setEndDate(date)} />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </Card>
  );
};
