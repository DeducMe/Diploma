import React from 'react'
import { connect } from 'react-redux'
import LeafletMap from '../../../leafletMap/LeafletMap'


const RedactPopupSectionBaseInfo = (state, profileState, placeholderData) => {
    const changeUserNameValue = (e) => {
        let input = e.target.value
        state.onUsernameChange(input)
    }

    const changeUserDescriptionValue = (e) => {
        state.onDescriptionChange(e.target.value)
    }

    const saveNewAddress = (e) => {
        state.onSaveNewAddress({
            name:state.LeafletMapData.name,
            lat:state.LeafletMapData.lat,
            lng:state.LeafletMapData.lng
        })
    }

    const deletePhone = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onPhoneDelete(state.placeholderData.phone[e.target.parentElement.dataset.key])
    }

    const phoneInput = (e) =>{
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(state.placeholderData.phone.length > 1){

            }
            else if(state.placeholderData.phone.indexOf(value) === -1){
                state.onPhoneAdd(value)
                e.target.value = ''
            }
        }
    }

    const addPhone = (e) => {
        e.preventDefault()
        state.onPhoneAdd(e.target.phonesInput.value)
    }
    return (
        <section className="popup-redact-section">
            <div className="popup__input-block">
                <div className="input-field underline-anim">
                    <input className="popup__text-input" id="nameInput" name="nameInput" type="text" placeholder=" " onChange={changeUserNameValue} value={state.placeholderData.name}/>
                    <label className="popup__text-label" htmlFor="nameInput">Имя/никнейм</label>
                </div>

                <div className="textarea-field">
                    <p>Описание профиля</p>
                    <textarea className="popup__textarea-input" name="descriptionInput" id="descriptionInput" onChange={changeUserDescriptionValue} value={state.placeholderData.about}></textarea>
                </div>

                <div className="address-input">
                    <LeafletMap address={state.profileState.address}></LeafletMap>
                    <button className="highlighted sup-btn" onClick={saveNewAddress}>Сохранить</button>
                </div>
            </div>

            <div className="list-input-field popup__input-block">
                <p>Телефоны</p>
                {state.placeholderData.phone.map((phone, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{phone}</span>
                            <button className="el-block__delete-el" onClick={deletePhone}>x</button>
                        </div>
                    )
                })}

                <form onSubmit={addPhone}>
                    <input className="popup__text-input" type="text" id="phonesInput" name="phonesInput" placeholder="Нажмите пробел после введения номера..." onKeyDown={phoneInput} maxLength="12"/>
                    <button type="submit" className="sup-btn-circled">+</button>
                </form>
            </div>

        </section>
    )
}

const mapStateToProps = (state) =>{
    return {
        state:state,
        profileState: state.companyProfile,
        userState: state.user,
        placeholderData: state.companyProfile.placeholder,
        LeafletMapData:state.buf.leafletMap.data

    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onUsernameChange: (username)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_USERNAME_CHANGE', payload:username})
        },
        onDescriptionChange: (text)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_DESCRIPTION_CHANGE', payload:text})
        },
        onPhoneAdd: (phone)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_ADD_PHONE', payload:phone})
        },
        onPhoneDelete: (phoneId)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_DELETE_PHONE', payload:phoneId})
        },
        onSaveNewAddress:(address)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_ADDRESS_CHANGE', payload:address})
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionBaseInfo)

