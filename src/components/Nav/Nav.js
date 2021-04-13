import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux'

import Popup from './Popup/Popup'
import OptionsPopup from './OptionsPopup/OptionsPopup'

import logo from '../../img/logo.svg'
import arrow from '../../img/arrow.svg'
import star from '../../img/star.svg'
import bell from '../../img/bell.svg'
import SearchPanel from './SearchPanel/SearchPanel'
import './nav.css'
import {Link} from 'react-router-dom'
import {logout, verify} from '../../actions/serverConnections'
import placeholderAvatar from '../../img/placeholder-avatar.jpg'

class Nav extends Component {
  searchToggle = () => {
    if (this.props.navState.searchActive){
      this.props.onSearchDeactivate();
    }
    else{
      this.props.onSearchActivate();
    }
  }

  registartionPopupOpen = () => {
    this.props.onRegistrationPopupActivate(this.props.history);
  }

  loginPopupOpen = () => {
    this.props.onLoginPopupActivate(this.props.history);
  }

  logoutHandleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onLogout()
    this.props.history.push('/landing')

    this.dropdownToggle()
  }

  dropdownToggle = () => {
    if (this.props.navState.dropDownState === ''){
      this.props.onDropDownActivate();
    }
    else{
      this.props.onDropDownDeactivate();
    }
  }

  optionsPopupToggle = () => {
    this.dropdownToggle()

    if (this.props.navState.optionsPopup.optionsPopupState === ''){
      this.props.onOptionsPopupActivate();
    }
    else{
      this.props.onOptionsPopupDeactivate();
    }
  }

  checkOnEmpty(el, returnValue){
    if (el !== ""){
        return el
    }

    return returnValue
  }

  getUserProfileLink = () =>  {
    return "/"+(this.props.userState.user.user_type === 'employee' ? 'profile' : 'company')+"/"+this.props.userState.user.id
  }

  componentDidMount = () => {
    this.props.onVerifyToken()
  }
  
  render(){

    if (this.props.logged){

        return (
    <div className={"nav-block " + this.props.navState.position + " " + this.props.navState.transparency}>
      <div className="nav-bar">
        <div className="container">
          <nav className="nav">
            <div className="nav__left-side">
              <Link to="/landing" className="nav-el" >
                <img src={logo} alt="logo"/>
              </Link>

              {/* <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link> */}

              <Link to="/responses" className="f-medium semi link-anim nav-el">Отклики</Link>

              <button  className={"nav-el nav__search " + this.props.navState.searchActive} onClick={this.searchToggle}>
                <span className="f-medium semi">Поиск</span> 
                <img src={arrow} alt="arrow"/>
              </button>
            </div>

            <div className="nav__right-side">
              {/* <button  className="icon-anim nav-el">
                <img src={bell} alt="notifications"/>
              </button>

              <button  className="icon-anim nav-el">
                <img src={star} alt="favourites"/>
              </button> */}
              <div className="nav__profile-data nav-el">
                <div className="nav__profile-data__main link-anim" onClick={this.dropdownToggle}>
                  <Link to={this.getUserProfileLink()} className="f-medium semi flex">
                    <img className="nav__profile-data__avatar" src={this.checkOnEmpty(this.props.navState.avatar, placeholderAvatar)} alt="аватар"/>
                  </Link>
                  <button className="nav__profile-data__options-btn">{this.props.userState.user.name}</button>
                </div>
                
                <div className={"nav__profile-data__dropdown bottom-rounded " + this.props.navState.dropDownState}>
                  <ul className="dropdown__list">
                    <li className="dropdown__list-el" onClick={this.dropdownToggle}>
                      <Link to={this.getUserProfileLink()} className="semi">Моя страница</Link>
                    </li>
                    <li className="dropdown__list-el" onClick={this.optionsPopupToggle}>
                      <button to={this.getUserProfileLink()} className="semi">Настройки</button>
                    </li>
                    <li className="dropdown__list-el" onClick={this.logoutHandleFormSubmit}>
                      <button className="semi">Выход</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>     
        </div> 
      </div>
      {this.props.navState.searchActive ? 
        <div className="search-panel active appearence-anim">
          <div className="container">
            <div className="search-panel__wrapper">
              <SearchPanel history={this.props.history}></SearchPanel>
            </div>
          </div>
        </div>  
      : ''}
      {this.props.navState.optionsPopup.optionsPopupState === 'active'?(<OptionsPopup history={this.props.history}></OptionsPopup>):('')}
    </div>
    )
      }
    else return(
    <div className={"nav-block " + this.props.navState.position + " " + this.props.navState.transparency}>
      <div className="nav-bar">
        <div className="container">
          <nav className="nav">
            <div className="nav__left-side">
              <Link to="/landing" className="nav-el" >
                <img src={logo} alt="logo"/>
              </Link>

              {/* <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link> */}

              <button  className={"nav-el nav__search " + this.props.navState.searchActive} onClick={this.searchToggle}>
                <span className="f-medium semi" >Поиск</span> 
                <img src={arrow} alt=""/>
              </button>
            </div>

            <div className="nav__right-side">
              <button className="f-medium highlighted-btn semi nav-el" onClick={this.registartionPopupOpen}>Начать карьеру</button>

              <button className="f-medium semi link-anim nav-el" onClick={this.loginPopupOpen}>Войти</button>
            </div>    
          </nav>     
        </div>  
      </div>
      {this.props.navState.searchActive ? 
      <div className="search-panel active appearence-anim">
        <div className="container">
          <div className= "search-panel__wrapper">
            <SearchPanel history={this.props.history}></SearchPanel>
          </div>
        </div>
      </div>
      :''}
      
      
      <Popup history={this.props.history}></Popup>

    </div>
    )
  }
}



const mapStateToProps = (state, ownProps) =>{
  return {
    navState: state.nav,
    logged:state.user.logged,
    userState:state.user,
    userData:state.userData,
    location:ownProps.ownProps.location.pathname,
    history:ownProps.ownProps.history
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSearchActivate: () => {
      dispatch({type : 'SEARCH_ACTIVATE', payload:null})
    },
    onSearchDeactivate: () => {
      dispatch({type : 'SEARCH_DEACTIVATE', payload:null})
    },
    onLoginPopupActivate: (history) => {
      history.push('/landing')
      dispatch({type : 'POPUP_ACTIVATE', payload:'login'})
    },
    onRegistrationPopupActivate: (history) => {
      history.push('/landing')
      dispatch({type : 'POPUP_ACTIVATE', payload:'registration'})
    },
    onOptionsPopupActivate: () => {
      dispatch({type : 'OPTIONS_POPUP_ACTIVATE', payload:null})
    },
    onOptionsPopupDeactivate: () => {
      dispatch({type : 'OPTIONS_POPUP_DEACTIVATE', payload:null})
    },
    onDropDownActivate: () => {
      dispatch({type : 'DROPDOWN_ACTIVATE', payload:null})
    },
    onDropDownDeactivate: () => {
      dispatch({type : 'DROPDOWN_DEACTIVATE', payload:null})
    },
    onVerifyToken: ()=>{
      dispatch(verify())
      .then((data)=>{
        if(data.data !== 403){
          dispatch({type : 'USER_LOGIN', payload:null})
        }
      })
      
    },
    onLogout: ()=>{
      dispatch(logout())
      dispatch({type : 'USER_LOGOUT', payload:null})

    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
