import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useApi } from './lib/useApi';
import { Spinner } from './components/Spinner';
import { Notification } from './components/Notification';
import { Slot } from './types';

import { Shell } from './Shell';
import { SlotsScreen } from './screens/Slots';
import { TestsScreen } from './screens/Tests';

export const App = () => {
  const { data, loading, error } = useApi<any>(`/admin/slots`);

  const [slots, setSlots] = useState([] as Slot[]);
  useEffect(() => {
    if (data) {
      setSlots(data.slots);
    }
  }, [data]);

  return (
    <Shell>
      <Grid container spacing={3}>
        {loading && <Spinner />}
        {slots && (
          <Switch>
            <Route exact path="/">
              <SlotsScreen slots={slots} />
            </Route>
            <Route exact path="/slots/:slotId">
              <TestsScreen slots={slots} />
            </Route>
            <Route exact path="/slots/:slotId/tests/:testId">
              <TestsScreen slots={slots} />
            </Route>
          </Switch>
        )}
        {error && <Notification severity="error" keep message="Error fetching list of slots. Please check your connection." />}
      </Grid>
    </Shell>
  );
};
