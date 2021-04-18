import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import reducer from './reducers/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'

import {
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import thunk from 'redux-thunk';

import { syncHistoryWithStore } from 'react-router-redux';
import App from './App';

const Profile = lazy(() => import("./components/Profile/Profile"));
const Search = lazy(() => import("./components/Search/Search"));
const Landing = lazy(() => import("./components/Landing/Landing"));
const CompanyProfile = lazy(() => import("./components/CompanyProfile/CompanyProfile"));
const Response = lazy(() => import("./components/Responses/Responses"));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
          <Route path="/search" component={Search}/>
          <Route path="/landing" component={Landing}/>
          <Route path="/responses" component={Response}/>
          <Route path="/profile/:id" component={Profile}/>
          <Route path="/company/:id" component={CompanyProfile}/>
          <Redirect from="*" to="/landing"/>
      </Switch>
    </Suspense>

    </Router>
  </Provider>,

  
  document.getElementById('root')
);

