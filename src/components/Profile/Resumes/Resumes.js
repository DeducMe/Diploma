import React, { Component } from 'react'
import { connect } from 'react-redux'
import './resumes.css'
import { addResume} from '../../../actions/serverConnections'
import plusIcon from '../../../img/plusIcon.svg'
import ResumeRedactPopup from './ResumeRedactPopup/ResumeRedactPopup'
import editIcon from '../../../img/edit.svg'

class Resumes extends Component {
    addResume = (e) => {
        return fetch('../new_cv.json', {
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
            this.props.onPopupNewResumeActivate(data)
            // return this.props.onAddResume(data, this.props.onPopupRedactResumeActivate)
        })
    }

    redactResume = (index) =>{
        this.props.onPopupRedactResumeActivate(index)
    }

    render() { 
        return (
            <div className="resumes-block">
                {this.props.userState.logged ? (this.props.cvData.cvs.length !== 0 ?(<h2>Ваши Резюме:</h2>):('')):(this.props.cvData.cvs.length !== 0 ?(<h2>Резюме:</h2>):(''))}
                <ul className="resumes-list">
                    {this.props.cvData.cvs.length !== 0 ? 
                    (this.props.cvData.cvs.map((el, index)=>
                            (
                            <li key={index} className="resume resumes-list-el rounded">
                                {el.state==='active' ? (<ResumeRedactPopup index={index}></ResumeRedactPopup>) : ('')}
                                <section className={"resume-main " + (el.state === 'active' ? ('muted'):(''))}>
                                    <div className={"resume__header white top-rounded " + this.props.cvData.cvs[index].bg_header_color}>
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
            
                                        <ul className="resume__tags-list">
                                            {el.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}

                                        </ul>
                                    </div>
                                </section>
                                {this.props.userState.logged && this.props.userState.user.id === this.props.userData.user_id?(
                                    <button className="resume-redact-btn"  onClick={this.redactResume.bind(this, index)}>
                                        <img src={editIcon} alt="editIcon"/>
                                    </button>
                                ):('')}
                                
                            </li>
                            )
                        )
                    ):('')}

                    {this.props.cvData.newCv.length!==0 ? (this.props.cvData.newCv.state==='active' ? (<ResumeRedactPopup index={this.props.cvData.cvs.length}></ResumeRedactPopup>) : ('')) : ('')}
                </ul>
                {this.props.userState.logged && this.props.userState.user.id === this.props.userData.user_id && this.props.cvData.newCv.state!=='active' ? (
                    <div className="resume-add">
                        <p>Добавить резюме:</p>
                        <button className="resume-add-btn" onClick={this.addResume.bind(this, 0)}>
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
        cvData: state.cvs,
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onPopupRedactResumeActivate: (resumeIndex) => {
            dispatch({type : 'POPUP_REDACT_RESUME_ACTIVATE', payload:resumeIndex})
        },
        onPopupNewResumeActivate: (newCvData) => {
            dispatch({type : 'POPUP_NEW_RESUME_ACTIVATE', payload:newCvData})
        },

    }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(Resumes);