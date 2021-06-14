import React, { Component } from 'react'

import { connect } from 'react-redux'
import './popup.css'
import {registrateNewUser, loginUser} from '../../../actions/serverConnections.js'
import Loader from '../../Loader/Loader'
import fileUploader from '../../../actions/fileUploader';
import ReCAPTCHA from "react-google-recaptcha";
import e from 'cors'


class Popup extends Component {

  constructor(props) {
    super(props);
    // Не вызывайте здесь this.setState()!
    this.state = { captchaDone:false };
  }
  
  changeSubject(){
    console.log(this.props.popupState.subject)
    if (this.props.popupState.subject === 'employee'){
      this.props.onSubjectChangeToEmployer();
    }
    else if (this.props.popupState.subject === 'employer'){
      this.props.onSubjectChangeToEmployee();
    }
    console.log(this.props.popupState.submitValue)
  }

  checkUserType(){
    if (this.props.popupState.subject === 'employee'){
      return 'соискатель';
    }
    else{
      return 'работодатель';
    }
  }

 
  recaptchaCheck(value) {
    if (value) this.setState({captchaDone:true})
  }

  handleCloseBtnClick(e){
    e.preventDefault()
    this.popupClose()
  }

  popupClose(){
    console.log('s')
    this.props.onResetValidation()
    
    this.props.onPopupClose();
  }

  fetchError = (type) =>{
    if (type === 'wrong-data'){
      this.props.onWrongPasswordInput('*Неверный логин или пароль')
    }
    else if(type === 'wrong-email'){
      this.props.onWrongEmailInput('*Такой э-мэйл не зарегестрирован')
    }
    else if(type === 'wrong-password'){
      this.props.onWrongPasswordInput('*Пароль неверен')
    }
    else if(type === 'email-occupied'){
      this.props.onWrongEmailInput('*Такой э-мэйл уже занят')
    }
    else if(type === 'wrong-captcha'){
      this.props.onCaptchaNotPassed('*Проверка каптчи не пройдена')
    }
    this.props.onDeactivateLoader()

  }

  redirectUser = (userId) =>{
    this.props.onLoginUser();
    this.getAvatarFromFirebase()
    localStorage['user'] = JSON.stringify(this.props.userState)
    if (this.props.userState.user_type === 'employee'){
      this.props.history.push("/profile/" + userId);
    }
    else{
      this.props.history.push("/company/" + userId);

    }
    this.popupClose();

    this.props.onDeactivateLoader()
  }

  loginUser(login, password){
    this.props.onActivateLoader()

    this.props.onLoginUserCheck({
      "email": login,
      "password": password
    }, this.redirectUser, this.fetchError) // server response here
  }

  registrateUser(data){
    this.props.onActivateLoader()
    if (!this.state.captchaDone)
      this.props.onRegistrationUserFetch(data, this.redirectUser, this.fetchError, this.props.onLoginUserCheck)
    else this.fetchError('wrong-captcha')
  }

  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password){
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}/;   // 4 or more characters
                                                      // a digit
                                                      // a lower-case letter
                                                      // an upper-case letter
    return re.test(password);
  }

  async registrationJsonCreate(login, password, username, type){
    return {
      "name": username,
      "email": login,
      "password": password,
      "user_type": type
    }
    
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    let login = e.target.loginInput.value
    let password = e.target.passwordInput.value
    let validateInputs = [this.validateEmail(login), this.validatePassword(password)]
    this.props.onResetValidation()
    setTimeout(()=>{
      if (validateInputs.includes(false)){
        if (!this.validateEmail(login)){
          this.props.onWrongEmailInput('*Неверный формат э-мэйл')
        }
        if (!this.validatePassword(password)){
          this.props.onWrongPasswordInput('*В пароле должно содержаться не менее 4 символов, как минимум 1 цифра, 1 заглавная буква и 1 прописная буква')
        }
      }
      else{
        if (this.props.popupState.type === 'login'){
          this.loginUser(login, password)

        }
        else if (this.props.popupState.type === 'registration'){
          let username = e.target.nameInput.value

          this.registrationJsonCreate(login, password, username, this.props.popupState.subject)
          .then(data => this.registrateUser(data))

        }
      }
    },0)
  } 

  handleEsc = (e) => {
    if (e.keyCode === 27) {
      this.popupClose()
    }
  }
  
  getAvatarFromFirebase = () =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
    const storageRef = fileUploader.storage().ref()
    const fileRef = storageRef.child('user-avatar' + this.props.userState.id)
    fileRef.getDownloadURL()
    .then((response) => this.props.onSetUserMiniAvatar(response))
    .catch(err => this.props.onSetUserMiniAvatar('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54'))
  }
  
  checkZoneClick(e){
    if (e.target.id === 'loginBlurBox' || e.target.id === 'registrationBlurBox'){
      this.popupClose()
    }
  }

  componentDidMount(){
    // window.addEventListener('click', this.handleAreaClick)
    window.addEventListener('keydown', this.handleEsc)
  }

  componentWillUnmount(){
    // window.removeEventListener('click', this.handleAreaClick)
    window.removeEventListener('keydown', this.handleEsc)
  }

  render() {
    if (this.props.popupState.type === 'login')
      return (

    <div className={"blur-box " + this.props.popupState.state} onClick={this.checkZoneClick.bind(this)} id="loginBlurBox">
      <div className="popup-wrapper rounded">
        <h2 className="popup-header">Вход</h2>

        <form className="" action="" method="post" onSubmit={this.handleFormSubmit}>
          <div className={"input-field underline-anim wrong-" + this.props.wrongEmail}>
            <input className="popup__text-input" id="loginInput" name="loginInput" type="text" placeholder=" "/>
            <label className="popup__text-label" htmlFor="loginInput">Логин</label>
          </div>

          <p className={"email-input-hint " + this.props.wrongEmail}>{this.props.wrongEmailError}</p>
          
          <div className={"input-field underline-anim wrong-" + this.props.wrongPassword}>
            <input className="popup__text-input" id="passwordInput" name="passwordInput" type="password" placeholder=" "/>
            <label className="popup__text-label" htmlFor="passwordInput">Пароль</label>
          </div>

          <p className={"password-input-hint " + this.props.wrongPassword}>{this.props.wrongPasswordError}</p>

          <Loader active={this.props.loaderActive}></Loader>
          <input className="form-submit-btn f-large rounded" type="submit" value="Войти!"/>
          <button className="close-popup-btn" onClick={this.handleCloseBtnClick.bind(this)} tabIndex="-1">x</button>
        </form>
      </div>
    </div>
        )
    else return (

    <div className={"blur-box " + this.props.popupState.state} onClick={this.checkZoneClick.bind(this)} id="registrationBlurBox">
      <div className="popup-wrapper rounded">
        <h2 className="popup-header">Регистрация</h2>

        <form method="post" onSubmit={this.handleFormSubmit}>         

          <div className={"input-field underline-anim wrong-" + this.props.wrongEmail}>
            <input className="popup__text-input" id="loginInput" name="loginInput" type="text" placeholder=" "/>
            <label className="popup__text-label" htmlFor="loginInput">Логин (почта)</label>
          </div>

          <p className={"email-input-hint " + this.props.wrongEmail}>{this.props.wrongEmailError}</p>
          
          <div className={"input-field underline-anim wrong-" + this.props.wrongPassword}>
            <input className="popup__text-input" id="passwordInput" name="passwordInput" type="password" placeholder=" "/>
            <label className="popup__text-label" htmlFor="passwordInput">Пароль</label>
          </div>

          <div className="input-field underline-anim">
            <input className="popup__text-input" id="nameInput" name="nameInput" type="text" placeholder=" "/>
            <label className="popup__text-label" htmlFor="nameInput">Имя</label>
          </div>

          <ReCAPTCHA
            sitekey="6LcEwOYaAAAAAJwcQq13zkbJrEZtHkNX-2Z3dDBN"
            onChange={this.recaptchaCheck}
            size = "compact"
          />

          <p className={"password-input-hint " + this.props.wrongPassword}>{this.props.wrongPasswordError}</p>

          <div className="togglebox" >
            <span>Я - </span>
            <div className="main-capsule">
              <input type="checkbox" id="hidcheck" hidden onClick={this.changeSubject.bind(this)} />
              <label className="capsule" htmlFor="hidcheck" id="capsule-id" >
                <div className="circle"></div>
                <div className="text-signs">
                  <span id="on"></span>
                </div>
              </label>
            </div>
          </div>
          <p>Вы будете зарегистрированы как {this.checkUserType()}</p>

          <Loader active={this.props.loaderActive}></Loader>

          <input className="form-submit-btn f-large rounded" type="submit" value={this.props.submitValue}/>

          <button className="close-popup-btn" onClick={this.handleCloseBtnClick.bind(this)}  tabIndex="-1">x</button>

          <p>
Нажимая «Зарегистрироваться», вы подтверждаете, что ознакомлены, полностью согласны и принимаете условия <a href="#">«Соглашения об оказании услуг по содействию в трудоустройстве (оферта)»</a></p>
        </form>
      </div>
    </div>
    )
  }
}


const mapStateToProps = (state, ownProps) =>{
  return {
    submitValue: state.nav.popup.submitValue,
    wrongEmail:state.nav.popup.wrongEmail,
    wrongPassword:state.nav.popup.wrongPassword,
    wrongCaptcha:state.nav.popup.wrongCaptcha,
    popupActive: state.nav.popup.state,
    popupState: state.nav.popup,
    loaderActive: state.nav.popup.loginPopupLoaderActive,
    wrongEmailError:state.nav.popup.wrongEmailError,
    wrongPasswordError:state.nav.popup.wrongPasswordError,
    wrongCaptchaError:state.nav.popup.wrongCaptchaError,
    userState:state.user.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSetUserMiniAvatar: (photo) => {
      dispatch({type : 'SET_USER_MINI_AVATAR', payload:photo})
    },
    onSubjectChangeToEmployer: () => {
      dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYER', payload:null})
    },
    onSubjectChangeToEmployee: () => {
      dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYEE', payload:null})
    },
    onPopupClose: () => {
      dispatch({type : 'POPUP_CLOSE', payload:null})
    },
    onWrongEmailInput: (errorMsg) => {
      dispatch({type : 'WRONG_EMAIL_INPUT', payload:errorMsg})
    },
    onWrongPasswordInput: (errorMsg) => {
      dispatch({type : 'WRONG_PASSWORD_INPUT', payload:errorMsg})
    },
    onCaptchaNotPassed: (errorMsg) => {
      dispatch({type : 'WRONG_CAPTCHA_INPUT', payload:errorMsg})
    },
    onResetValidation: ()=>{
      dispatch({type : 'RESET_VALIDATION', payload:null})
    },
    onLoginUser: () => {
      dispatch({type : 'USER_LOGIN', payload:null})
    },
    onLoginUserCheck: (data, redirectUser, fetchError) =>{
      dispatch({type : 'WAITING_FOR_FETCH', payload:null})
      dispatch(loginUser(data))
      .then(data => {
        console.log(data)
        if (data.data !== null && data.data !== 0 && data.data !== undefined){
          redirectUser(data.data.id)
        }
        else{
          fetchError('wrong-data')
        }

      })
    },
    onRegistrationUserFetch: (data, redirectUser, fetchError, onLoginUserCheck) => {
      const userCredentials = data
      dispatch({type : 'WAITING_FOR_FETCH', payload:null})
      dispatch(registrateNewUser(userCredentials))
      .then(data => {
        console.log(data)
        if (data.data !== null && data.data !== 0 && data.data !== undefined){
          onLoginUserCheck(userCredentials, redirectUser, fetchError)
        }
        else{
          fetchError('email-occupied')
        }
      })
    },
    
    onActivateLoader: ()=>{
      dispatch({type : 'LOGIN_ACTIVATE_LOADER', payload:null})
    },
    onDeactivateLoader: ()=>{
      dispatch({type : 'LOGIN_DEACTIVATE_LOADER', payload:null})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
