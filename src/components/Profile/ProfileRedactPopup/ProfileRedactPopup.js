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
        console.log(e.target.value)
        this.props.onUsernameChange(e.target.value)
    }

    changeUserDescriptionValue(e){
        console.log(e.target.value)
        this.props.onDescriptionChange(e.target.value)
    }

    changeUserBDay(e){
        console.log(e.target.value)
        this.props.onBDayChange(e.target.value)
    }

    changeGender = () => {
        if (this.props.placeholderData.gender === 'female'){
          this.props.onChangeGenderToMale();
        }
        else if (this.props.placeholderData.gender === 'male'){
          this.props.onChangeGenderToFemale();
        }
      }


    saveRedactProfileFormChanges = (e) =>{
        e.preventDefault();
        let name = this.props.placeholderData.userName

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
            "city": "",
            "phone": [
              ""
            ],
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
            "cz": "",
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

        this.props.onPopupRedactProfileDeactivate();
        
    }

    componentDidMount(){
        console.log(this.props.userState.hasProfile)
        console.log(this.props.userState.userData.about)
        

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
                            <input className="gender-input" type="radio" id="gender-male" name="gender-radio"  onChange={this.changeGender}/>
                            <input className="gender-input" type="radio" id="gender-female" name="gender-radio"  onChange={this.changeGender}/>

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
        
        onChangeGenderToMale: () => {
            dispatch({type : 'CHANGE_GENDER_TO_MALE', payload:null})
        },
        onChangeGenderToFemale: () => {
            dispatch({type : 'CHANGE_GENDER_TO_FEMALE', payload:null})
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
              console.log(data.userData)
              if (data.userData !== null){
                  console.log(data.userData)
                  onHasProfile()
              }
          })
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfileRedactPopup);