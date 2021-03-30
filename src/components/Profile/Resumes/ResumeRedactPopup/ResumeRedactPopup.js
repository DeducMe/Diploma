import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addResume, redactResume, getUserResumes, deleteResume } from '../../../../actions/serverConnections'
import closeIcon from '../../../../img/close.svg'
import deleteIcon from '../../../../img/trash.svg'
import {checkStringInput, checkIntInput} from '../../../../scripts/commonScripts.js'


class ResumeRedactPopup extends Component {
    changeVacancyName = (e) =>{
        const check = checkStringInput(e.target.value, 35, 0, /^[a-zA-Z]*^$/);

        check === "pass" ? 
        this.props.onVacancyNameChange(e.target.value, this.props.resumeIndex) : 
        (this.props.onInputMistake(check, e.target));
    }

    changeGradeValue = (e) =>{
        this.props.onGradeValueChange(e.target.value, this.props.resumeIndex)
    }

    changeSalary = (e) =>{
        console.log(e.target.value)
        if (e.target.value !== ''){
            const check = checkIntInput(e.target.value, 9999999, null);
            check === "pass" ? 
            this.props.onSalaryValueChange(parseInt(e.target.value), this.props.resumeIndex):
            (this.props.onInputMistake(check, e.target))
        }
        else this.props.onSalaryValueChange(0, this.props.resumeIndex)
    }

    changeIndustryValue = (e) =>{
        this.props.onIndustryValueChange(e.target.value, this.props.resumeIndex)
    }

    workTypeDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onWorkTypeDelete(this.props.resumeWorkType[e.target.parentElement.dataset.key], this.props.resumeIndex)
    }

    workTypeInput = (e) =>{
        const value = e.target.value
        e.preventDefault()
        if(this.props.resumeWorkType.length > 5){

        }
        else if(this.props.resumeWorkType.indexOf(value) === -1){
            this.props.onWorkTypeAdd(value, this.props.resumeIndex)
            e.target.value = ''
        }
    }
    

    changeAboutValue = (e) =>{
        this.props.onAboutValueChange(e.target.value, this.props.resumeIndex)
    }

    saveResumeFormChanges = (e) => {
        e.preventDefault();

        let data = {
            "id":this.props.cvPlaceholder.id,
            "user_id": this.props.userData.id,
            "vacancy_name": this.props.resumePlaceholder.vacancy_name,
            "industry": this.props.resumePlaceholder.industry,
            "grade": this.props.resumePlaceholder.grade,
            "salary": this.props.resumePlaceholder.salary,
            "work_type": this.props.resumePlaceholder.work_type,
            "tags": this.props.resumePlaceholder.tags,
            "about": this.props.resumePlaceholder.about,
            "bg_header_color": this.props.resumePlaceholder.bg_header_color,
            "portfolio": [],
        }
        if (this.props.resumeData.cvs.length === this.props.resumeIndex || this.props.resumeData.cvs.length === 0){
            this.props.onSaveResumeFormChanges(data, -1, this.props.userData.id, this.props.resumePlaceholder.vacancy_name)
        }
        else this.props.onSaveResumeFormChanges(data, this.props.resumeIndex, this.props.userData.id, this.props.cvPlaceholder.id)

        console.log(data)
    }

    tagDelete = (e) =>{
        e.preventDefault()
        console.log(e.target.parentElement.dataset.key)
        this.props.onTagDelete(this.props.resumePlaceholder.tags[e.target.parentElement.dataset.key], this.props.resumeIndex)
    }

    tagInput = (e) =>{
        console.log(e)
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(this.props.resumePlaceholder.tags.length > 10){

            }
            else if(this.props.resumeTags.indexOf(value) === -1){
                this.props.onTagAdd(value, this.props.resumeIndex)
                e.target.value = ''
            }
        }
    }

    closeRedactPopup = (e) =>{
        e.preventDefault()
        this.props.onPopupRedactResumeDeactivate(this.props.resumeIndex)
    }

    deleteResume = (e) =>{
        e.preventDefault()
        this.props.onPopupRedactResumeDelete(this.props.resumeData.cvs[this.props.resumeIndex].id, this.props.userData.id)
    }

    changeResumeHeaderColor = (e) =>{

        e.preventDefault()
        this.props.onResumeHeaderColorChange(e.target.value, this.props.resumeIndex)
    }

    render() {
        return (
            <form className={"rounded resume-redact-block "+this.props.resumeState} style={this.props.addStyle}>
                <div className={"resume__header white top-rounded "+this.props.cvPlaceholder.bg_header_color}>
                    <div className="resume__header-top">
                        <input required type="text" className="resume__header__name bold f-large white" placeholder="Название профессии" onChange={this.changeVacancyName.bind(this)} value={this.props.resumePlaceholder.vacancy_name}/>
                        <p className="resume__header__salary"><input required type="number" className="resume__header__salary-input bold f-medium white" placeholder="Желаемая зарплата" onChange={this.changeSalary.bind(this)} value={this.props.resumePlaceholder.salary}/><span className="bold f-medium"> руб.</span></p>
                    </div>
                    <div className="resume__header-bottom">
                        <p className="resume__header__grade">
                            <select required className="white resume__header__grade-input" id={"resume-gradeInput-"+this.props.index} name={"resume-gradeInput-"+this.props.index} onChange={this.changeGradeValue.bind(this)}>
                                <option value="internship">Стажер</option>
                                <option value="junior">Начинающий специалист</option>
                                <option value="middle">Специалист</option>
                                <option value="senior">Главный специалист</option>
                                <option value="director">Управляющий отдела</option>
                                <option value="senior-director">Генеральный директор</option>
                            </select>
                        </p>
                        <ul className="resume__header-color">
                            <button className={"resume__header-color-el bg-light-black " + (this.props.cvPlaceholder.bg_header_color === 'bg-light-black' ? ('selected'):(''))} onClick={this.changeResumeHeaderColor} value="bg-light-black"/>
                            <button className={"resume__header-color-el bg-blue-gray " + (this.props.cvPlaceholder.bg_header_color === 'bg-blue-gray' ? ('selected'):(''))} onClick={this.changeResumeHeaderColor} value="bg-blue-gray"/>
                            <button className={"resume__header-color-el bg-blue-black " + (this.props.cvPlaceholder.bg_header_color === 'bg-blue-black' ? ('selected'):(''))} onClick={this.changeResumeHeaderColor} value="bg-blue-black"/>
                            <button className={"resume__header-color-el bg-violet-gray " + (this.props.cvPlaceholder.bg_header_color === 'bg-violet-gray' ? ('selected'):(''))} onClick={this.changeResumeHeaderColor} value="bg-violet-gray"/>
                            <button className={"resume__header-color-el bg-violet-black " + (this.props.cvPlaceholder.bg_header_color === 'bg-violet-black' ? ('selected'):(''))} onClick={this.changeResumeHeaderColor} value="bg-violet-black"/>
                        </ul>
                    </div>
                </div>

                <button className="resume-close-btn"  onClick={this.closeRedactPopup}>
                    <img src={closeIcon} alt="closeIcon"/>
                </button>
                {this.props.resumeIndex !== this.props.resumeData.cvs.length ?(
                    <button className="resume-delete-btn"  onClick={this.deleteResume}>
                        <img src={deleteIcon} alt="deleteIcon"/>
                    </button>
                ):('')}
                

                <div className="resume__main-info rounded">
                    <p className="resume__industry f-pre"><input type="text" placeholder="Отрасль"  onChange={this.changeIndustryValue.bind(this)} value={this.props.resumePlaceholder.industry}/></p>
                    
                    <div className="resume__work-type-block input-list">
                        <p className="input-label">Типы работ:</p>

                        <ul className="resume__work-type-list">
                            {this.props.resumeWorkType.map((tag, index)=>{
                                return (
                                    <li key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{tag}</span>
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
                                <option value="part-time">полная занятность</option>
                                <option value="full-time">волонтерство</option>
                                <option value="one-time-job">разовое задание</option>
                                <option value="flexible-schedule">гибкий график</option>
                                <option value="shift-schedule">сменный график</option>
                                <option value="shift-method">вахтовый метод</option>
                                <option value="remote">удаленная работа</option>
                            </select>
                        </div>
                    </div>

                    <p className="resume__about"><textarea className="resume__about-input" name="" id="" placeholder="Описание резюме" onChange={this.changeAboutValue.bind(this)} value={this.props.resumePlaceholder.about}></textarea></p>

                    {/* <ul className="resume__portfolio">
                        <li className="resume__portfolio-el">
                            <a className="resume__portfolio-el__link" href="#">
                                <img src="" alt=""/>
                            </a>
                        </li>

                        <li className="resume__portfolio-el">
                            <a className="resume__portfolio-el__link" href="#">
                                <img src="" alt=""/>
                            </a>
                        </li>
                    </ul> */}
                    <div className="resume__tags-block input-list">
                        <ul className="resume__tags-list">
                            {this.props.resumeTags.map((tag, index)=>{
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
                    
                    <input type="submit" className="form-submit-btn f-large rounded bold" onClick={this.saveResumeFormChanges} value="Сохранить изменения"/>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let cvPlaceholder
    if (ownProps.index === state.cvs.cvs.length) {cvPlaceholder = state.cvs.newCv}
    else {cvPlaceholder = state.cvs.placeholder[ownProps.index]}
    return {
        userData: state.user.user,
        resumeData: state.cvs,
        resumePlaceholder: cvPlaceholder,
        resumeTags: cvPlaceholder.tags,
        resumeWorkType:cvPlaceholder.work_type,
        resumeState: cvPlaceholder.state,
        resumeIndex: ownProps.index,
        cvPlaceholder:cvPlaceholder
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onAddResume: (resumeData) => {
            dispatch(addResume(resumeData))
            .then((data)=>{
                if (data.newCvId !== null && data.newCvId!=='404'){
                }
            })
        },
        onPopupRedactResumeDeactivate: (index) => {
            dispatch({type : 'POPUP_REDACT_RESUME_DEACTIVATE', payload:index})
        },
        onPopupRedactResumeDelete: (index, userId) => {
            dispatch(deleteResume(index))
            .then(data => {
                dispatch(getUserResumes(userId))
                .then((data)=>{
                    if (data.data !== null && data.data!=='404'){
                        data.data.map(el=>el.state = '')
                        dispatch({type : 'INITIALIZE_RESUME_PLACEHOLDER', payload:data.data}) 
                    }
                })
            })
        },
        onResumeHeaderColorChange: (color, resumeIndex) =>{
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_COLOR', payload:{'color': color, 'index': resumeIndex}})
        },
        onTagAdd: (tag, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_ADD_TAG', payload:{'tag': tag, 'index': resumeIndex}})
        },
        onTagDelete: (tagId, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_DELETE_TAG', payload:{'tagId': tagId, 'index': resumeIndex}})
        },
        onWorkTypeAdd: (workType, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_ADD_WORK_TYPE', payload:{'workType': workType, 'index': resumeIndex}})
        },
        onWorkTypeDelete: (workTypeId, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_DELETE_WORK_TYPE', payload:{'workTypeId': workTypeId, 'index': resumeIndex}})
        },
        onVacancyNameChange: (text, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_VACANCY_NAME', payload:{'text': text, 'index': resumeIndex}})
        },
        onGradeValueChange: (text, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_GRADE_VALUE', payload:{'text': text, 'index': resumeIndex}})
        },
        onIndustryValueChange: (text, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_INDUSTRY_VALUE', payload:{'text': text, 'index': resumeIndex}})
        },
        onAboutValueChange: (text, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_ABOUT_VALUE', payload:{'text': text, 'index': resumeIndex}})
        },
        onSalaryValueChange: (text, resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_CHANGE_SALARY_VALUE', payload:{'text': text, 'index': resumeIndex}})
        },
        onSaveResumeFormChanges:(data, resumeIndex, userId, resumeId) => {
            dispatch(resumeIndex===-1?(addResume(data)):(redactResume(data, resumeId)))
            .then(data => dispatch({type : 'POPUP_REDACT_RESUME_DEACTIVATE', payload:resumeIndex}))
            .then(data => {
                dispatch(getUserResumes(userId))
                .then((data)=>{
                    if (data.data !== null && data.data!=='404'){
                        data.data.map(el=>el.state = '')
                        dispatch({type : 'INITIALIZE_RESUME_PLACEHOLDER', payload:data.data}) 
                    }
                })
            })
        },
        onInputMistake:(mistakeStr, el) => {
            console.log(mistakeStr)
        }
    }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(ResumeRedactPopup);
