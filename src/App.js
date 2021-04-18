
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './components/home';
import signup from './pages/signup';
import signin from './pages/signin';
import postlist from './pages/postlist';
import postlistSearch from './pages/postlistSearch';
import './App.css';

function App() {
  return (
    <Router>

      <>

        <Route exact path="/" component={home} />
        <Switch>
          <Route path="/signup" component={signup} />
          <Route path="/signin" component={signin} />
          <Route path="/postlist" component={postlist} />
          <Route path="/postlistSearch" component={postlistSearch} />

        </Switch>
      </>
    </Router>
  );
}

export default App;

