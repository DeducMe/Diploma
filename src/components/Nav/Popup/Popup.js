import React, { Component } from 'react'

import { connect } from 'react-redux'
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

  render() {
    console.log(this.props.popupState.type)
    if (this.props.popupState.type === 'login')
      return (

        <div className={"user-id-popup " + this.props.popupState.state}>
          <div className="popup-wrapper">
            
          </div>
        </div>
        )
    else return (

    <div className={"user-id-popup " + this.props.popupState.state}>
      <div className="popup-wrapper">
        <h2>Регистрация</h2>

        <form className="" action="" method="post">
          <div className="input-field">
            <input className="popup__text-input" id="loginInput" name="loginInput" type="text"/>
            <label htmlFor="loginInput">Логин</label>
          </div>
          
          <div className="input-field">
            <input className="popup__text-input" id="passwordInput" name="passwordInput" type="password"/>
            <label htmlFor="passwordInput">Пароль</label>
          </div>

          <input className="popup__check-input" type="checkbox" name="remember-checkbox" id="remember-checkbox"/>
          <label htmlFor="remember-checkbox">Запомните меня!</label>

          <input type="submit" value={this.props.submitValue}/>

          <div className="togglebox" >
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
  console.log(ownProps)
  return {
    submitValue: state.nav.popup.submitValue,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
