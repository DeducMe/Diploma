import React, {Component} from 'react'
import Loader from '../../Loader/Loader'
import { connect } from 'react-redux'
import './profileRedactPopup.css'
import MainPlaceholder from './MainPlaceholder'
import {updateEmployer, createNewEmployer, getEmployer} from '../../../actions/serverConnections'
import "cropperjs/dist/cropper.css";
import fileUploader from '../../../actions/fileUploader'
import RedactPopupSectionBaseInfo from './redactPopupSections/RedactPopupSectionBaseInfo'
import RedactPopupSectionImages from './redactPopupSections/RedactPopupSectionImages'

class ProfileRedactPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupRedactProfileDeactivate();
    }


    saveRedactProfileFormChanges = (e) =>{
        e.preventDefault();

        let data = {
            "user_id": this.props.userState.user.id,
            "name":this.props.placeholderData.name,
            "mailing": true,
            "address": this.props.placeholderData.address,
            "phone": this.props.placeholderData.phone,
            "about": this.props.placeholderData.about,
            "links": [],
            "profile_link": "",
            "photo_url": this.props.placeholderData.photo_url,
            "profile_background": this.props.placeholderData.profile_background
        }

        this.props.onUpdateEmployer(data, this.props.userState.user.id, this.props.onGetEmployer, this.props.onHasProfile)
        this.props.onPopupRedactProfileDeactivate();
    }

    changeSection(section) {
        this.props.onChangeSection(section)
    }

    render() {
        return (
            <div className={"rounded profile-redact " + this.props.profileState.state}>
                <div className="profile-redact__popup-wrapper">
                    <MainPlaceholder></MainPlaceholder>
                    <div className="profile-redact__form">
                        <div className="profile-redact__form-nav">
                            <button className="popup-nav-btn" onClick={this.changeSection.bind(this, 'baseInfo')}>Базовая информация</button>
                            <button className="popup-nav-btn" onClick={this.changeSection.bind(this, 'images')}>Персонализация</button>
                        </div>
                        {this.props.profileState.popupRedactActiveSection === 'baseInfo' ? (<RedactPopupSectionBaseInfo></RedactPopupSectionBaseInfo>) : ('')}
                        {this.props.profileState.popupRedactActiveSection === 'images' ? (<RedactPopupSectionImages></RedactPopupSectionImages>) : ('')}

                        <button className="form-submit-btn f-large rounded bold" onClick={this.saveRedactProfileFormChanges}>Сохранить изменения</button>
                        <button className="profile-redact__close-popup-btn" onClick={this.popupClose.bind(this)} tabIndex="-1">x</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        profileState: state.companyProfile,
        userState: state.user,
        placeholderData: state.companyProfile.placeholder,
        loaderActive: state.nav.popup.loaderActive,
        cropperActive: state.companyProfile.buf.cropper.state,
        cropperData:state.companyProfile.buf.cropper

    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onPopupRedactProfileDeactivate: () => {
            dispatch({type : 'POPUP_EMPLOYER_REDACT_PROFILE_DEACTIVATE', payload:null})
        },
        onChangeSection: (section) => {
            dispatch({type : 'POPUP_EMPLOYER_REDACT_CHANGE_SECTION', payload:section})
        },
        onActivateLoader: ()=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_ACTIVATE_LOADER', payload:null})
        },
        onDeactivateLoader: ()=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_DEACTIVATE_LOADER', payload:null})
        },
        onCreateNewEmployer:(data, userId, onGetEmployer, onHasProfile)=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
            dispatch(createNewEmployer(data))
            .then(data => onGetEmployer(userId, onHasProfile))
        },
        onUpdateEmployer:(data, userId, onGetEmployer, onHasProfile)=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
            dispatch(updateEmployer(data, userId))
            .then(data => onGetEmployer(userId, onHasProfile))
        },
        onHasProfile: () => {
          dispatch({type : 'USER_HAS_PROFILE', payload:null})
        },
        onGetEmployer: (userId, onHasProfile)=> {
          dispatch(getEmployer(userId))
          .then((data)=>{
              if (data.userData !== null){
                  console.log(data.userData)
                  onHasProfile()
              }
          })
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfileRedactPopup);