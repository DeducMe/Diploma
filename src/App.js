import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import './css/global.css'
import './css/style.css'
import './css/normalize.css'
import './css/vacancy.css'

import './fonts/Nunito/Nunito.css'
import { connect } from 'react-redux'



class App extends Component {
  runOnScroll = () => {
    if (this.props.location === '/landing'){
      if (window.pageYOffset > 400){
          this.props.onNavBgChangeToNormal()
      }
      else{
          this.props.onNavBgChangeToTransparent()

      }}
  }

  checkLocation(){
    if (this.props.location === '/landing'){
      window.addEventListener("scroll", this.runOnScroll, false)

      this.props.onNavBgChangeToTransparent()
      this.props.onNavPositionChangeToFixed()
    }
    else {
      window.removeEventListener("scroll", this.runOnScroll, false)

      this.props.onNavPositionChangeToNone()
      this.props.onNavBgChangeToNormal()
      
    }
  }

  componentDidUpdate(){
    this.checkLocation()
  }
  
  render() {
   
    return (
      <div>
        <Nav ownProps={this.props.ownProps}></Nav>
      </div>
      
    )
  }
}

const mapStateToProps = (state, ownProps) =>{
  return {
    ownProps,
    history:ownProps.history,
    location:ownProps.location.pathname,
    
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onNavPositionChangeToNone: () => {
      dispatch({type : 'CHANGE_NAV_POSITION_TO_NONE', payload:null})
    },
    onNavPositionChangeToFixed: () => {
      dispatch({type : 'CHANGE_NAV_POSITION_TO_FIXED', payload:null})
    },
    onNavBgChangeToTransparent: () => {
      dispatch({type : 'CHANGE_NAV_BG_TO_TRANSPARENT', payload:null})
    },
    onNavBgChangeToNormal: () => {
      dispatch({type : 'CHANGE_NAV_BG_TO_NORMAL', payload:null})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

