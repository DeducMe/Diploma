import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './components/Nav/Nav'
import './global.css'
import './style.css'
import './normalize.css'
import './fonts/Nunito/Nunito.css'

class App extends Component {
  
  render() {
    return (
      <div>
        <Nav></Nav>
      </div>
    )
  }
}

export default connect(
  state => ({
    testStore: state.list
  }),
  dispatch => ({
    onAddItem: (itemName) => {
      dispatch({type : 'ADD_ITEM', payload: itemName})
    },
    onDeleteItem: (itemName) => {
      dispatch({type : 'DELETE_ITEM', payload: itemName})
    }
  })
)(App)

