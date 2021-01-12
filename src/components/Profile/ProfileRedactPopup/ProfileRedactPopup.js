import React, {Component} from 'react'
import Loader from '../../Loader/Loader'
import { connect } from 'react-redux'
import './profileRedactPopup.css'
import MainPlaceholder from './MainPlaceholder'
import {createNewEmployee, createNewEmployer, updateEmployee, getUserData} from '../../../actions/serverConnections'


class ProfileRedactPopup extends Component {
    popupClose(e){
        e.preventDefault()
        this.props.onPopupRedactProfileDeactivate();
    }

    changeUserNameValue(e){
        this.props.onUsernameChange(e.target.value)
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

    deletePhone = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onTagDelete(this.props.profileState.userPhones[e.target.parentElement.dataset.key])
    }

    phoneInput = (e) =>{
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

    

    saveRedactProfileFormChanges = (e) =>{
        e.preventDefault();
        let userName = this.props.placeholderData.userName

        let data = {
            "user_id": this.props.userState.user.id,
            "gender":this.props.placeholderData.gender,
            "mailing": true,
            "language": [
              {
                "language": "",
                "grade": ""
              }
            ],
            "birthday": this.props.placeholderData.birthday,
            "city": this.props.placeholderData.city,
            "phone": this.props.profileState.userPhones,
            "about": this.props.placeholderData.description,
            "social_links": [
              ""
            ],
            "education": [
              {
                "proffession": "geniy",
                "university": "123",
                "type": "dfsd",
                "start_year": "sdf",
                "end_year": "sdfs",
                "course": false
              }
            ],
            "exp": [
              {
                "start_year": "sdf",
                "end_year": "sdf",
                "position": "sdf",
                "company": "sdf",
                "type": "sdf"
              }
            ],
            "cz": this.props.placeholderData.cz,
            "profile_link": "",
            "photo_url": "",
            "profile_background": ""
        }

        if (this.props.userState.hasProfile){
            if (this.props.userState.user.user_type === 'employee'){
                this.props.onUpdateEmployee(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
            }
            else this.props.onUpdateEmployer(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
        }
        else {
            if (this.props.userState.user.user_type === 'employee'){
                this.props.onCreateNewEmployee(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
            }
            else this.props.onCreateNewEmployer(data, this.props.userState.user.id, this.props.onGetUserFetch, this.props.onHasProfile)
        }

        if (userName !== this.props.userState.user.name){
            // this.props.OnChangeNickname()
        }

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
                    <form className="profile-redact__form" onSubmit={this.saveRedactProfileFormChanges}>
                        <div className={"input-field underline-anim wrong-" + this.props.wrongEmail}>
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
                        
                        <div className="input-field">
                            <input className="popup__text-input" id="birthdayInput" name="birthdayInput" type="date" placeholder=" " onChange={this.changeUserBDay.bind(this)} value={this.props.placeholderData.birthday}/>
                            <label className="popup__text-label" htmlFor="birthdayInput">Дата рождения</label>
                        </div>

                        <div className="input-field underline-anim">
                            <input className="popup__text-input" id="czInput" name="czInput" type="text" placeholder=" " onChange={this.changeCzValue.bind(this)} value={this.props.placeholderData.cz}/>
                            <label className="popup__text-label" htmlFor="czInput">Гражданство</label>
                        </div>

                        <div className="input-field underline-anim">
                            <input className="popup__text-input" id="addressInput" name="addressInput" type="text" placeholder=" " onChange={this.changeCityValue.bind(this)} value={this.props.placeholderData.city}/>
                            <label className="popup__text-label" htmlFor="addressInput">Адрес</label>
                        </div>

                        <div className="list-input-field">
                            <p>Телефоны</p>

                            {this.props.profileState.userPhones.map((tag, index)=>{
                                return (
                                    <div key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{tag}</span>
                                        <button className="el-block__delete-el" onClick={this.deletePhone}>x</button>
                                    </div>
                                )
                            })}

                            <input className="popup__text-input" type="text" id="phonesInput" name="phonesInput" placeholder="Нажмите пробел после введения номера..." onKeyDown={this.phoneInput.bind(this)} maxLength="12"/>
                        </div>
                        
                        <Loader active={this.props.loaderActive}></Loader>

                        <input className="form-submit-btn f-large rounded" type="submit" value="Сохранить!"/>
                        <button className="profile-redact__close-popup-btn" onClick={this.popupClose.bind(this)} tabIndex="-1">x</button>
                    </form>
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
        onTagAdd: (phone)=>{
            dispatch({type : 'POPUP_REDACT_ADD_PHONE', payload:phone})
        },
        onTagDelete: (phoneId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_PHONE', payload:phoneId})
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