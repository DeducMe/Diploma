import React, { Component } from 'react'
import {getVacancy} from '../../actions/serverConnections'
import {getGradeValues, getWorkTypeValues} from '../../scripts/commonScripts'
import { connect } from 'react-redux'
import './vacancyPopup.css'

class VacancyPopup extends Component {
    componentDidMount(){
        this.props.onGetVacancy(this.props.id)
    }

    popupClose(e){
        e.preventDefault()
        this.props.onCloseVacancyPopup();
    }

    render() {
        console.log(Object.keys(this.props.openedVacancy).length)
        if (Object.keys(this.props.openedVacancy).length !== 0)
        return (
            <div className="blur-box active" onClick={this.popupClose.bind(this)}>
                <div className="resume resumes-list-el popup-wrapper rounded">
                    <section className="resume-main">
                        <div className={"resume__header white top-rounded " + this.props.openedVacancy.bg_header_color}>
                            <div className="resume__header-top">
                                <h2 className="resume__header__name bold f-large">{this.props.openedVacancy.vacancy_name}</h2>
                                <p><span className="resume__header__salary bold f-medium">{this.props.openedVacancy.salary}</span><span className="bold f-medium"> руб.</span></p>
                            </div>
                            <div className="resume__header-bottom">
                                <p className="resume__header__grade">{getGradeValues(this.props.openedVacancy.grade)}</p>

                                <p className="resume__publication-date sup">{this.props.openedVacancy.pub_date.slice(0,10)}</p>
                            </div>
                        </div>

                        <div className="resume__main-info bottom-rounded full-width">
                            <p className="resume__industry f-pre">{this.props.openedVacancy.industry}</p>

                            <p className="resume__work-type">{this.props.openedVacancy.work_type.map((el)=>getWorkTypeValues(el)).join(', ')}</p>

                            <div className="vacancy__about">
                                <p>{this.props.openedVacancy.leading}</p>
                                <ul className="vacancy__about__body-list">
                                    {this.props.openedVacancy.body.map((el, index)=>
                                        <li key={index}>
                                            <h3 className="bold f-large">{el.title}</h3>

                                            <h4 className="bold f-medium">{el.subtitle}</h4>

                                            <ul className="vacancy__about__body-list__points-list">
                                            {el.points.map((point, ind) => 
                                                <li key={ind}>{point}</li>    
                                            )}
                                            </ul>
                                        </li>
                                    )}
                                </ul>
                                <p>{this.props.openedVacancy.trailing}</p>
                            </div>
                            
                            <ul className="resume__tags-list">
                                {this.props.openedVacancy.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}

                            </ul>
                        </div>
                    </section>

                    <button className="close-popup-btn" onClick={this.popupClose.bind(this)} tabIndex="-1">x</button>
                </div>
            </div>
        
        )
        else return ''
    }
}

const mapStateToProps = (state, ownProps) => ({
    openedVacancy:state.buf.openedVacancy,
    id:ownProps.id
})


const mapDispatchToProps = (dispatch) => ({
    onGetVacancy: (id) => {
        dispatch(getVacancy(id))
    },
    onCloseVacancyPopup: () => {
        dispatch({type : 'CLOSE_VACANCY_POPUP', payload:null})

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(VacancyPopup);

