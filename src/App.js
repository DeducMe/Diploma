import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import './css/global.css'
import './css/style.css'
import './css/normalize.css'
import './fonts/Nunito/Nunito.css'
import { connect } from 'react-redux'



class App extends Component {
  
  render() {
   
    return (
      <div>
        <Nav></Nav>
      </div>
      
    )
  }
}

const mapStateToProps = (state, ownProps) =>{
  return {
    ownProps
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

