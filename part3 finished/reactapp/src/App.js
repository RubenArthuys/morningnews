import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource'
import ScreenArticlesBySource from './ScreenArticlesBySource'
import ScreenMyArticles from './ScreenMyArticles'

import { Provider } from 'react-redux';
import { combineReducers }  from 'redux';
// import { createStore }  from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import wishList from './reducers/articles'

const store = configureStore({reducer})
// Old version :
// const store = createStore(combineReducers({wishList}))

//On passe un reducer en tant que paramètre de configureStore
const reducer = combineReducers({wishList})
// Le reducer est aussi une fonction qui va intéragir avec le store

// Quand l'app démarre elle récupère la valeur initial du state [] de wishList, dans le reducer, ce qui initialise le store


function App() {
  return (

    // The <Provider> component makes the Redux store available to any nested components that need to access the Redux store.
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenSource} path="/screensource" exact />
          <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" />
          <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;