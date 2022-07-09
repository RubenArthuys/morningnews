import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource'
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'


        // Tout semble fonctionner, sauf <Route conponent={ScreenArticlesBySource}...>.
        // Par contre <ScreenArticlesBySource/> fonctionne bien. (?!)

function App() {
  return (

    <Router>
      <Switch>
        {/* <ScreenArticlesBySource /> */}
        <Route component={ScreenHome} path="/" exact />
        <Route component={ScreenSource} path="/screensource" exact />
        <Route conponent={ScreenArticlesBySource} path="/screenarticlesbysource/:id" />
        <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
      </Switch>
    </Router>

  );
}

export default App;