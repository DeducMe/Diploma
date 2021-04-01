import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import reducer from './reducers/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Profile from './components/Profile/Profile'
import CompanyProfile from './components/CompanyProfile/CompanyProfile'
import Search from './components/Search/Search'

import {
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import thunk from 'redux-thunk';
import App from './App';
import Nav from './components/Nav/Nav'
import { syncHistoryWithStore } from 'react-router-redux';
import Landing from './components/Landing/Landing';


const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));   // reducer
const hashHistory = createBrowserHistory();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>  
      <Route path="/" component={App}/>

      <Switch>
          <Route path="/landing" component={Landing}/>
          <Route path="/search" component={Search}/>
          <Route path="/profile/:id" component={Profile}/>
          <Route path="/company/:id" component={CompanyProfile}/>
          <Redirect from="*" to="/landing"/>
      </Switch>
    </Router>
  </Provider>,

  
  document.getElementById('root')
);

