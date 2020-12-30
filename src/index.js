import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Profile from './components/Profile/Profile'
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom"

import App from './App';
import { syncHistoryWithStore } from 'react-router-redux';
import Landing from './components/Landing/Landing';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());   // reducer
const hashHistory = createBrowserHistory();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>      
      <Route path="/" component={App}/>
      <Route path="/landing" component={Landing}/>
      <Route path="/profile" component={Profile}/>
    </Router>
  </Provider>,

  
  document.getElementById('root')
);

