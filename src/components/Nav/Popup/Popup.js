import React, { Component } from 'react'

import { connect } from 'react-redux'
import '../../../css/style.css'
import './popup.css'

class Popup extends Component {
  
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

  popupClose(e){
    e.preventDefault()
    this.props.onPopupClose();
  }

  render() {
    if (this.props.popupState.type === 'login')
      return (

        <div className={"user-id-popup " + this.props.popupState.state}>
      <div className="popup-wrapper rounded">
        <h2 className="popup-header">Вход</h2>

        <form className="" action="" method="post">
          <button className="close-popup-btn" onClick={this.popupClose.bind(this)}>x</button>
          

          <div className="input-field underline-anim">
            <input className="popup__text-input" id="loginInput" name="loginInput" type="text" placeholder=" "/>
            <label className="popup__text-label" htmlFor="loginInput">Логин</label>
          </div>
          
          <div className="input-field underline-anim">
            <input className="popup__text-input" id="passwordInput" name="passwordInput" type="password" placeholder=" "/>
            <label className="popup__text-label" htmlFor="passwordInput">Пароль</label>
          </div>

          <div className="checkbox">
            <input className="inp-cbx" id="morning" type="checkbox"/>
            <label className="cbx" htmlFor="morning"><span>
            <svg width="12px" height="10px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg></span><span>Запомните меня!</span></label>
          </div>
          

          <input className="form-submit-btn f-large rounded" type="submit" value="Войти!"/>

          
        </form>
      </div>
    </div>
        )
    else return (

    <div className={"user-id-popup " + this.props.popupState.state}>
      <div className="popup-wrapper rounded">
        <h2 className="popup-header">Регистрация</h2>

        <form className="" action="" method="post">
          <button className="close-popup-btn" onClick={this.popupClose.bind(this)}>x</button>
          

          <div className="input-field underline-anim">
            <input className="popup__text-input" id="loginInput" name="loginInput" type="text" placeholder=" "/>
            <label className="popup__text-label" htmlFor="loginInput">Логин</label>
          </div>
          
          <div className="input-field underline-anim">
            <input className="popup__text-input" id="passwordInput" name="passwordInput" type="password" placeholder=" "/>
            <label className="popup__text-label" htmlFor="passwordInput">Пароль</label>
          </div>

          <div className="togglebox" >
            <span>Я - </span>
            <div className="main">
              <input type="checkbox" id="hidcheck" hidden onClick={this.changeSubject.bind(this)} />
              <label className="capsule" htmlFor="hidcheck" id="capsule-id" >
                <div className="circle"></div>
                <div className="text-signs">
                  <span id="on"></span>
                </div>
              </label>
            </div>
          </div>

          <div className="checkbox">
            <input className="inp-cbx" id="morning" type="checkbox"/>
            <label className="cbx" htmlFor="morning"><span>
            <svg width="12px" height="10px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg></span><span>Запомните меня!</span></label>
          </div>

          <input className="form-submit-btn f-large rounded" type="submit" value={this.props.submitValue}/>

          <p>
Нажимая «Зарегистрироваться», вы подтверждаете, что ознакомлены, полностью согласны и принимаете условия <a href="#">«Соглашения об оказании услуг по содействию в трудоустройстве (оферта)»</a></p>
        </form>
      </div>
    </div>
    )
  }
}

// export default connect(
//   state => ({
//     popupState: state.nav.popup
//   }),
//   dispatch => ({
//     onSubjectChangeToEmployer: () => {
//       dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYER', payload:null})
//     },
//     onSubjectChangeToEmployee: () => {
//       dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYEE', payload:null})
//     }
    
//   })
// )(Popup)

const mapStateToProps = (state, ownProps) =>{
  return {
    submitValue: state.nav.popup.submitValue,
    popupActive: state.nav.popup.state,
    popupState: state.nav.popup
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSubjectChangeToEmployer: () => {
      dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYER', payload:null})
    },
    onSubjectChangeToEmployee: () => {
      dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYEE', payload:null})
    },
    onPopupClose: () => {
      dispatch({type : 'POPUP_CLOSE', payload:null})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
