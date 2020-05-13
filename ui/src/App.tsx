import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { Example } from './screens/Example';
import { css } from 'emotion';
import { Header } from './components/Header';
import { GlobalStyles } from './utils/GlobalStyles';

const appStyles = css``;

const contentStyles = css`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
`;

export const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <div className={appStyles}>
        <Header />
        <div className={contentStyles}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/example">
              <Example />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
