import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addVacancy, redactVacancy, getUserVacancies, deleteVacancy } from '../../../../actions/serverConnections'
import plusIcon from '../../../../img/plusIcon.svg'
import closeIcon from '../../../../img/close.svg'
import deleteIcon from '../../../../img/trash.svg'
import editIcon from '../../../../img/edit.svg'
import industries from '../../../../jsonFiles/industries.json'
import LeafletMap from '../../../leafletMap/LeafletMap'

import {checkStringInput, checkIntInput, getWorkTypeValues} from '../../../../scripts/commonScripts.js'


class VacancyRedactPopup extends Component {
    changeVacancyName = (e) =>{
        const check = checkStringInput(e.target.value, 35, 0);

        check === "pass" ? 
        this.props.onVacancyNameChange(e.target.value, this.props.vacancyIndex) : 
        (this.props.onInputMistake(check, e.target));
    }

    changeGradeValue = (e) =>{
        this.props.onGradeValueChange(e.target.value, this.props.vacancyIndex)
    }

    changeSalary = (e) =>{
        const check = checkIntInput(e.target.value, 9999999, null);
        check === "pass" ? 
        this.props.onSalaryValueChange(parseInt(e.target.value), this.props.vacancyIndex):
        (this.props.onInputMistake(check, e.target))

    }

    changeIndustryValue = (e) =>{
        this.props.onIndustryValueChange(e.target.value, this.props.vacancyIndex)
    }

    workTypeDelete = (e) =>{
        e.preventDefault()
        this.props.onWorkTypeDelete(this.props.vacancyWorkType[e.target.parentElement.dataset.key], this.props.vacancyIndex)
    }

    workTypeInput = (e) =>{
        const value = e.target.value
        console.log(value)
        e.preventDefault()
        if(this.props.vacancyWorkType.length > 5){

        }
        else if(this.props.vacancyWorkType.indexOf(value) === -1){
            this.props.onWorkTypeAdd(value, this.props.vacancyIndex)
        }
    }

    pointInput = (e) =>{
        console.log(e)
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(this.props.vacancyPoints.length > 10){

            }
            else if(this.props.vacancyPoints.indexOf(value) === -1){
                this.props.onPointAdd(value, this.props.vacancyIndex)
                e.target.value = ''
            }
        }
    }

    pointDelete = (e) =>{
        e.preventDefault()
        this.props.onPointDelete(this.props.vacancyPoints[e.target.parentElement.dataset.key], this.props.vacancyIndex)
    }

    redactAboutBody = (e) =>{
        e.preventDefault()
        this.props.onRedactAboutBody({
            title:e.target.title.value,
            subtitle:e.target.subtitle.value,
            points:this.props.vacancyPoints
        }, this.props.vacancyIndex)
    }

    addNewAboutBody = (e) =>{
        e.preventDefault()
        this.props.onAddAboutBody({
            title:'Наши/ваши требования/предложения',
            subtitle:'',
            points:[]
        }, this.props.vacancyIndex)
    }

    deleteAboutBody = (e) =>{
        e.preventDefault()
        this.props.onAboutBodyDelete(e.target.closest('.body-block').dataset.key, this.props.vacancyIndex)
    }

    activateAboutBody = (e) =>{
        e.preventDefault()
        this.props.onAboutBodyActivate(e.target.closest('.body-block').dataset.key, this.props.vacancyIndex)
    }

    deactivateAboutBody = (e) =>{
        e.preventDefault()
        this.props.onAboutBodyDeactivate(e.target.closest('.body-block').dataset.key, this.props.vacancyIndex)
    }

    changeLeadingValue = (e) =>{
        this.props.onLeadingValueChange(e.target.value, this.props.vacancyIndex)
    }

    changeTrailingValue = (e) =>{
        this.props.onTrailingValueChange(e.target.value, this.props.vacancyIndex)
    }

    changeExperienceValue = (e) => {
        this.props.onExperienceValueChange(e.target.value, this.props.vacancyIndex)
    }

    changeAddressValue = () => {
        this.props.onAddressValueChange({
            name:this.props.LeafletMapData.name,
            lat:this.props.LeafletMapData.lat,
            lng:this.props.LeafletMapData.lng
        }, this.props.vacancyIndex)
    }

    saveVacancyFormChanges = (e) => {
        e.preventDefault();
        let data = {
            "user_id": this.props.userData.id,
            "vacancy_name": this.props.vacancyPlaceholder.vacancy_name,
            "industry": this.props.vacancyPlaceholder.industry || 'Не указано',
            "grade": this.props.vacancyPlaceholder.grade,
            "salary": this.props.vacancyPlaceholder.salary === null ? -1 : this.props.vacancyPlaceholder.salary,
            "work_type": this.props.vacancyPlaceholder.work_type,
            "experience": this.props.vacancyPlaceholder.experience,
            "address": this.props.vacancyPlaceholder.address,
            "tags": this.props.vacancyPlaceholder.tags,
            "leading":this.props.vacancyPlaceholder.leading,
            "trailing":this.props.vacancyPlaceholder.trailing,
            "body":this.props.vacancyPlaceholder.body,
            "bg_header_color":this.props.vacancyPlaceholder.bg_header_color
        }
        if (this.props.vacancyData.vacancies.length === this.props.vacancyIndex || this.props.vacancyData.vacancies.length === 0){
            this.props.onSaveVacancyFormChanges(data, -1, this.props.userData.id, this.props.vacancyPlaceholder.vacancy_name)
        }
        else this.props.onSaveVacancyFormChanges(data, this.props.vacancyIndex, this.props.userData.id, this.props.vacancyPlaceholder.id)

        console.log(data)
    }

    tagDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onTagDelete(this.props.vacancyPlaceholder.tags[e.target.parentElement.dataset.key], this.props.vacancyIndex)
    }

    tagInput = (e) =>{
        console.log(e)
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(this.props.vacancyPlaceholder.tags.length > 10){

            }
            else if(this.props.vacancyTags.indexOf(value) === -1){
                this.props.onTagAdd(value, this.props.vacancyIndex)
                e.target.value = ''
            }
        }
    }

    closeRedactPopup = (e) =>{
        e.preventDefault()
        this.props.onPopupRedactVacancyDeactivate(this.props.vacancyIndex)
    }

    deleteVacancy = (e) =>{
        e.preventDefault()
        this.props.onPopupRedactVacancyDelete(this.props.vacancyData.vacancies[this.props.vacancyIndex].id, this.props.userData.id)
    }

    changeVacancyHeaderColor = (e) =>{

        e.preventDefault()
        this.props.onVacancyHeaderColorChange(e.target.value, this.props.vacancyIndex)
    }

    render() {
        return (
            <div className={"rounded resume-redact-block " + this.props.vacancyState} style={this.props.addStyle}>
                <div className={"resume__header white top-rounded " + this.props.vacancyPlaceholder.bg_header_color}>
                    <div className="resume__header-top">
                        <input required type="text" className="resume__header__name bold f-large white" placeholder="Название профессии" onChange={this.changeVacancyName.bind(this)} value={this.props.vacancyPlaceholder.vacancy_name}/>
                        <p className="resume__header__salary"><input required type="number" className="resume__header__salary-input bold f-pre white" placeholder="Желаемая зарплата" onChange={this.changeSalary.bind(this)} value={this.props.vacancyPlaceholder.salary === 0 || this.props.vacancyPlaceholder.salary === -1 || this.props.vacancyPlaceholder.salary === null ? '' :this.props.vacancyPlaceholder.salary }/><span className="bold f-pre"> руб.</span></p>
                    </div>
                    <div className="resume__header-bottom">
                        <p className="resume__header__grade">
                            <select required className="white resume__header__grade-input bg-transparent" id={"resume-gradeInput-"+this.props.index} name={"resume-gradeInput-"+this.props.index} onChange={this.changeGradeValue.bind(this)} value={this.props.vacancyPlaceholder.grade}>
                                <option value="internship">Стажер</option>
                                <option value="junior">Начинающий специалист</option>
                                <option value="middle">Специалист</option>
                                <option value="senior">Главный специалист</option>
                                <option value="director">Управляющий отдела</option>
                                <option value="senior-director">Генеральный директор</option>
                            </select>
                        </p>
                        <ul className="resume__header-color">
                            <button className={"resume__header-color-el bg-light-black " + (this.props.vacancyPlaceholder.bg_header_color === 'bg-light-black' ? ('selected'):(''))} onClick={this.changeVacancyHeaderColor} value="bg-light-black"/>
                            <button className={"resume__header-color-el bg-blue-gray " + (this.props.vacancyPlaceholder.bg_header_color === 'bg-blue-gray' ? ('selected'):(''))} onClick={this.changeVacancyHeaderColor} value="bg-blue-gray"/>
                            <button className={"resume__header-color-el bg-blue-black " + (this.props.vacancyPlaceholder.bg_header_color === 'bg-blue-black' ? ('selected'):(''))} onClick={this.changeVacancyHeaderColor} value="bg-blue-black"/>
                            <button className={"resume__header-color-el bg-violet-gray " + (this.props.vacancyPlaceholder.bg_header_color === 'bg-violet-gray' ? ('selected'):(''))} onClick={this.changeVacancyHeaderColor} value="bg-violet-gray"/>
                            <button className={"resume__header-color-el bg-violet-black " + (this.props.vacancyPlaceholder.bg_header_color === 'bg-violet-black' ? ('selected'):(''))} onClick={this.changeVacancyHeaderColor} value="bg-violet-black"/>
                        </ul>
                    </div>
                </div>

                <button className="resume-close-btn"  onClick={this.closeRedactPopup}>
                    <img src={closeIcon} alt="closeIcon"/>
                </button>
                {this.props.vacancyIndex !== this.props.vacancyData.vacancies.length ?(
                    <button className="resume-delete-btn"  onClick={this.deleteVacancy}>
                        <img src={deleteIcon} alt="deleteIcon"/>
                    </button>
                ):('')}
                

                <div className="resume__main-info rounded">
                    <p className="resume__industry f-pre">
                        <span>Отрасль: </span>
                        <select required id={"resume-industryInput-"+this.props.index} name={"resume-industryInput-"+this.props.index} onChange={this.changeIndustryValue.bind(this)} value={this.props.vacancyPlaceholder.industry}>
                            {industries.map((item)=>{
                                return <option value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </p>
                    <div className="resume__address">
                        <LeafletMap address={this.props.vacancyPlaceholder.address}></LeafletMap>
                        <div className="resume__address__data-block">
                            <button className="highlighted sup-btn" onClick={this.changeAddressValue}>Сохранить</button>
                            <span>{this.props.vacancyPlaceholder.address.name}</span>
                        </div>
                    </div>
                    
                    <div className="resume__work-type-block input-list">
                        <p className="input-label">Типы работ:</p>

                        <ul className="resume__work-type-list">
                            {this.props.vacancyWorkType.map((value, index)=>{
                                return (
                                    <li key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{getWorkTypeValues(value)}</span>
                                        <button className="el-block__delete-el" onClick={this.workTypeDelete}>x</button>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="resume__work-type input-list">
                            Выберите, чтобы добавить...
                            <select className="select-input" name="workTypeInput" id="workTypeInput" onChange={this.workTypeInput.bind(this)}>
                                <option value="part-day">неполный день</option>
                                <option value="full-day">полный день</option>
                                <option value="part-time">частичная занятность</option>
                                <option value="full-time">полная занятность</option>
                                <option value="volunteer">волонтерство</option>
                                <option value="one-time-job">разовое задание</option>
                                <option value="flexible-schedule">гибкий график</option>
                                <option value="shift-schedule">сменный график</option>
                                <option value="shift-method">вахтовый метод</option>
                                <option value="remote">удаленная работа</option>
                            </select>
                        </div>
                        
                    </div>

                    <div className="textarea-field">
                        <p>Вступление</p>
                        <textarea className="popup__textarea-input" name="leadingInput" id="leadingInput" onChange={this.changeLeadingValue.bind(this)} value={this.props.vacancyPlaceholder.leading}></textarea>
                    </div>

                    <div className="vacancy__about">    
                        {this.props.aboutBodies.map((item, index) => {
                            if (this.props.vacancyBuf.activeBodyId === index.toString())
                            return(
                            <form className="body-block rounded" key={index} data-key={index} onSubmit={this.redactAboutBody}>
                                <div className="about__body-inputs f-pre">
                                    <div className="about__body-inputs__header">
                                        <input className="highlighted" type="text" placeholder="Заголовок" name="title" id="title"/>
                                        <div className="body-controls">
                                            <button className="body-redact-btn" onClick={this.deactivateAboutBody}>
                                                <img src={closeIcon} alt="closeIcon"/>
                                            </button>

                                            <button className="body-delete-btn" onClick={this.deleteAboutBody}>
                                                <img src={deleteIcon} alt="deleteIcon"/>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <input className="semi" type="text" placeholder="Подзаголовок" name="subtitle" id="subtitle"/>

                                    <div className="about__points-block input-list">
                                        {this.props.vacancyPoints.length !== 0 ?
                                        <ul className="about__points-list rounded">
                                            {this.props.vacancyPoints.map((point, index)=>{
                                                return (
                                                    <li key={index} className="list-input-field__el-block" data-key={index}>
                                                        <span>{point}</span>
                                                        <button className="el-block__delete-el" onClick={this.pointDelete}>x</button>
                                                    </li>
                                                )
                                            })}
                                        </ul> : ''}
                                        
                                        <p className="about__point input-list">
                                            <input type="text" className="input-list__input-block" placeholder="Элемент списка" onKeyDown={this.pointInput}/>
                                        </p>
                                    </div>

                                    <input className="form-submit-btn f-large rounded" type="submit" value="Сохранить изменения"></input>
                                </div>
                                
                            </form>)
                            else return (
                                <div className="body-block rounded body-block-cut" key={index} data-key={index}>
                                    <p className="highlighted">{item.title}</p>
                                    <div className="body-controls">
                                        <button className="body-redact-btn" onClick={this.activateAboutBody}>
                                            <img src={editIcon} alt="editIcon"/>
                                        </button>

                                        <button className="body-delete-btn" onClick={this.deleteAboutBody}>
                                            <img src={deleteIcon} alt="deleteIcon"/>
                                        </button>
                                    </div>
                                </div>)
                        })}
                            
                        <div className="vacancy__about__add-block">
                            <p>Добавить блок</p>

                            <button className="body-add-btn" onClick={this.addNewAboutBody}>
                                <img src={plusIcon} alt="plusIcon"/>
                            </button>
                        </div>
                    </div>

                    <div className="textarea-field">
                        <p>Завершение</p>
                        <textarea className="popup__textarea-input" name="trailingInput" id="trailingInput" onChange={this.changeTrailingValue.bind(this)} value={this.props.vacancyPlaceholder.trailing}></textarea>
                    </div>

                    <div className="resume__tags-block input-list">
                        <ul className="resume__tags-list">
                            {this.props.vacancyTags.map((tag, index)=>{
                                return (
                                    <li key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{tag}</span>
                                        <button className="el-block__delete-el" onClick={this.tagDelete}>x</button>
                                    </li>
                                )
                            })}
                        </ul>
                        <input className="resume__tags-input input-list__input-block" type="text" onKeyDown={this.tagInput.bind(this)} placeholder="Введите тег и нажмите пробел..."/>
                    </div>
                    
                    <button className="form-submit-btn f-large rounded bold" onClick={this.saveVacancyFormChanges}>Сохранить изменения</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let vacancyPlaceholder
    if (ownProps.index === state.vacancy.vacancies.length) {vacancyPlaceholder = state.vacancy.newVacancy}
    else {vacancyPlaceholder = state.vacancy.placeholder[ownProps.index]}
    return {
        userData: state.user.user,
        vacancyData: state.vacancy,
        vacancyPlaceholder: vacancyPlaceholder,
        vacancyTags: vacancyPlaceholder.tags,
        vacancyWorkType:vacancyPlaceholder.work_type,
        vacancyState: vacancyPlaceholder.state,
        vacancyPoints: state.vacancy.buf.bufPoints,
        vacancyIndex: ownProps.index,
        vacancyBuf:state.vacancy.buf,
        aboutBodies:vacancyPlaceholder.body,
        LeafletMapData:state.buf.leafletMap.data
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onAddVacancy: (vacancyData) => {
            dispatch(addVacancy(vacancyData))
            .then((data)=>{
                if (data.newVacancyId !== null && data.newVacancyId!=='404'){
                }
            })
        },
        onPopupRedactVacancyDeactivate: (index) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_DEACTIVATE', payload:index})
        },
        onPopupRedactVacancyDelete: (index, userId) => {
            dispatch(deleteVacancy(index))
            .then(data => {
                dispatch(getUserVacancies(userId))
                .then((data)=>{
                    if (data.data !== null && data.data!=='404'){
                        data.data.map(el=>el.state = '')
                        dispatch({type : 'INITIALIZE_VACANCY_PLACEHOLDER', payload:data.data}) 
                    }
                })
            })
        },
        onVacancyHeaderColorChange: (color, vacancyIndex) =>{
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_COLOR', payload:{'color': color, 'index': vacancyIndex}})
        },
        onTagAdd: (tag, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_ADD_TAG', payload:{'tag': tag, 'index': vacancyIndex}})
        },
        onTagDelete: (tagId, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_DELETE_TAG', payload:{'tagId': tagId, 'index': vacancyIndex}})
        },
        onWorkTypeAdd: (workType, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_ADD_WORK_TYPE', payload:{'workType': workType, 'index': vacancyIndex}})
        },
        onWorkTypeDelete: (workTypeId, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_DELETE_WORK_TYPE', payload:{'workTypeId': workTypeId, 'index': vacancyIndex}})
        },
        onVacancyNameChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_VACANCY_NAME', payload:{'text': text, 'index': vacancyIndex}})
        },
        onGradeValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_GRADE_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onIndustryValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_INDUSTRY_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onAddressValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_ADDRESS_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onLeadingValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_LEADING_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onTrailingValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_TRAILING_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onPointAdd: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_ADD_POINT', payload:{'text': text, 'index': vacancyIndex}})
        },
        onPointDelete: (pointId, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_DELETE_POINT', payload:{'pointId': pointId, 'index': vacancyIndex}})
        },
        onSalaryValueChange: (text, vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_CHANGE_SALARY_VALUE', payload:{'text': text, 'index': vacancyIndex}})
        },
        onSaveVacancyFormChanges:(data, vacancyIndex, userId, vacancyId) => {
            dispatch(vacancyIndex===-1?(addVacancy(data)):(redactVacancy(data, vacancyId)))
            .then(data => dispatch({type : 'POPUP_REDACT_VACANCY_DEACTIVATE', payload:vacancyIndex}))
            .then(data => {
                dispatch(getUserVacancies(userId))
                .then((data)=>{
                    if (data.data !== null && data.data!=='404'){
                        data.data.map(el=>el.state = '')
                        dispatch({type : 'INITIALIZE_VACANCY_PLACEHOLDER', payload:data.data}) 
                    }
                })
            })
        },
        onInputMistake:(mistakeStr, el) => {
            console.log(mistakeStr)
        },

        onAddAboutBody:(body, vacancyIndex)=>{
            dispatch({type : 'POPUP_REDACT_VACANCY_ADD_ABOUT_BODY', payload:{'body': body, 'index': vacancyIndex}})
        },
        onRedactAboutBody:(body, vacancyIndex)=>{
            dispatch({type : 'POPUP_REDACT_VACANCY_REDACT_ABOUT_BODY', payload:{'body': body, 'index': vacancyIndex}})
        },
        onAboutBodyDelete:(bodyId, vacancyIndex)=>{
            dispatch({type : 'POPUP_REDACT_VACANCY_DELETE_ABOUT_BODY', payload:{'bodyId': bodyId, 'index': vacancyIndex}})
        },
        onAboutBodyActivate:(bodyId, vacancyIndex)=>{
            dispatch({type : 'POPUP_REDACT_VACANCY_ACTIVATE_ABOUT_BODY', payload:{'bodyId': bodyId, 'index': vacancyIndex}})
        },
        onAboutBodyDeactivate:(bodyId, vacancyIndex)=>{
            dispatch({type : 'POPUP_REDACT_VACANCY_DEACTIVATE_ABOUT_BODY', payload:{'bodyId': bodyId, 'index': vacancyIndex}})
        },
    }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(VacancyRedactPopup);
