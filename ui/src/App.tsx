import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useApi } from './lib/useApi';
import { Spinner } from './components/Spinner';
import { Notification } from './components/Notification';
import { Slot, Variant } from './types';
import { Shell } from './Shell';
import { Slots as SlotsScreen } from './screens/Slots';
import { Tests as TestsScreen } from './screens/Tests';

export const App = () => {
  const { data: dataSlots, loading: loadingSlots, error: errorSlots } = useApi<any>(`/admin/slots`);
  const { data: dataVariants, loading: loadingVariants, error: errorVariants } = useApi<any>(`/admin/variants`);

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
              <TestsScreen slots={slots} variants={variants} />
            </Route>
            <Route exact path="/slots/:slotId/tests/:testId">
              <TestsScreen slots={slots} variants={variants} />
            </Route>
          </Switch>
        )}
        {(errorSlots || errorVariants) && <Notification severity="error" keep message="Error fetching data. Please check your connection." />}
      </Grid>
    </Shell>
  );
};
