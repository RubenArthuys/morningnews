import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource'
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'

function App() {
  return (

    <Router>
      <Switch>
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenSource} path="/screensource" exact />
        <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" />
        <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
      </Switch>
    </Router>

  );
}

export default App;