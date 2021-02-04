import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addResume, redactResume, getUserResumes } from '../../../../actions/serverConnections'
import closeIcon from '../../../../img/close.svg'


class ResumeRedactPopup extends Component {
    changeVacancyName = (e) =>{
        this.props.onVacancyNameChange(e.target.value, this.props.resumeIndex)
    }

    changeGradeValue = (e) =>{
        this.props.onGradeValueChange(e.target.value, this.props.resumeIndex)
    }

    changeSalary = (e) =>{
        this.props.onSalaryValueChange(parseInt(e.target.value), this.props.resumeIndex)
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
        const value = e.target.value.split(' ').join('')
        if (e.keyCode === 9 || e.keyCode === 32){
            e.preventDefault()
            if(this.props.resumeWorkType.length > 3){

            }
            else if(this.props.resumeWorkType.indexOf(value) === -1){
                this.props.onWorkTypeAdd(value, this.props.resumeIndex)
                e.target.value = ''
            }
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
            "bg_header_color": "",
            "portfolio": [],
        }
        if (this.props.resumeData.cvs.length === this.props.resumeIndex || this.props.resumeData.cvs.length === 0){
            this.props.onSaveResumeFormChanges(data, -1, this.props.userData.id, this.props.resumePlaceholder.vacancy_name)
        }
        else this.props.onSaveResumeFormChanges(data, this.props.resumeIndex, this.props.userData.id, this.props.cvPlaceholder.id)
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

    closeRedactPopup = (index) =>{
        this.props.onPopupRedactResumeDeactivate(this.props.resumeIndex)
    }

    render() {
        return (
            <div className={"rounded resume-redact-block "+this.props.resumeState} style={this.props.addStyle}>
                <div className="resume__header white top-rounded">
                    <div className="resume__header-top">
                        <input type="text" className="bold f-large white" placeholder="Название профессии" onChange={this.changeVacancyName.bind(this)} value={this.props.resumePlaceholder.vacancy_name}/>
                        <p><input type="number" className="resume__header__salary-input bold f-medium white" placeholder="Желаемая зарплата" onChange={this.changeSalary.bind(this)} value={this.props.resumePlaceholder.salary}/><span className="bold f-medium"> руб.</span></p>
                    </div>
                    <div className="resume__header-bottom">
                        <p><input type="text" className="white" id={"resume-gradeInput-"+this.props.index} name={"resume-gradeInput-"+this.props.index} placeholder="Уровень знаний" onChange={this.changeGradeValue.bind(this)} value={this.props.resumePlaceholder.grade}/></p>
                        <p className="resume__publication-date sup">{this.props.resumePlaceholder.pub_date}</p>
                    </div>
                </div>

                <button className="resume-delete-btn"  onClick={this.closeRedactPopup}>
                    <img src={closeIcon} alt="closeIcon"/>
                </button>

                <div className="resume__main-info rounded">
                    <p className="resume__industry f-pre"><input type="text" placeholder="Отрасль"  onChange={this.changeIndustryValue.bind(this)} value={this.props.resumePlaceholder.industry}/></p>
                    
                    <div className="resume__tags-block input-list">
                        <ul className="resume__tags-list">
                            {this.props.resumeWorkType.map((tag, index)=>{
                                return (
                                    <li key={index} className="list-input-field__el-block" data-key={index}>
                                        <span>{tag}</span>
                                        <button className="el-block__delete-el" onClick={this.workTypeDelete}>x</button>
                                    </li>
                                )
                            })}
                        </ul>
                        <p className="resume__work-type input-list"><input type="text" className="input-list__input-block" placeholder="Тип работы" onKeyDown={this.workTypeInput}/></p>
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
                    
                    <button className="form-submit-btn f-large rounded bold" onClick={this.saveResumeFormChanges}>Сохранить изменения</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let cvPlaceholder
    if (ownProps.index === state.cvs.cvs.length) {cvPlaceholder = state.cvs.newCv}
    else {cvPlaceholder = state.cvs.placeholder[ownProps.index]}
    console.log(ownProps.index)
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
        onSaveResumeFormChanges:(data, resumeIndex, userId, resumeId)=>{
            dispatch(resumeIndex===-1?(addResume(data)):(redactResume(data, resumeId, userId)))
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
            
        }
    }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(ResumeRedactPopup);
