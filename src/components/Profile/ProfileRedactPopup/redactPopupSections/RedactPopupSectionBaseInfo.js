import React from 'react'
import { connect } from 'react-redux'
import LeafletMap from '../../../leafletMap/LeafletMap'
import {checkStringInput} from '../../../../scripts/commonScripts.js'


const RedactPopupSectionBaseInfo = (state, placeholderData, LeafletMapData, profileState, onUsernameChange,onSaveNewAddress, onDescriptionChange, onBDayChange, onCzChange, onCityChange, onChangeGenderToMale, onChangeGenderToFemale, onLanguageDelete, onLanguageGradeChange, onLanguageAdd, onPhoneDelete, onPhoneAdd) => {
    const changeUserNameValue = (e) => {
        let input = e.target.value
        state.onUsernameChange(input)
    }

    const convertIntToDay = (num) =>{
        const days = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
        ]

        return days[num]
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

    const addLanguage = (e) => {
        e.preventDefault()
        
        const value = e.target.languageInput.value.split(' ').join('')
        let newLanguage = {
            "grade": state.profileState.buf.languageGrade,
            "language": value
        }
        console.log(state.profileState.language.filter((el) => el.language === newLanguage.language))
        if(state.profileState.language.filter((el) => el.language === newLanguage.language).length === 0){
            state.onLanguageAdd(newLanguage)
            e.target.languageInput.value = ''

        }

    }

    const deleteSchedule = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onScheduleDelete(state.profileState.schedule[e.target.parentElement.dataset.key])
    }

    const scheduleDayChange = (e) =>{
        state.onScheduleDayChange(e.target.value)
    }

    const scheduleEndTimeChange = (e) =>{
        state.onScheduleEndTimeChange(e.target.value)
    }

    const scheduleStartTimeChange = (e) =>{
        state.onScheduleStartTimeChange(e.target.value)
    }

    const addSchedule = (e) => {
        e.preventDefault()
        
        let newSchedule = {
            "start_time": state.profileState.buf.scheduleStartTime,
            "end_time": state.profileState.buf.scheduleStartTime,
            "day": parseInt(state.profileState.buf.scheduleDay)
        }
        console.log(state.profileState.schedule.filter((el) => el.day === newSchedule.day))
        if(state.profileState.schedule.filter((el) => el.day === newSchedule.day).length === 0){
            state.onScheduleAdd(newSchedule)
        }
    }
    
    
    const deletePhone = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onPhoneDelete(state.profileState.userPhones[e.target.parentElement.dataset.key])
    }

    const addPhone = (e) => {
        e.preventDefault()
        const value = e.target.phonesInput.value.split(' ').join('')

        const check = checkStringInput(value, 100, 3, /^([+]?[0-9\s-\(\)]{3,25})*$/i);

        check === "pass" ? 
        state.onPhoneAdd(value) 
        : state.onInputMistake(check);

        e.target.phonesInput.value = ''
    }

    const phoneInput = (e) =>{
        const value = e.target.value.split(' ').join('')

        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(state.profileState.userPhones.length > 2){
                
            }
            else if(state.profileState.userPhones.indexOf(value) === -1){
                const check = checkStringInput(value, 100, 0, /^([+]?[0-9\s-\(\)]{3,25})*$/i);

                check === "pass" ? 
                state.onPhoneAdd(value) 
                : state.onInputMistake(check);

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
                <p>Телефоны</p>
                
                {state.profileState.userPhones.map((phone, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{phone}</span>
                            <button className="el-block__delete-el" onClick={deletePhone}>x</button>
                        </div>
                    )
                })}
                <form className="flex" onSubmit={addPhone}>
                    <input className="popup__text-input" type="text" id="phonesInput" name="phonesInput" placeholder="Нажмите пробел после введения номера..." onKeyDown={phoneInput} />
                    <button className="sup-btn-circled">+</button>
                </form>

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
                <form className="popup__select-text-input" onSubmit={addLanguage}>
                    <input className="popup__text-input" type="text" id="languageInput" name="languageInput" placeholder="Нажмите пробел после введения языка..." onKeyDown={languageInput}/>
                    <select name="languageGradeInput" id="languageGradeInput" onChange={languageGradeChange} value={state.profileState.buf.languageGrade}>
                        <option value="A1">A1 - начинающий (Beginner)</option>
                        <option value="A2">A2 - предпродвинутый (Pre-Intermediate)</option>
                        <option value="B1">B1 - продвинутый (Intermediate)</option>
                        <option value="B2">B2 - предпрофессиональный (Upper-Intermediate)</option>
                        <option value="C1">C1 - Профессиональный (Advanced)</option>
                        <option value="C2">C2 - Владение в совершенстве (Mastery)</option>
                    </select>
                    <button className="sup-btn-circled">+</button>
                </form>
            </div>

            <div className="list-input-field popup__input-block">
                <p>Желательный график работы</p>

                {state.profileState.schedule.map((el, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{el.start_time + ' - ' + el.end_time + '(' + convertIntToDay(el.day) + ')'}</span>
                            <button className="el-block__delete-el" onClick={deleteSchedule}>x</button>
                        </div>
                    )
                })}

                <form className="popup__select-text-input" onSubmit={addSchedule}>
                    <select name="scheduleStartTimeInput" id="scheduleStartTimeInput" onChange={scheduleStartTimeChange} value={state.profileState.buf.scheduleStartTime}>
                        <option value="00:00">00:00</option>
                        <option value="00:30">00:30</option>
                        <option value="01:00">01:00</option>
                        <option value="01:30">01:30</option>
                        <option value="02:00">02:00</option>
                        <option value="02:30">02:30</option>
                        <option value="03:00">03:00</option>
                        <option value="03:30">03:30</option>
                        <option value="04:00">04:00</option>
                        <option value="04:30">04:30</option>
                        <option value="05:00">05:00</option>
                        <option value="05:30">05:30</option>
                        <option value="06:00">06:00</option>
                        <option value="06:30">06:30</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                        <option value="22:30">22:30</option>
                        <option value="23:00">23:00</option>
                        <option value="23:30">23:30</option>
                    </select>
                    <select name="scheduleEndTimeInput" id="scheduleEndTimeInput" onChange={scheduleEndTimeChange} value={state.profileState.buf.scheduleEndTime}>
                        <option value="00:00">00:00</option>
                        <option value="00:30">00:30</option>
                        <option value="01:00">01:00</option>
                        <option value="01:30">01:30</option>
                        <option value="02:00">02:00</option>
                        <option value="02:30">02:30</option>
                        <option value="03:00">03:00</option>
                        <option value="03:30">03:30</option>
                        <option value="04:00">04:00</option>
                        <option value="04:30">04:30</option>
                        <option value="05:00">05:00</option>
                        <option value="05:30">05:30</option>
                        <option value="06:00">06:00</option>
                        <option value="06:30">06:30</option>
                        <option value="07:00">07:00</option>
                        <option value="07:30">07:30</option>
                        <option value="08:00">08:00</option>
                        <option value="08:30">08:30</option>
                        <option value="09:00">09:00</option>
                        <option value="09:30">09:30</option>
                        <option value="10:00">10:00</option>
                        <option value="10:30">10:30</option>
                        <option value="11:00">11:00</option>
                        <option value="11:30">11:30</option>
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                        <option value="14:30">14:30</option>
                        <option value="15:00">15:00</option>
                        <option value="15:30">15:30</option>
                        <option value="16:00">16:00</option>
                        <option value="16:30">16:30</option>
                        <option value="17:00">17:00</option>
                        <option value="17:30">17:30</option>
                        <option value="18:00">18:00</option>
                        <option value="18:30">18:30</option>
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                        <option value="22:00">22:00</option>
                        <option value="22:30">22:30</option>
                        <option value="23:00">23:00</option>
                        <option value="23:30">23:30</option>
                    </select>
                    <select name="scheduleDayInput" id="scheduleDayInput" onChange={scheduleDayChange} value={state.profileState.buf.scheduleDay}>
                        <option value="0">Понедельник</option>
                        <option value="1">Вторник</option>
                        <option value="2">Среда</option>
                        <option value="3">Четверг</option>
                        <option value="4">Пятница</option>
                        <option value="5">Суббота</option>
                        <option value="6">Воскресенье</option>
                    </select>
                    <button className="sup-btn-circled">+</button>
                </form>
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
        onScheduleAdd: (schedule)=>{
            dispatch({type : 'POPUP_REDACT_ADD_SCHEDULE', payload:schedule})
        },
        onScheduleDayChange: (day)=>{
            dispatch({type : 'POPUP_REDACT_SCHEDULE_DAY_CHANGE', payload:day})
        },
        onScheduleStartTimeChange: (time)=>{
            dispatch({type : 'POPUP_REDACT_SCHEDULE_START_TIME_CHANGE', payload:time})
        },
        onScheduleEndTimeChange: (time)=>{
            dispatch({type : 'POPUP_REDACT_SCHEDULE_END_TIME_CHANGE', payload:time})
        },
        onScheduleDelete: (scheduleId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_SCHEDULE', payload:scheduleId})
        },
        onPhoneAdd: (phone)=>{
            dispatch({type : 'POPUP_REDACT_ADD_PHONE', payload:phone})
        },
        onPhoneDelete: (phoneId)=>{
            dispatch({type : 'POPUP_REDACT_DELETE_PHONE', payload:phoneId})
        },
        onInputMistake:(mistakeStr) => {
            console.log(mistakeStr)
        }
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionBaseInfo)

