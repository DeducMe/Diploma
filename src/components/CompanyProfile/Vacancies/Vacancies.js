import React, { Component } from 'react'
import { connect } from 'react-redux'
import './vacancy.css'
import { addVacancy} from '../../../actions/serverConnections'
import plusIcon from '../../../img/plusIcon.svg'
import VacancyRedactPopup from './VacancyRedactPopup/VacancyRedactPopup'
import editIcon from '../../../img/edit.svg'

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
                {this.props.userState.logged ? (this.props.vacancyData.vacancies.length !== 0 ?(<h2>Ваши Резюме:</h2>):('')):(this.props.vacancyData.vacancies.length !== 0 ?(<h2>Резюме:</h2>):(''))}
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
                                            <p><span className="resume__header__salary bold f-medium">{el.salary}</span><span className="bold f-medium"> руб.</span></p>
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{el.grade}</p>
                                            <p className="resume__publication-date sup">{el.pub_date}</p>
                                        </div>
                                    </div>
            
                                    <div className="resume__main-info rounded">
                                        <p className="resume__industry f-pre">{el.industry}</p>
            
                                        <p className="resume__work-type">{el.work_type.join(', ')}</p>
            
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
                        <p>Добавить резюме:</p>
                        <button className="resume-add-btn" onClick={this.addVacancy.bind(this, 0)}>
                            <img src={plusIcon} alt="plusIcon"/>
                        </button>
                    </div>)
                :('')}
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