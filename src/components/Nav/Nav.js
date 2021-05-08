import React, { Component } from 'react';
import { connect } from 'react-redux'

import Popup from './Popup/Popup'
import OptionsPopup from './OptionsPopup/OptionsPopup'

import logo from '../../img/logo.svg'
import arrow from '../../img/arrow.svg'
import star from '../../img/star.svg'
import fileUploader from '../../actions/fileUploader'
import SearchPanel from './SearchPanel/SearchPanel'
import './nav.css'
import {Link} from 'react-router-dom'
import {logout, verify} from '../../actions/serverConnections'
import placeholderAvatar from '../../img/placeholder-avatar.jpg'
import FavouritesPopup from './FavouritesPopup/FavouritesPopup';

class Nav extends Component {
  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = { mobileNavOpened: false };
  }
  
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

  getAvatarFromFirebase = () =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
    const storageRef = fileUploader.storage().ref()
    const fileRef = storageRef.child('user-avatar' + this.props.userState.id)
    fileRef.getDownloadURL()
    .then((response) => this.props.onSetUserMiniAvatar(response))
    .catch(err => this.props.onSetUserMiniAvatar('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54'))
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
    return "/"+(this.props.userState.user_type === 'employee' ? 'profile' : 'company')+"/"+this.props.userState.id
  }

  openFavourites = () =>{
    this.props.onOpenFavouritesPopup()
  }

  componentDidMount = () => {
    this.props.onVerifyToken(this.getAvatarFromFirebase)
    if (this.props.logged){
      
    }
  }

  toggleMobileNav = () =>{
    if (this.state.mobileNavOpened)
      this.setState({mobileNavOpened:false})
    else
      this.setState({mobileNavOpened:true})
  }
  
  render(){

    if (this.props.logged){
        return (
    <div className={"nav-block " + this.props.navState.position + " " + this.props.navState.transparency}>
      <div className="nav-bar">
        <div className="container">
          <nav className="nav">
            
            <div className="nav__left-side">
              <Link to="/landing" className="nav-el logo" >
                <img src={logo} alt="logo"/>
              </Link>

              {/* <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link> */}

              <button  className={"nav-el nav__search " + this.props.navState.searchActive} onClick={this.searchToggle}>
                <span className="f-medium semi">Поиск</span> 
                <img src={arrow} alt="arrow"/>
              </button>

            </div>

            <div className="nav__right-side">
              <Link to="/responses" className="nav-el f-medium semi link-anim">Отклики</Link>

              {/* <button  className="icon-anim nav-el">
                <img src={bell} alt="notifications"/>
              </button> */}

              <button  className="icon-anim nav-el" onClick={this.openFavourites}>
                <img src={star} alt="favourites"/>
              </button>
              <div className="nav__profile-data nav-el">
                <div className="nav__profile-data__main link-anim" onClick={this.dropdownToggle}>
                  <Link to={this.getUserProfileLink()} className="f-medium semi flex">
                    <img className="nav__profile-data__avatar" src={this.checkOnEmpty(this.props.navState.avatar, placeholderAvatar)} alt="аватар"/>
                  </Link>
                  <button className="nav__profile-data__options-btn">{this.props.userState.name}</button>
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
            <div className="nav__right-side-mobile">
                <div className="nav__profile-data nav-el">
                  <div className="nav__profile-data__main link-anim" onClick={this.dropdownToggle}>
                    <Link to={this.getUserProfileLink()} className="f-medium semi flex">
                      <img className="nav__profile-data__avatar" src={this.checkOnEmpty(this.props.navState.avatar, placeholderAvatar)} alt="аватар"/>
                    </Link>
                    <button className="nav__profile-data__options-btn">{this.props.userState.name}</button>
                  </div>
                  
                  <div className={"nav__profile-data__dropdown bottom-rounded " + this.props.navState.dropDownState}>
                    <ul className="dropdown__list">
                      <li className="dropdown__list-el" onClick={this.dropdownToggle}>
                        <Link to={this.getUserProfileLink()} className="semi">Моя страница</Link>
                      </li>
                      <li className="dropdown__list-el" onClick={this.optionsPopupToggle}>
                        <button className="semi">Настройки</button>
                      </li>
                      <li className="dropdown__list-el" onClick={this.dropdownToggle}>
                        <button className="semi" onClick={this.openFavourites}>Избранное</button>
                      </li>
                      <li className="dropdown__list-el" onClick={this.dropdownToggle}>
                        <Link to="/responses" className="semi">Отклики</Link>
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

      <SearchPanel history={this.props.history} active={this.props.navState.searchActive}></SearchPanel>
  
      {this.props.navState.optionsPopup.optionsPopupState === 'active'?(<OptionsPopup history={this.props.history}></OptionsPopup>):('')}
      {this.props.navState.favouritesOpen ? <FavouritesPopup></FavouritesPopup> :''}
    </div>
    )
      }
    else return(
    <div className={"nav-block " + this.props.navState.position + " " + this.props.navState.transparency}>
      <div className="nav-bar">
        <div className="container">
          <nav className="nav">
            <div className="nav__left-side">
              <Link to="/landing" className="nav-el logo" >
                <img src={logo} alt="logo"/>
              </Link>

              {/* <Link to="/content" className="f-medium semi link-anim nav-el">Полезное</Link> */}

              <button  className={"nav-el nav__search " + this.props.navState.searchActive} onClick={this.searchToggle}>
                <span className="f-medium semi" >Поиск</span> 
                <img src={arrow} alt=""/>
              </button>
            </div>

            <div className="nav__right-side">
              <button className="f-medium semi link-anim nav-el" onClick={this.loginPopupOpen}>Войти</button>

              <button className="f-medium highlighted-btn semi nav-el" onClick={this.registartionPopupOpen}>Начать карьеру</button>
            </div>    
          
            <div className="nav__right-side-mobile">
              <button className={"menu-btn " + (this.state.mobileNavOpened ? "open" : "")} onClick={this.toggleMobileNav}>
                <div className="menu-btn__burger"></div>
              </button>
                <div className={"mobile-nav " + (this.state.mobileNavOpened ? "open" : "")}>
                  <button className="f-medium highlighted-btn semi nav-el" onClick={this.registartionPopupOpen} onClick={() => { this.registartionPopupOpen(); this.toggleMobileNav();}}>Начать карьеру</button>

                  <button className="f-medium semi link-anim nav-el" onClick={this.loginPopupOpen}>Войти</button>
                </div>
              </div>
          </nav>     
        </div>  
      </div>
      
      <SearchPanel history={this.props.history} active={this.props.navState.searchActive}></SearchPanel>
      <Popup history={this.props.history}></Popup>

    </div>
    )
  }
}



const mapStateToProps = (state, ownProps) =>{
  return {
    navState: state.nav,
    logged:state.user.logged,
    userState:state.user.user,
    userData:state.userData,
    location:ownProps.ownProps.location.pathname,
    history:ownProps.ownProps.history
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSetUserMiniAvatar: (photo) => {
      dispatch({type : 'SET_USER_MINI_AVATAR', payload:photo})
    },
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
    onOpenFavouritesPopup: () => {
      dispatch({type : 'OPEN_FAVOURITES_POPUP', payload:null})
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
    onVerifyToken: (getAvatarFromFirebase)=>{
      dispatch(verify())
      .then((data)=>{
        if(data.data !== 403){
          dispatch({type : 'USER_LOGIN', payload:null})
        }
      })
      .then((response) => {
        getAvatarFromFirebase()
      })
    },
    onLogout: ()=>{
      dispatch(logout())
      dispatch({type : 'USER_LOGOUT', payload:null})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
