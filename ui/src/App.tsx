import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useApi } from './lib/useApi';
import { Spinner } from './components/Spinner';
import { Notification } from './components/Notification';
import { Slot, Variant } from './types';
import { Shell } from './Shell';
import { SlotsScreen } from './screens/Slots';
import { TestsScreen } from './screens/Tests';
import { filters } from './data/filters';

export const App = () => {
  const { data: dataSlots, loading: loadingSlots, error: errorSlots } = useApi<any>(`/slots`);
  const { data: dataVariants, loading: loadingVariants, error: errorVariants } = useApi<any>(`/variants`);

  const [slots, setSlots] = useState([] as Slot[]);
  useEffect(() => {
    if (dataSlots) {
      setSlots(dataSlots);
    }
  }, [dataSlots]);

  const [variants, setVariants] = useState([] as Variant[]);
  useEffect(() => {
    if (dataVariants) {
      setVariants(dataVariants);
    }
  }, [dataVariants]);

  return (
    <Shell>
      <Grid container spacing={3}>
        {(loadingSlots || loadingVariants) && <Spinner />}
        {slots && (
          <Switch>
            <Route exact path="/">
              <SlotsScreen slots={slots} />
            </Route>
            <Route exact path="/slots/:slotId">
              <TestsScreen slots={slots} variants={variants} filters={filters} />
            </Route>
            <Route exact path="/slots/:slotId/tests/:testId">
              <TestsScreen slots={slots} variants={variants} filters={filters} />
            </Route>
          </Switch>
        )}
        {(errorSlots || errorVariants) && <Notification severity="error" keep message="Error fetching data. Please check your connection." />}
      </Grid>
    </Shell>
  );
};
