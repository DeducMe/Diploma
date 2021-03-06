import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getWorkTypeValues, getGradeValues} from '../../../scripts/commonScripts'

import plusIcon from '../../../img/plusIcon.svg'
import VacancyRedactPopup from './VacancyRedactPopup/VacancyRedactPopup'
import editIcon from '../../../img/edit.svg'
import VacancyPopup from '../../VacancyPopup/VacancyPopup'

class Vacancy extends Component {
    addVacancy = (e) => {
        return fetch('../new_vacancy.json', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.user_id = this.props.userData.user_id
            return data
        })
        .then (data => {
            this.props.onPopupNewVacancyActivate(data)
        })
    }

    redactVacancy = (index) =>{
        this.props.onPopupRedactVacancyActivate(index)
    }

    render() { 
        return (
            <div className="resumes-block">
                {this.props.userState.logged ? (this.props.vacancyData.vacancies.length !== 0 ?(<h2>Ваши вакансии:</h2>):('')):(this.props.vacancyData.vacancies.length !== 0 ?(<h2>Вакансии:</h2>):(''))}
                <ul className="resumes-list">
                    {this.props.vacancyData.vacancies.length !== 0 ? 
                    (this.props.vacancyData.vacancies.map((el, index)=>
                            (
                            <li key={index} className="resume resumes-list-el rounded">
                                {el.state==='active' ? (<VacancyRedactPopup index={index}></VacancyRedactPopup>) : ('')}
                                <section className={"resume-main " + (el.state === 'active' ? ('muted'):(''))}>
                                    <div className={"resume__header white top-rounded " + this.props.vacancyData.vacancies[index].bg_header_color}>
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{el.vacancy_name}</h2>
                                                {el.salary === -1 ? <span className="resume__header__salary bold f-medium">Зарплата не указана</span>:
                                                <span className="resume__header__salary bold f-medium">{el.salary} руб.</span>}
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{getGradeValues(el.grade)}</p>

                                            <p className="resume__publication-date sup">{el.pub_date.slice(0,10)}</p>
                                        </div>
                                    </div>
            
                                    <div className="resume__main-info rounded">
                                        <p className="resume__industry f-pre">{el.industry}</p>
            
                                        <p className="resume__work-type">{el.work_type.map((item)=>getWorkTypeValues(item)).join(', ')}</p>
            
                                        <p className="resume__about">{el.about}</p>
            
                                        
                                        <ul className="resume__tags-list">
                                            {el.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}

                                        </ul>
                                    </div>
                                </section>
                                {this.props.userState.logged && this.props.userState.user.id === this.props.userData.user?(
                                    <button className="resume-redact-btn"  onClick={this.redactVacancy.bind(this, index)}>
                                        <img src={editIcon} alt="editIcon"/>
                                    </button>
                                ):('')}
                                
                            </li>
                            )
                        )
                    ):('')}

                    {this.props.vacancyData.newVacancy.length!==0 ? (this.props.vacancyData.newVacancy.state==='active' ? (<VacancyRedactPopup index={this.props.vacancyData.vacancies.length}></VacancyRedactPopup>) : ('')) : ('')}
                </ul>
                {this.props.userState.logged && this.props.userState.user.id === this.props.userData.user && this.props.vacancyData.newVacancy.state!=='active' ? (
                    <div className="resume-add">
                        <p>Добавить вакансию:</p>
                        <button className="resume-add-btn" onClick={this.addVacancy.bind(this, 0)}>
                            <img src={plusIcon} alt="plusIcon"/>
                        </button>
                    </div>)
                :('')}
                {this.props.vacancyData.openedVacancyId !== -1 ? <VacancyPopup id={this.props.responseState.openedVacancyId}></VacancyPopup> : ''}

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        userState: state.user,
        userData: state.userData,
        vacancyData: state.vacancy,
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onPopupRedactVacancyActivate: (vacancyIndex) => {
            dispatch({type : 'POPUP_REDACT_VACANCY_ACTIVATE', payload:vacancyIndex})
        },
        onPopupNewVacancyActivate: (newVacancyData) => {
            dispatch({type : 'POPUP_NEW_VACANCY_ACTIVATE', payload:newVacancyData})
        },

    }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(Vacancy);