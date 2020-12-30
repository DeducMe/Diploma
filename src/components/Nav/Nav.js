import React from 'react'
import Popup from './Popup/Popup'
import { connect } from 'react-redux'
import logo from '../../img/logo.svg'
import arrow from '../../img/arrow.svg'
import star from '../../img/star.svg'
import bell from '../../img/bell.svg'
import SearchPanel from './SearchPanel/SearchPanel'
import './nav.css'

const Nav = ({logged, navState, onSearchActivate, onSearchDeactivate, onRegistrationPopupActivate, onLoginPopupActivate}) => {
  function searchToggle(){
    if (navState.searchActive){
      onSearchDeactivate();
    }
    else{
      onSearchActivate();
    }
  }

  function registartionPopupOpen(){
    onRegistrationPopupActivate();
  }

  function loginPopupOpen(){
    onLoginPopupActivate();
  }
  
  if (logged)
      return (
  <div className="nav-block">
    <div className="nav-bar">
      <div className="container">
        <nav className="nav">
          <div className="nav__left-side">
            <a href="#">
              <img src={logo} alt="logo"/>
            </a>

            <a href="#" className="f-medium semi">Полезное</a>

            <a href="#" className="f-medium semi">Отклики</a>

            <a href="#" className={"nav__search " + navState.searchActive} onClick={searchToggle}>
              <span className="f-medium semi">Поиск</span> 
              <img src={arrow} alt="arrow"/>
            </a>
          </div>

          <div className="nav__right-side">
            <a href="#">
              <img src={bell} alt="notifications"/>
            </a>

            <a href="#">
              <img src={star} alt="favourites"/>
            </a>

            <a href="#" className="f-medium semi">Моя страница</a>
          </div>
          
        </nav>     
      </div> 
    </div>

    <div className="search-panel">
      <div className="container">
        <div className={"search-panel__wrapper " + navState.searchActive}>
          <form action="#">
            <input type="text"/>

            <div className="more-filters">
              <a href="#" className="more-filters__link"></a>

              <div className="more-filters__popup"></div>
            </div>

            <input type="submit" value="Поиск"/>
          </form>
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
            <a href="#">
              <img src={logo} alt="logo"/>
            </a>

            <a href="#" className="f-medium semi">Полезное</a>

            <a href="#" className={"nav__search " + navState.searchActive} onClick={searchToggle}>
              <span className="f-medium semi" >Поиск</span> 
              <img src={arrow} alt=""/>
            </a>
          </div>

          <div className="nav__right-side">
            <a href="#" className="f-medium highlighted-btn semi" onClick={registartionPopupOpen}>Начать карьеру</a>

            <a href="#" className="f-medium semi" onClick={loginPopupOpen}>Войти</a>
          </div>    
        </nav>     
      </div>  
    </div>

    <div className="search-panel">
      <div className="container">
        <div className={"search-panel__wrapper " + navState.searchActive}>
          <SearchPanel></SearchPanel>
        </div>
      </div>
    </div>  

    <Popup></Popup>
  </div>
  )
}

export default connect(
    state => ({
      navState: state.nav
    }),
    dispatch => ({
      onSearchActivate: () => {
        dispatch({type : 'SEARCH_ACTIVATE', payload:null})
      },
      onSearchDeactivate: () => {
        dispatch({type : 'SEARCH_DEACTIVATE', payload:null})
      },
      onLoginPopupActivate: () => {
        dispatch({type : 'POPUP_ACTIVATE', payload:'login'})
      },
      onRegistrationPopupActivate: () => {
        dispatch({type : 'POPUP_ACTIVATE', payload:'registration'})
      }
    })
  )(Nav)
