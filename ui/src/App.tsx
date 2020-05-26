import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { Shell } from './Shell';
import { Slots } from './screens/Slots';
import { Tests } from './screens/Tests';

export const App = () => {
  return (
    <Shell>
      <Grid container spacing={3}>
        <Switch>
          <Route exact path="/">
            <Slots />
          </Route>
          <Route exact path="/slots/:slotId">
            <Tests />
          </Route>
        </Switch>
      </Grid>
    </Shell>
  );
};
