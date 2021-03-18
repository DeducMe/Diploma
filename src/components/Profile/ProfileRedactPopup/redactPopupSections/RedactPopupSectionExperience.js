import React from 'react'
import { connect } from 'react-redux'


const RedactPopupSectionExperience = (state, profileState, onExperienceAdd, onExperienceDelete, onEducationAdd, onEducationDelete) => {
    const experienceAdd = (e) =>{
        e.preventDefault();
        console.log(e.target)
        state.profileState.buf.educationBlocksAmount++
        const newExperience = {
            "position": e.target.positionInput.value,
            "company": e.target.companyInput.value,
            "type":e.target.experienceTypeInput.value,
            "start_year":e.target.experienceStartDateInput.value,
            "end_year":e.target.experienceEndDateInput.value
        }
        state.onExperienceAdd(newExperience)

    }

    const educationAdd = (e) =>{
        e.preventDefault();
        state.profileState.buf.educationBlocksAmount++
        const newEducation = {
            "profession": e.target.professionInput.value,
            "university": e.target.universityInput.value,
            "type":e.target.educationTypeInput.value,
            "start_year":e.target.educationStartDateInput.value,
            "end_year":e.target.educationEndDateInput.value
        }
        state.onEducationAdd(newEducation)
    }

    const educationDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onEducationDelete(state.profileState.education[e.target.parentElement.dataset.key])
    }

    const experienceDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        state.onExperienceDelete(state.profileState.experience[e.target.parentElement.dataset.key])   
    }

    return (
        <section className="popup-redact-section">
            <form className="popup__education-input popup__input-block" onSubmit={educationAdd}>
            {console.log(state)}
            {state.profileState.education.map((el, index)=>{
                    return (
                        <div key={index} className="list-input-field__el-block" data-key={index}>
                            <span>{el.profession + ' - ' + el.university}</span>
                            <button className="el-block__delete-el" onClick={educationDelete}>x</button>
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

        <form className="popup__experience-input popup__input-block" onSubmit={experienceAdd}>
            {state.profileState.experience.map((el, index)=>{
                return (
                    <div key={index} className="list-input-field__el-block" data-key={index}>
                        <span>{el.position + ' - ' + el.company}</span>
                        <button className="el-block__delete-el" onClick={experienceDelete}>x</button>
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
        </section>
    )
}

const mapStateToProps = (state) =>{
    return {
        state:state,
        profileState: state.profile,
        userState: state.user,
        placeholderData: state.profile.placeholder,
        cropperData:state.profile.buf.cropper
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RedactPopupSectionExperience)
