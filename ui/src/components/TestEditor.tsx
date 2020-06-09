import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { Test } from '../types';
import { Paper, Tabs, Tab, Grid, Card, Switch } from '@material-ui/core';
import { EditorFooter } from './EditorFooter';
import { Heading } from './Heading';
import { TabBasic } from './TabBasic';
import { TabVariants } from './TabVariants';
import { TabFilters } from './TabFilters';
import { colors } from '../utils/theme';

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

const switchStyles = css`
  margin: 0;
`;

const contentAreaStyles = css`
  flex-grow: 1;
`;

const tabButtonsStyles = css`
  background-color: ${colors.lighterGrey};
  margin-bottom: 24px;
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const tabContentStyles = css``;

type Props = {
  workingTest: Test;
  testName: string;
  isEditing: boolean;
  onTestUpdated: Function;
  onTestDeleted: Function;
};

export const TestEditor = ({ workingTest, testName, onTestUpdated, onTestDeleted, isEditing }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    setActiveTabIndex(0);
  }, [workingTest]);

  const onTabClick = (event: any, newTabIndex: any) => setActiveTabIndex(newTabIndex);

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
            <div className={switchStyles}>
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

        <Paper elevation={0} className={cx(contentAreaStyles)}>
          <Tabs value={activeTabIndex} onChange={onTabClick} indicatorColor="primary" textColor="primary" className={tabButtonsStyles}>
            <Tab label="Basic" />
            <Tab label="Variants" />
            <Tab label="Filters" />
          </Tabs>
          <section className={tabContentStyles}>
            {activeTabIndex === 0 && <TabBasic test={workingTest} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
            {activeTabIndex === 1 && <TabVariants test={workingTest} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
            {activeTabIndex === 2 && <TabFilters test={workingTest} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
          </section>
        </Paper>

        <EditorFooter test={workingTest} isEditing={isEditing} onTestDeleted={onTestDeleted} />
      </div>
    </Card>
  );
};
