import React, { Component } from 'react'
import { connect } from 'react-redux'

import './optionsPopup.css'
import Loader from '../../Loader/Loader'



class OptionsPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupClose();
    }

    render() {
        return (
            <div className={"options-popup " + this.props.popupActive}>
                <div className="popup-wrapper rounded">
                    <h2 className="popup-header">Настройки</h2>
                    <form>
                        <input className="form-submit-btn f-large rounded" type="submit" value="Сохранить!"/>
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
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OptionsPopup);
  

