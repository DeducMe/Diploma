import React, { Component } from 'react'
import { connect } from 'react-redux'

import plusIcon from '../../../img/plusIcon.svg'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import './main.css'
import photoRedactIcon from '../../../img/photovector.svg'
import editIcon from '../../../img/edit.svg'


class Main extends Component {
    goPhrase(){
        if (this.props.userState.user.user_type === "employee"){
            return <p className="info__go-phrase highlighted">Пора начать свою карьеру!</p>
        }
        return <p className="info__go-phrase highlighted">Пора найти команду!</p>
    }

    redactProfile = () =>{
        this.props.onPopupRedactProfileActivate()
    }

    render() {
        if (this.props.userState.hasProfile){
            return (
                <div className="main rounded">
                    <section className="personal top-rounded">
                        <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>
                        <button className="photo-redact-btn"  onClick={this.redactProfile}>
                            <img src={editIcon} alt="editIcon"/>
                        </button>
                    </section>
    
                    <section className="info">
                        <div className="info-head">
                            <h2 className="info__name bold">{this.props.userState.user.name}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userData.about}</p>

                        <div className="info__common-info">
                            <p>
                                <span>19 лет</span>
                                <span className={"info__common-info__gender " + this.props.userData.gender}></span>

                            </p>
    
                            <p>{this.props.userData.birthday}</p>
                        </div>
    
                        <p className="info__place">{this.props.userData.city}</p>
    
                        {()=>{
                            if (this.props.userData.education.length!== 0) return
                            <div className="info__education">
                                <h3 className="education-head bold headed">Образование:</h3>
                                {this.props.userData.education.map((el, index)=>{
                                    if (!el.course)
                                    return (
                                        <div className="education-block" key={index}>
                                            <p className="education-name highlighted">{el.profession}</p>
                                            <div className="education-place">
                                                <p className="education-place__institution">{el.university},</p>
                                                <p className="education-place__grade">&nbsp;{el.type}</p>     
                                                <p className="education-place__longing">{el.startYear + ' - ' + el.endYear}</p>
                                            </div>
                                        </div>
                                    )
                                    //{el.type}
                                    //{el.startYear - el.endYear}
                                })}
                            </div>
                        }}
                        
                        {()=>{
                            if (this.props.userData.education.filter(el => el.course === true).length !== 0) return
                            <div className="info__courses">
                                <h3 className="courses-head bold headed">Курсы:</h3>
                                {this.props.userData.education.map((el, index)=>{
                                    // if (el.course)
                                    return (
                                        <div className="education-block" key={index}>
                                            <p className="education-name highlighted">{el.profession}</p>
                                            <div className="education-place">
                                                <p className="education-place__institution">{el.university}</p>
                                                <p className="education-place__longing">{el.startYear + ' - ' + el.endYear}</p>
                                            </div>
                                        </div>
                                    )
                                    //{el.type}
                                    //{el.startYear - el.endYear}
                                })}
                            </div>
                        }}
                        
                        {()=>{
                            if (this.props.userData.education.length!== 0) return
                            <div className="info__work-experience">
                                <h3 className="courses-head bold headed">Опыт Работы:</h3>
                                {this.props.userData.exp.map((el, index)=>{
                                    // if (el.course)
                                    return (
                                        <div className="education-block" key={index}>
                                            <p className="education-name highlighted">{el.position}</p>
                                            <div className="education-place">
                                                <p className="education-place__institution">{el.company},</p>
                                                <p className="education-place__grade">&nbsp;{el.type},</p>     

                                                <p className="education-place__longing">{el.startYear + ' - ' + el.endYear}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            }
                        }
                        
                    </section>
                </div>
                
            )
        }
        
        else
        return(
            <div className="main rounded">
                <section className="personal top-rounded">
                    <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>
                </section>
                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.props.userState.user.name}</h2>
                    </div>
                    
                    <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!
                    </p>
                    {this.goPhrase()}

                    <button className="profile-redact-btn" onClick={this.redactProfile}>
                        <img src={plusIcon} alt="plusIcon"/>
                    </button> 
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      userState: state.user,
      userData: state.user.userData
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      onSubjectChangeToEmployer: () => {
        dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYER', payload:null})
      },
      onPopupRedactProfileActivate: () => {
        dispatch({type : 'POPUP_REDACT_PROFILE_ACTIVATE', payload:null})
      },
     
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);
