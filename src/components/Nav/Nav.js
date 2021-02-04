import React, { useEffect } from 'react';

import Popup from './Popup/Popup'
import { connect } from 'react-redux'
import logo from '../../img/logo.svg'
import arrow from '../../img/arrow.svg'
import star from '../../img/star.svg'
import bell from '../../img/bell.svg'
import SearchPanel from './SearchPanel/SearchPanel'
import './nav.css'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
import {logout} from '../../actions/serverConnections'


const Nav = ({logged, navState, onSearchActivate,userState, onSearchDeactivate,onLogout, onRegistrationPopupActivate, onLoginPopupActivate, onNavPositionChangeToFixed, onNavPositionChangeToNone, location, history}) => {
  function searchToggle(){
    if (navState.searchActive){
      onSearchDeactivate();
    }
    else{
      onSearchActivate();
    }
  }

  function registartionPopupOpen(){
    onRegistrationPopupActivate(history);
  }

  function loginPopupOpen(){
    onLoginPopupActivate(history);
  }

  function logoutHandleFormSubmit(e){
    e.preventDefault();
    onLogout()
  }
  
  useEffect(() => {
    if (location === '/landing')
      onNavPositionChangeToFixed()
    else {
      onNavPositionChangeToNone()
      if (!logged){
        // history.push('/landing')
      }
    }
  }, [location]);
  
  if (logged)
      return (
  <div className={"nav-block "+navState.position}>
    <div className="nav-bar">
      <div className="container">
        <nav className="nav">
          <div className="nav__left-side">
            <Link to="/landing" className="nav-el" >
              <img src={logo} alt="logo"/>
            </Link>

            <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link>

            <Link to="/responses" className="f-medium semi link-anim nav-el">Отклики</Link>

            <button  className={"nav-el nav__search " + navState.searchActive} onClick={searchToggle}>
              <span className="f-medium semi">Поиск</span> 
              <img src={arrow} alt="arrow"/>
            </button>
          </div>

          <div className="nav__right-side">
            <button  className="icon-anim nav-el">
              <img src={bell} alt="notifications"/>
            </button>

            <button  className="icon-anim nav-el">
              <img src={star} alt="favourites"/>
            </button>

            <Link to={"/profile/"+userState.user.id} className="f-medium semi link-anim nav-el">Моя страница</Link>
            {/* <form onSubmit={logoutHandleFormSubmit}>
              <button type="submit">Logout</button>
            </form> */}
          </div>
          
        </nav>     
      </div> 
    </div>

    <div className={"search-panel " + navState.searchActive}>
      <div className="container">
        <div className="search-panel__wrapper">
          <SearchPanel></SearchPanel>
        </div>
      </div>
    </div>  
  </div>
  )
  else return(
  <div className={"nav-block "+navState.position}>
    <div className="nav-bar">
      <div className="container">
        <nav className="nav">
          <div className="nav__left-side">
            <Link to="/landing" className="nav-el" >
              <img src={logo} alt="logo"/>
            </Link>

            <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link>

            <button  className={"nav-el nav__search " + navState.searchActive} onClick={searchToggle}>
              <span className="f-medium semi" >Поиск</span> 
              <img src={arrow} alt=""/>
            </button>
          </div>

          <div className="nav__right-side">
            <button className="f-medium highlighted-btn semi nav-el" onClick={registartionPopupOpen}>Начать карьеру</button>

            <button className="f-medium semi link-anim nav-el" onClick={loginPopupOpen}>Войти</button>
          </div>    
        </nav>     
      </div>  
    </div>

    <div className={"search-panel " + navState.searchActive}>
      <div className="container">
        <div className= "search-panel__wrapper">
          <SearchPanel></SearchPanel>
        </div>
      </div>
    </div>  
    
    <Popup history={history}></Popup>
  </div>
  )
}



const mapStateToProps = (state, ownProps) =>{
  return {
    navState: state.nav,
    logged:state.user.logged,
    userState:state.user,
    location:ownProps.location.pathname,
    history:ownProps.history
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
    onNavPositionChangeToNone: () => {
      dispatch({type : 'CHANGE_NAV_POSITION_TO_NONE', payload:null})
    },
    onNavPositionChangeToFixed: () => {
      dispatch({type : 'CHANGE_NAV_POSITION_TO_FIXED', payload:null})
    },
    onLogout: (token)=>{
      dispatch(logout(token))

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
