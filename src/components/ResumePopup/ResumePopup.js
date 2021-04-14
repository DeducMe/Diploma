import React, { Component, useEffect } from 'react'
import {getResume} from '../../actions/serverConnections'
import {getGradeValues, getWorkTypeValues} from '../../scripts/commonScripts'
import { connect } from 'react-redux'
import './resumePopup.css'

class ResumePopup extends Component {
    componentDidMount(){
        this.props.onGetResume(this.props.id)
    }

    popupClose(e){
        e.preventDefault()
        this.props.onCloseResumePopup();
    }

    render() {
        if (Object.keys(this.props.openedResume).length !== 0)
        return (
            <div className="blur-box active" onClick={this.popupClose.bind(this)}>
                <div className="resume resumes-list-el popup-wrapper rounded vacancy-info">
                    <section className="resume-main">
                        <div className={"resume__header white top-rounded " + this.props.openedResume.bg_header_color}>
                            <div className="resume__header-top">
                                <h2 className="resume__header__name bold f-large">{this.props.openedResume.vacancy_name}</h2>
                                <p>
                                    {this.props.openedResume.salary === -1 ? <span className="resume__header__salary bold f-medium">Зарплата не указана</span>:
                                    <span className="resume__header__salary bold f-medium">{this.props.openedResume.salary} руб.</span>}
                                </p>
                            </div>
                            <div className="resume__header-bottom">
                                <p className="resume__header__grade">{getGradeValues(this.props.openedResume.grade)}</p>

                                <p className="resume__publication-date sup">{this.props.openedResume.pub_date.slice(0,10)}</p>
                            </div>
                        </div>

                        <div className="resume__main-info bottom-rounded full-width">
                            <p className="resume__industry f-pre">{this.props.openedResume.industry}</p>

                            <p className="resume__work-type">{this.props.openedResume.work_type.map((el)=>getWorkTypeValues(el)).join(', ')}</p>

                            <p>{this.props.openedResume.about}</p>
                            
                            <ul className="resume__tags-list">
                                {this.props.openedResume.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}

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
    openedResume:state.buf.openedResume,
    id:ownProps.id
})


const mapDispatchToProps = (dispatch) => ({
    onGetResume: (id) => {
        dispatch(getResume(id))
    },
    onCloseResumePopup: () => {
        dispatch({type : 'CLOSE_RESUME_POPUP', payload:null})

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResumePopup);

