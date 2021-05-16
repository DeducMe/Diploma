import React, {Component} from 'react'
import { connect } from 'react-redux'
import MainPlaceholder from './MainPlaceholder'
import {createNewEmployee, updateEmployee, getUserData} from '../../../actions/serverConnections'
import "cropperjs/dist/cropper.css";

import RedactPopupSectionBaseInfo from './redactPopupSections/RedactPopupSectionBaseInfo'
import Test from './redactPopupSections/Test'

import RedactPopupSectionExperience from './redactPopupSections/RedactPopupSectionExperience'
import RedactPopupSectionImages from './redactPopupSections/RedactPopupSectionImages'

import baseInfoIcon from '../../../img/baseInfo.svg'
import experienceIcon from '../../../img/experience.svg'
import personalizationIcon from '../../../img/personalization.svg'


class ProfileRedactPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupRedactProfileDeactivate();
    }

    saveRedactProfileFormChanges = (e) =>{
        e.preventDefault();

        let data = {
            "user_id": this.props.userState.user.id,
            "gender":this.props.placeholderData.gender,
            "name":this.props.placeholderData.userName,
            "mailing": true,
            "language": this.props.profileState.language,
            "birthday": this.props.placeholderData.birthday,
            "address": this.props.profileState.address,
            "phone": this.props.profileState.userPhones,
            "about": this.props.placeholderData.description,
            "schedule": this.props.profileState.schedule,
            "social_links": [],
            "education": this.props.profileState.education,
            "experience": this.props.profileState.experience,
            "citizenship": this.props.placeholderData.citizenship,
            "profile_link": "",
            "photo_url": this.props.placeholderData.photo_url,
            "profile_background": this.props.placeholderData.profile_background
        }

        if (this.props.userState.user.user_type === 'employee'){
            this.props.onUpdateEmployee(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
        }
        else this.props.onUpdateEmployer(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)

        this.props.onPopupRedactProfileDeactivate();
    }

    changeSection(section) {
        this.props.onChangeSection(section)
    }

    render() {
        return (
            <div className={"no-fix-blur-box rounded profile-redact " + this.props.profileState.state}>
                <div className="profile-redact__popup-wrapper">
                    <MainPlaceholder></MainPlaceholder>
                    <div className="profile-redact__form">
                        <div className="profile-redact__form-nav">
                            <button className={"popup-nav-btn rounded " + (this.props.profileState.popupRedactActiveSection === 'baseInfo' ? 'active' : '')} onClick={this.changeSection.bind(this, 'baseInfo')}>
                                <img src={baseInfoIcon} alt="Базовая информация"/>
                            </button>
                            <button className={"popup-nav-btn rounded " + (this.props.profileState.popupRedactActiveSection === 'experience' ? 'active' : '')} onClick={this.changeSection.bind(this, 'experience')}>
                                <img src={experienceIcon} alt="Опыт и образование"/>
                            </button>
                            <button className={"popup-nav-btn rounded " + (this.props.profileState.popupRedactActiveSection === 'images' ? 'active' : '')} onClick={this.changeSection.bind(this, 'images')}>
                                <img src={personalizationIcon} alt="Персонализация"/>
                            </button>
                        </div>
                        {/* {this.props.profileState.popupRedactActiveSection === 'baseInfo' ? (<Test></Test>) : ('')} */}
                        {this.props.profileState.popupRedactActiveSection === 'experience' ? (<RedactPopupSectionExperience></RedactPopupSectionExperience>) : ('')}
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
        profileState: state.profile,
        userState: state.user,
        placeholderData: state.profile.placeholder,
        loaderActive: state.nav.popup.loaderActive,
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onPopupRedactProfileDeactivate: () => {
            dispatch({type : 'POPUP_REDACT_PROFILE_DEACTIVATE', payload:null})
        },
        onChangeSection: (section) => {
            dispatch({type : 'POPUP_REDACT_CHANGE_SECTION', payload:section})
        },
        onActivateLoader: ()=>{
            dispatch({type : 'ACTIVATE_PROFILE_REDACT_LOADER', payload:null})
        },
        onDeactivateLoader: ()=>{
            dispatch({type : 'DEACTIVATE_PROFILE_REDACT_LOADER', payload:null})
        },
        onCreateNewEmployee:(data, userId, onGetUserFetch, onHasProfile)=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
            dispatch(createNewEmployee(data))
            .then(data => onGetUserFetch(userId, onHasProfile))
        },
        onCreateNewEmployer:()=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
        },
        onUpdateEmployee:(data, userId, onGetUserFetch, onHasProfile)=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
            dispatch(updateEmployee(data, userId))
            .then(data => onGetUserFetch(userId, onHasProfile))
        },
        onUpdateEmployer:()=>{
            dispatch({type : 'WAITING_FOR_FETCH', payload:null})
        },
        onHasProfile: () => {
          dispatch({type : 'USER_HAS_PROFILE', payload:null})
        },
        onGetUserFetch: (userId, onHasProfile)=> {
          dispatch(getUserData(userId))
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