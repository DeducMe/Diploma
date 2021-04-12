import React, { Component } from 'react'
import { connect } from 'react-redux'

import './optionsPopup.css'
import Loader from '../../Loader/Loader'
import {changePassword} from '../../../actions/serverConnections'


class OptionsPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupClose();
    }

    changeUserPassword(e){
        e.preventDefault()
        this.props.onChangeUserPassword(e.target.newPasswordInput.value)
    }

    render() {
        return (
            <div className={"options-popup " + this.props.popupActive} onClick={this.popupClose.bind(this)}>
                <div className="popup-wrapper rounded">
                    <h2 className="popup-header">Смена пароля</h2>
                    <form onSubmit={this.changeUserPassword.bind(this)}>
                        <div className="input-field underline-anim">
                            <input className="popup__text-input" id="newPasswordInput" name="newPasswordInput" type="password" placeholder=" "/>
                            <label className="popup__text-label" htmlFor="nameInput">Новый пароль</label>
                        </div>

                        <input className="form-submit-btn f-large rounded" type="submit" value="Сменить пароль!"/>
                    </form>
                    <Loader active={this.props.loaderActive}></Loader>
                    <button className="close-popup-btn" onClick={this.popupClose.bind(this)} tabIndex="-1">x</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
      popupActive: state.nav.optionsPopup.optionsPopupState,
      popupState: state.nav.optionsPopup,
      loaderActive: state.nav.optionsPopup.loaderActive
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      onActivateLoader: ()=>{
        dispatch({type : 'ACTIVATE_LOADER', payload:null})
      },
      onDeactivateLoader: ()=>{
        dispatch({type : 'DEACTIVATE_LOADER', payload:null})
      },
      onPopupClose: ()=>{
        dispatch({type : 'OPTIONS_POPUP_DEACTIVATE', payload:null})
      },
      onChangeUserPassword: (password)=>{
        dispatch(changePassword(password))

      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OptionsPopup);
  

