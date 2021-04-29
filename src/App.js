import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Create from './components/Create';
import ChoicesPage from './components/ChoicesPage';
import CreateMusculation from './components/CreateMusculation';
import CreateCardio from './components/CreateCardio';

const App = () => {

  return (
    <Switch>
      
      <Route exact path="/" component={Main} />
      <Route exact path="/choices" component={ChoicesPage} />
      <Route exact path="/new-crosstraining" component={Create} />
      <Route exact path="/new-musculation" component={CreateMusculation} />
      <Route exact path="/new-cardio" component={CreateCardio} />
      
      <Redirect to="/" />
    </Switch>
  );
};

export default App;