import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useApi } from './lib/useApi';
import { Spinner } from './components/Spinner';
import { Notification } from './components/Notification';
import { Slot, Variant, Filter } from './types';
import { Shell } from './Shell';
import { SlotsScreen } from './screens/Slots';
import { TestsScreen } from './screens/Tests';

export const App = () => {
  const { data: dataSlots, loading: loadingSlots, error: errorSlots } = useApi<any>(`/admin/slots`);
  const { data: dataVariants, loading: loadingVariants, error: errorVariants } = useApi<any>(`/admin/variants`);
  const { data: dataFilters, loading: loadingFilters, error: errorFilters } = useApi<any>(`http://localhost:3004/filters`, undefined, false);

  const [slots, setSlots] = useState([] as Slot[]);
  useEffect(() => {
    if (dataSlots) {
      setSlots(dataSlots.slots);
    }
  }, [dataSlots]);

  const [variants, setVariants] = useState([] as Variant[]);
  useEffect(() => {
    if (dataVariants) {
      setVariants(dataVariants.variants);
    }
  }, [dataVariants]);

  const [filters, setFilters] = useState([] as Filter[]);
  useEffect(() => {
    if (dataFilters) {
      // setFilters(dataFilters.filters);
      setFilters(dataFilters);
    }
  }, [dataFilters]);

  return (
    <Shell>
      <Grid container spacing={3}>
        {(loadingSlots || loadingVariants || loadingFilters) && <Spinner />}
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
        {(errorSlots || errorVariants || errorFilters) && <Notification severity="error" keep message="Error fetching data. Please check your connection." />}
      </Grid>
    </Shell>
  );
};
