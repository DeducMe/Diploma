import React from 'react'
import { connect } from 'react-redux'
import LeafletMap from '../../../leafletMap/LeafletMap'


const RedactPopupSectionBaseInfo = (state, placeholderData, LeafletMapData, profileState, onUsernameChange,onSaveNewAddress, onDescriptionChange, onBDayChange, onCzChange, onCityChange, onChangeGenderToMale, onChangeGenderToFemale, onLanguageDelete, onLanguageGradeChange, onLanguageAdd, onPhoneDelete, onPhoneAdd) => {
    const changeUserNameValue = (e) => {
        let input = e.target.value
        state.onUsernameChange(input)
    }

    const changeUserDescriptionValue = (e) => {
        state.onDescriptionChange(e.target.value)
    }

    const changeUserBDay = (e) => {
        state.onBDayChange(e.target.value)
    }

    const changeCzValue = (e) => {
        state.onCzChange(e.target.value)
    }

    const saveNewAddress = (e) => {
        state.onSaveNewAddress({
            name:state.LeafletMapData.name,
            lat:state.LeafletMapData.lat,
            lng:state.LeafletMapData.lng

        })
    }

    const changeGender = (e) => {
        if (e.target.value === 'male'){
          state.onChangeGenderToMale();
        }
        else if (e.target.value === 'female'){
            state.onChangeGenderToFemale();
        }
    }

    const deleteLanguage = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onLanguageDelete(state.profileState.language[e.target.parentElement.dataset.key])
    }

    const languageGradeChange = (e) =>{
        state.onLanguageGradeChange(e.target.value)
    }

    const languageInput = (e) =>{
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            let newLanguage = {
                "grade": state.profileState.buf.languageGrade,
                "language": value
            }
            console.log(state.profileState.language.filter((el) => el.language === newLanguage.language))
            if(state.profileState.language.filter((el) => el.language === newLanguage.language).length === 0){
                state.onLanguageAdd(newLanguage)
                e.target.value = ''
            }
        }
    }
    
    const deletePhone = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onPhoneDelete(state.profileState.userPhones[e.target.parentElement.dataset.key])
    }

    const phoneInput = (e) =>{
        console.log(e)
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(state.profileState.userPhones.length > 1){

            }
            else if(state.profileState.userPhones.indexOf(value) === -1){
                state.onPhoneAdd(value)
                e.target.value = ''
            }
        }
    }
    return (
        <section className="popup-redact-section">
            <div className="popup__input-block">
                <div className="input-field underline-anim">
                    <input className="popup__text-input" id="nameInput" name="nameInput" type="text" placeholder=" " onChange={changeUserNameValue} value={placeholderData.userName}/>
                    <label className="popup__text-label" htmlFor="nameInput">Имя/никнейм</label>
                </div>

                <div className="gender-radio-box">
                    <p>Пол:</p>
                    <input className="gender-input" type="radio" id="gender-male" name="gender-radio" value="male" onChange={changeGender}/>
                    <input className="gender-input" type="radio" id="gender-female" name="gender-radio" value="female" onChange={changeGender}/>

                    <div>
                        <label htmlFor="gender-male">Мужской</label>
                        <label htmlFor="gender-female">Женский</label>
                    </div>
                </div>
                
                <div className="textarea-field">
                    <p>Описание профиля</p>
                    <textarea className="popup__textarea-input" name="descriptionInput" id="descriptionInput" onChange={changeUserDescriptionValue} value={placeholderData.description}></textarea>
                </div>
                
                <div className="input-field underlined">
                    <input className="popup__text-input" id="birthdayInput" name="birthdayInput" type="date" placeholder=" " onChange={changeUserBDay} value={placeholderData.birthday}/>
                    <label className="popup__text-label" htmlFor="birthdayInput">Дата рождения</label>
                </div>

                <div className="input-field underlined">
                    <input className="popup__text-input" id="czInput" name="czInput" type="text" placeholder=" " onChange={changeCzValue} value={placeholderData.cz}/>
                    <label className="popup__text-label" htmlFor="czInput">Гражданство</label>
                </div>
                <div className="address-input">
                    <LeafletMap address={state.profileState.address}></LeafletMap>
                    <button className="highlighted sup-btn" onClick={saveNewAddress}>Сохранить</button>
                </div>
                
            </div>

            <div className="list-input-field popup__input-block">
                <p>Контакты</p>
                
                {state.profileState.userPhones.map((phone, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{phone}</span>
                            <button className="el-block__delete-el" onClick={deletePhone}>x</button>
                        </div>
                    )
                })}

                <input className="popup__text-input" type="text" id="phonesInput" name="phonesInput" placeholder="Нажмите пробел после введения номера..." onKeyDown={phoneInput} maxLength="12"/>
            </div>

            <div className="list-input-field popup__input-block">
                <p>Владение языками</p>

                {state.profileState.language.map((el, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{el.language + ' - ' + el.grade}</span>
                            <button className="el-block__delete-el" onClick={deleteLanguage}>x</button>
                        </div>
                    )
                })}
                <div className="popup__select-text-input">
                    <input className="popup__text-input" type="text" id="languageInput" name="languageInput" placeholder="Нажмите пробел после введения языка..." onKeyDown={languageInput}/>
                    <select name="languageGradeInput" id="languageGradeInput" onChange={languageGradeChange} value={state.profileState.buf.languageGrade}>
                        <option value="A1">A1 - начинающий (Beginner)</option>
                        <option value="A2">A2 - предпродвинутый (Pre-Intermediate)</option>
                        <option value="B1">B1 - продвинутый (Intermediate)</option>
                        <option value="B2">B2 - предпрофессиональный (Upper-Intermediate)</option>
                        <option value="C1">C1 - Профессиональный (Advanced)</option>
                        <option value="C2">C2 - Владение в совершенстве (Mastery)</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) =>{
    return {
        state:state,
        profileState: state.profile,
        userState: state.user,
        placeholderData: state.profile.placeholder,
        LeafletMapData:state.buf.leafletMap.data
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
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
        onAddressChange: (text)=>{
            dispatch({type : 'POPUP_REDACT_ADDRESS_NAME_CHANGE', payload:text})
        }, 
        onSaveNewAddress:(address)=>{
            dispatch({type : 'POPUP_REDACT_ADDRESS_CHANGE', payload:address})
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
        onPhoneAdd: (phone)=>{
            dispatch({type : 'POPUP_REDACT_ADD_PHONE', payload:phone})
        },
        onPhoneDelete: (phoneId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_PHONE', payload:phoneId})
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionBaseInfo)

