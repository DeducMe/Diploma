import React, {Component} from 'react'
import Loader from '../../Loader/Loader'
import { connect } from 'react-redux'
import './profileRedactPopup.css'
import MainPlaceholder from './MainPlaceholder'
import {createNewEmployee, createNewEmployer, updateEmployee, getUserData} from '../../../actions/serverConnections'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import firebase from "firebase";
import fileUploader from '../../../actions/fileUploader'
import RedactPopupSectionBaseInfo from './redactPopupSections/RedactPopupSectionBaseInfo'
import RedactPopupSectionExperience from './redactPopupSections/RedactPopupSectionExperience'
import RedactPopupSectionImages from './redactPopupSections/RedactPopupSectionImages'

class ProfileRedactPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupRedactProfileDeactivate();
    }

    cropUserImage = (file, maxWidth, maxHeight, imageType) => {
        this.props.onDeactivateCropper()
        setTimeout(()=>{
            if (file !== undefined){
                this.props.onActivateCropper(file, maxWidth, maxHeight, imageType)
            }
        }, 0)
        
        
    }

    loadImageToFirebase = (image, imageType) =>{
        console.log(image)
        if (image !== undefined){
            const storageRef = fileUploader.storage().ref()
            const fileRef = storageRef.child('user-' + imageType + this.props.userState.user.id)
            fileRef.put(image).then((response)=>{
                fileRef.getDownloadURL()
                .then((response) => {
                    console.log(response)
                    if (imageType === 'avatar'){
                        this.props.onChangeAvatar(response)
                    }
                    else if(imageType === 'personal-background'){
                        this.props.onChangePersonalBackground(response)
                    }
                })
            })
        }

    }

    loadUserImage = (e, imageType) =>{
        const file = e.target.files[0];
        this.loadImageToFirebase(file, imageType)
    }

    changeUserNameValue(e){
        let input = e.target.value
        this.props.onUsernameChange(input)
    }

    changeUserDescriptionValue(e){
        this.props.onDescriptionChange(e.target.value)
    }

    changeUserBDay(e){
        this.props.onBDayChange(e.target.value)
    }

    changeCzValue(e){
        this.props.onCzChange(e.target.value)
    }

    changeCityValue(e){
        this.props.onCityChange(e.target.value)
    }

    changeGender = (e) => {
        if (e.target.value === 'male'){
          this.props.onChangeGenderToMale();
        }
        else if (e.target.value === 'female'){
          this.props.onChangeGenderToFemale();
        }
    }

    deleteLanguage = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onLanguageDelete(this.props.profileState.language[e.target.parentElement.dataset.key])
    }

    languageGradeChange = (e) =>{
        this.props.onLanguageGradeChange(e.target.value)
    }

    languageInput = (e) =>{
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            let newLanguage = {
                "grade": this.props.profileState.buf.languageGrade,
                "language": value
            }
            console.log(this.props.profileState.language.filter((el) => el.language === newLanguage.language))
            if(this.props.profileState.language.filter((el) => el.language === newLanguage.language).length === 0){
                this.props.onLanguageAdd(newLanguage)
                e.target.value = ''
            }
        }
        
    }
    

    deletePhone = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onTagDelete(this.props.profileState.userPhones[e.target.parentElement.dataset.key])
    }

    phoneInput = (e) =>{
        console.log(e)
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(this.props.profileState.userPhones.length > 1){

            }
            else if(this.props.profileState.userPhones.indexOf(value) === -1){
                this.props.onTagAdd(value)
                e.target.value = ''
            }
        }
    }

    experienceAdd = (e) =>{
        e.preventDefault();
        console.log(e.target)
        this.props.profileState.buf.educationBlocksAmount++
        const newExperience = {
            "position": e.target.positionInput.value,
            "company": e.target.companyInput.value,
            "type":e.target.experienceTypeInput.value,
            "start_year":e.target.experienceStartDateInput.value,
            "end_year":e.target.experienceEndDateInput.value
        }
        this.props.onExperienceAdd(newExperience)

    }

    educationAdd = (e) =>{
        e.preventDefault();
        this.props.profileState.buf.educationBlocksAmount++
        const newEducation = {
            "profession": e.target.professionInput.value,
            "university": e.target.universityInput.value,
            "type":e.target.educationTypeInput.value,
            "start_year":e.target.educationStartDateInput.value,
            "end_year":e.target.educationEndDateInput.value
        }
        this.props.onEducationAdd(newEducation)
    }

    educationDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onEducationDelete(this.props.profileState.education[e.target.parentElement.dataset.key])
    }
    experienceDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onExperienceDelete(this.props.profileState.exp[e.target.parentElement.dataset.key])   
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
            "city": this.props.placeholderData.city,
            "phone": this.props.profileState.userPhones,
            "about": this.props.placeholderData.description,
            "social_links": [],
            "education": this.props.profileState.education,
            "exp": this.props.profileState.exp,
            "cz": this.props.placeholderData.cz,
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

    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    getCropperData = () => {
        console.log(this.props.cropperData.instance)
        if (typeof this.props.cropperData.instance !== "undefined") {
          const croppedImage = this.dataURLtoBlob(this.props.cropperData.instance.getCroppedCanvas().toDataURL());
          this.loadImageToFirebase(croppedImage, this.props.cropperData.imageType)
        }
      };

    render() {
        return (
            <div className={"rounded profile-redact " + this.props.profileState.state}>
                <div className="profile-redact__popup-wrapper">
                    <MainPlaceholder></MainPlaceholder>
                    <div className="profile-redact__form">
                        <div className="profile-redact__form-nav">
                            <button className="popup-nav-btn" onClick={this.changeSection.bind(this, 'baseInfo')}>Базовая информация</button>
                            <button className="popup-nav-btn" onClick={this.changeSection.bind(this, 'experience')}>Опыт и образование</button>
                            <button className="popup-nav-btn" onClick={this.changeSection.bind(this, 'images')}>Персонализация</button>
                        </div>
                        {this.props.profileState.popupRedactActiveSection === 'baseInfo' ? (<RedactPopupSectionBaseInfo></RedactPopupSectionBaseInfo>) : ('')}
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
        cropperActive: state.profile.buf.cropper.state,
        cropperData:state.profile.buf.cropper

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