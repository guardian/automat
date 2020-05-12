import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './screens/Home';
import { Example } from './screens/Example';

export const App = () => {
  return (
    <Router>
      <div>
        <h1>
          <Link to="/">Automat UI</Link>
        </h1>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/example">
            <Example />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
