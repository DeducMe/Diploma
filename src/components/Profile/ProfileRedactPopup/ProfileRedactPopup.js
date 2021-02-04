import React, {Component} from 'react'
import Loader from '../../Loader/Loader'
import { connect } from 'react-redux'
import './profileRedactPopup.css'
import MainPlaceholder from './MainPlaceholder'
import {createNewEmployee, createNewEmployer, updateEmployee, getUserData} from '../../../actions/serverConnections'
import firebase from "firebase";
import fileUploader from '../../../actions/fileUploader'

class ProfileRedactPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupRedactProfileDeactivate();
    }

    loadUserAvatar = (e) =>{
        console.log(e.target.files[0])
        const file = e.target.files[0];
        console.log(file)
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('userAvatarInput-' + file.name)
        fileRef.put(file).then((response)=>{
            console.log(fileRef.getDownloadURL())
            fileRef.getDownloadURL()
            .then((response) => this.props.onChangeAvatar(response))
        })
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
    
    // deleteTag = (e) =>{
    //     e.preventDefault()
    //     console.log(e.target.parentElement.dataset.key)
    //     this.props.onTagDelete(e.target.parentElement.dataset.key)
    // }

    // tagInput = (e) =>{
    //     console.log(e.keyCode, this.props.placeholderData.activeTags.indexOf(e.target.value) === -1)
    //     const value = e.target.value.split(' ').join('')
    //     if (e.keyCode === 9 || e.keyCode === 32){
    //         e.preventDefault()
    //         if(this.props.placeholderData.activeTags.indexOf(value) === -1 ){
    //             this.props.onTagAdd(value)
    //             e.target.value = ''
    //         }
    //     }
        
    // }


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
            "profile_background": ""
        }

        if (this.props.userState.user.user_type === 'employee'){
            this.props.onUpdateEmployee(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
        }
        else this.props.onUpdateEmployer(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)

        this.props.onPopupRedactProfileDeactivate();
    }

    componentDidMount(){
        console.log(this.props.userState.hasProfile)
    }

    render() {
        return (
            <div className={"profile-redact " + this.props.profileState.state}>
                <div className="profile-redact__popup-wrapper">
                    <MainPlaceholder></MainPlaceholder>
                    <div className="profile-redact__form">
                        <div className="popup__input-block">
                            <div className={"input-field  underline-anim wrong-" + this.props.wrongEmail}>
                                <input className="popup__text-input" id="nameInput" name="nameInput" type="text" placeholder=" " onChange={this.changeUserNameValue.bind(this)} value={this.props.placeholderData.userName}/>
                                <label className="popup__text-label" htmlFor="nameInput">Имя/никнейм</label>
                            </div>

                            <div className="gender-radio-box">
                                <p>Пол:</p>
                                <input className="gender-input" type="radio" id="gender-male" name="gender-radio" value="male" onChange={this.changeGender}/>
                                <input className="gender-input" type="radio" id="gender-female" name="gender-radio" value="female" onChange={this.changeGender}/>

                                <div>
                                    <label htmlFor="gender-male">Мужской</label>
                                    <label htmlFor="gender-female">Женский</label>
                                </div>
                            </div>
                            
                            <div className="textarea-field">
                                <p>Описание</p>
                                <textarea className="popup__textarea-input" name="descriptionInput" id="descriptionInput" onChange={this.changeUserDescriptionValue.bind(this)} value={this.props.placeholderData.description}></textarea>
                            </div>
                            
                            <div className="input-field underlined">
                                <input className="popup__text-input" id="birthdayInput" name="birthdayInput" type="date" placeholder=" " onChange={this.changeUserBDay.bind(this)} value={this.props.placeholderData.birthday}/>
                                <label className="popup__text-label" htmlFor="birthdayInput">Дата рождения</label>
                            </div>

                            <div className="input-field underlined">
                                <input className="popup__text-input" id="czInput" name="czInput" type="text" placeholder=" " onChange={this.changeCzValue.bind(this)} value={this.props.placeholderData.cz}/>
                                <label className="popup__text-label" htmlFor="czInput">Гражданство</label>
                            </div>

                            <div className="input-field underlined">
                                <input className="popup__text-input" id="addressInput" name="addressInput" type="text" placeholder=" " onChange={this.changeCityValue.bind(this)} value={this.props.placeholderData.city}/>
                                <label className="popup__text-label" htmlFor="addressInput">Адрес</label>
                            </div>
                        </div>

                        <div className="list-input-field popup__input-block">
                            <p>Телефоны</p>

                            {this.props.profileState.userPhones.map((phone, index)=>{
                                return (
                                    <div key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{phone}</span>
                                        <button className="el-block__delete-el" onClick={this.deletePhone}>x</button>
                                    </div>
                                )
                            })}

                            <input className="popup__text-input" type="text" id="phonesInput" name="phonesInput" placeholder="Нажмите пробел после введения номера..." onKeyDown={this.phoneInput.bind(this)} maxLength="12"/>
                        </div>

                        <div className="list-input-field popup__input-block">
                            <p>Владение языками</p>

                            {this.props.profileState.language.map((el, index)=>{
                                return (
                                    <div key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{el.language + ' - ' + el.grade}</span>
                                        <button className="el-block__delete-el" onClick={this.deleteLanguage}>x</button>
                                    </div>
                                )
                            })}
                            <div className="popup__select-text-input">
                                <input className="popup__text-input" type="text" id="languageInput" name="languageInput" placeholder="Нажмите пробел после введения языка..." onKeyDown={this.languageInput.bind(this)}/>
                                <select name="languageGradeInput" id="languageGradeInput" onChange={this.languageGradeChange} value={this.props.profileState.buf.languageGrade}>
                                    <option value="A1">A1 - начинающий (Beginner)</option>
                                    <option value="A2">A2 - предпродвинутый (Pre-Intermediate)</option>
                                    <option value="B1">B1 - продвинутый (Intermediate)</option>
                                    <option value="B2">B2 - предпрофессиональный (Upper-Intermediate)</option>
                                    <option value="C1">C1 - Профессиональный (Advanced)</option>
                                    <option value="C2">C2 - Владение в совершенстве (Mastery)</option>
                                </select>
                            </div>
                            
                        </div>  

                        <form className="popup__education-input popup__input-block" onSubmit={this.educationAdd}>
                            {this.props.profileState.education.map((el, index)=>{
                                    return (
                                        <div key={index} className="list-input-field__el-block" data-key={index}>
                                            <span>{el.proffession + ' - ' + el.university}</span>
                                            <button className="el-block__delete-el" onClick={this.educationDelete}>x</button>
                                        </div>
                                    )
                            })}
                            <div className="input-field underlined">
                                <input className="popup__text-input" id="professionInput" name="professionInput" type="input" placeholder=" " required/>
                                <label className="popup__text-label" htmlFor="professionInput">Профессия</label>
                            </div>

                            <div className="input-field underlined">
                                <input className="popup__text-input" id="universityInput" name="universityInput" type="input" placeholder=" " required/>
                                <label className="popup__text-label" htmlFor="universityInput">Место образования</label>
                            </div>

                            <select name="educationTypeInput" id="educationTypeInput">
                                <option value="course">Курсы</option>
                                <option value="primary">Начальное образование (4 класса)</option>
                                <option value="basic">Среднее общее образование (9 классов)</option>
                                <option value="secondary">Среднее полное образование (11 классов)</option>
                                <option value="post-secondary">Среднее профессиональное образование</option>
                                <option value="bachelor">Высшее (бакалавриат)</option>
                                <option value="specialist">Высшее (специалитет)</option>
                                <option value="master">Высшее (магистратура)</option>
                                <option value="PhD-asp">Аспирантура</option>
                                <option value="PhD-doc">Докторантура</option>
                            </select>

                            <div className="popup__date-fields">
                                <div className="input-field">
                                    <input className="popup__text-input" id="educationStartDateInput" name="educationStartDateInput" type="date" placeholder=" " required/>
                                    <label className="popup__text-label" htmlFor="educationStartDateInput">Дата начала</label>
                                </div>

                                <div className="input-field">
                                    <input className="popup__text-input" id="educationEndDateInput" name="educationEndDateInput" type="date" placeholder=" " required/>
                                    <label className="popup__text-label" htmlFor="educationEndDateInput">Дата окончания</label>
                                </div>
                            </div>

                            <input type="submit" className="education-input__submit highlighted sup-btn" value="Сохранить"/>
                        </form>

                        <form className="popup__experience-input popup__input-block" onSubmit={this.experienceAdd}>
                            {this.props.profileState.exp.map((el, index)=>{
                                return (
                                    <div key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{el.position + ' - ' + el.company}</span>
                                        <button className="el-block__delete-el" onClick={this.experienceDelete}>x</button>
                                    </div>
                                )
                            })}

                            <div className="input-field">
                                <input className="popup__text-input" id="positionInput" name="positionInput" type="input" placeholder=" "/>
                                <label className="popup__text-label" htmlFor="positionInput">Позиция</label>
                            </div>

                            <div className="input-field">
                                <input className="popup__text-input" id="companyInput" name="companyInput" type="input" placeholder=" "/>
                                <label className="popup__text-label" htmlFor="companyInput">Компания</label>
                            </div>

                            <select name="experienceTypeInput" id="experienceTypeInput">
                                <option value="internship">Стажировка</option>
                                <option value="junior">Младший специалист</option>
                                <option value="middle">Средний специалист</option>
                                <option value="senior">Старший специалист</option>
                                <option value="director">Руководитель</option>
                                <option value="senior-director">Старший руководитель</option>
                            </select>

                            <div className="popup__date-fields">
                                <div className="input-field">
                                    <input className="popup__text-input" id="experienceStartDateInput" name="experienceStartDateInput" type="date" placeholder=" "/>
                                    <label className="popup__text-label" htmlFor="experienceStartDateInput">Дата начала</label>
                                </div>

                                <div className="input-field">
                                    <input className="popup__text-input" id="experienceEndDateInput" name="experienceEndDateInput" type="date" placeholder=" "/>
                                    <label className="popup__text-label" htmlFor="experienceEndDateInput">Дата окончания</label>
                                </div>
                            </div>

                            <input type="submit" className="experience-input__submit highlighted sup-btn" value="Сохранить"/>
                        </form>
                        <Loader active={this.props.loaderActive}></Loader>
                            
                        <input type="file" name="userAvatarInput" onChange={this.loadUserAvatar}/>

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
        onActivateLoader: ()=>{
            dispatch({type : 'ACTIVATE_PROFILE_REDACT_LOADER', payload:null})
        },
        onDeactivateLoader: ()=>{
            dispatch({type : 'DEACTIVATE_PROFILE_REDACT_LOADER', payload:null})
        },
        onUsernameChange: (username)=>{
            dispatch({type : 'POPUP_REDACT_USERNAME_CHANGE', payload:username})
        },
        onChangeAvatar: (fileUrl)=>{
            dispatch({type : 'POPUP_REDACT_AVATAR_CHANGE', payload:fileUrl})
        },
        onDescriptionChange: (text)=>{
            dispatch({type : 'POPUP_REDACT_DESCRIPTION_CHANGE', payload:text})
        },
        onBDayChange: (text)=>{
            dispatch({type : 'POPUP_REDACT_BIRTHDAY_CHANGE', payload:text})
        },
        onCzChange: (text)=>{
            dispatch({type : 'POPUP_REDACT_CITIZENSHIP_CHANGE', payload:text})
        },
        onCityChange: (text)=>{
            dispatch({type : 'POPUP_REDACT_CITY_CHANGE', payload:text})
        },        
        onChangeGenderToMale: () => {
            dispatch({type : 'CHANGE_GENDER_TO_MALE', payload:null})
        },
        onChangeGenderToFemale: () => {
            dispatch({type : 'CHANGE_GENDER_TO_FEMALE', payload:null})
        },
        onLanguageAdd: (language)=>{
            dispatch({type : 'POPUP_REDACT_ADD_LANGUAGE', payload:language})
        },
        onLanguageGradeChange: (grade)=>{
            dispatch({type : 'POPUP_REDACT_LANGUAGE_GRADE_CHANGE', payload:grade})
        },
        onLanguageDelete: (languageId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_LANGUAGE', payload:languageId})
        },
        onTagAdd: (phone)=>{
            dispatch({type : 'POPUP_REDACT_ADD_PHONE', payload:phone})
        },
        onTagDelete: (phoneId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_PHONE', payload:phoneId})
        },
        onEducationAdd: (education)=>{
            dispatch({type : 'POPUP_REDACT_ADD_EDUCATION', payload:education})
        },
        onEducationDelete: (educationId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_EDUCATION', payload:educationId})
        },
        onExperienceAdd: (experience)=>{
            dispatch({type : 'POPUP_REDACT_ADD_EXPERIENCE', payload:experience})
        },
        onExperienceDelete: (experienceId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_EXPERIENCE', payload:experienceId})
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