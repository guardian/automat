import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';
import { Test, Variant, Filter } from '../types';
import { Paper, Tabs, Tab, Grid, Card, Switch } from '@material-ui/core';
import { Heading } from './Heading';
import { TestContextMenu } from './TestContextMenu';
import { TabBasic } from './TabBasic';
import { TabVariants } from './TabVariants';
import { TabFilters } from './TabFilters';
import { colors } from '../utils/theme';
import { truncate } from '../utils/truncate';

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

const noMargin = css`
  margin: 0;
`;

const contentAreaStyles = css`
  flex-grow: 1;
`;

const tabHeaderStyles = css`
  background-color: ${colors.lighterGrey};
  margin-bottom: 24px;
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

type Props = {
  name: string;
  workingTest: Test;
  variants: Variant[];
  filters: Filter[];
  isEditing: boolean;
  onTestUpdated: Function;
  onTestDeleted: Function;
};

export const TestEditor = ({ workingTest, name, variants, filters, onTestUpdated, onTestDeleted, isEditing }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const testName = truncate(name, 50);

  useEffect(() => {
    setActiveTabIndex(0);
  }, [workingTest.id]);

  const onTabClick = (e: any, newTabIndex: number) => {
    setActiveTabIndex(newTabIndex);
  };

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
            <div className={noMargin}>
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
          <Grid container spacing={0} justify="space-between" alignItems="center" className={cx(tabHeaderStyles)}>
            <Grid item>
              <Tabs value={activeTabIndex} onChange={onTabClick} indicatorColor="primary" textColor="primary">
                <Tab label="Basic" />
                <Tab label="Variants" />
                <Tab label="Filters" />
              </Tabs>
            </Grid>
            <Grid item>
              <TestContextMenu test={workingTest} isEditing={isEditing} onTestDeleted={onTestDeleted} />
            </Grid>
          </Grid>

          {activeTabIndex === 0 && <TabBasic test={workingTest} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
          {activeTabIndex === 1 && <TabVariants test={workingTest} variants={variants} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
          {activeTabIndex === 2 && <TabFilters test={workingTest} filters={filters} isEditing={isEditing} onTestUpdated={onTestUpdated} />}
        </Paper>
      </div>
    </Card>
  );
};
