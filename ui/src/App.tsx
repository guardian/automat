import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './screens/Home';
import { Example } from './screens/Example';
import { css } from 'emotion';

const appStyles = css`
  max-width: 1300px;
  margin: 0 auto;
`;

const logoStyles = css`
  width: 260px;
  height: auto;
`;

export const App = () => {
  return (
    <Router>
      <div className={appStyles}>
        <h1>
          <Link to="/">
            <img src="/automat-logo.png" alt="Automat logo" className={logoStyles} />
          </Link>
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
