import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { HomePage } from './HomePage/HomePage.tsx.gotpl';

export const App: FunctionComponent<{}> = () => {
  return (
      <Provider store={store}>
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </Router>
        </React.Fragment>
      </Provider>
    )
}
