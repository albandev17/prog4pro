import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Create from './components/Create';

const App = () => {

  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/new" component={Create} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;