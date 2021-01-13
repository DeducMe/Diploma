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

    checkContacts(){
        if (this.props.userData.phone.length !== 0) return (
        <div className="info__contacts">
            <div className="contacts__phones">
                {this.props.userData.phone.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
            </div>
        </div>)
    }

    checkEducation(){
        if (this.props.userData.education.length!== 0) return(
        <div className="info__education">
            <h3 className="education-head bold headed">Образование:</h3>
            {this.props.userData.education.map((el, index)=>{
                return (
                    <div className="education-block" key={index}>
                        <p className="education-name highlighted">{el.proffession}</p>
                        <div className="education-place">
                            <p className="education-place__institution">{el.university},</p>
                            <p className="education-place__grade">&nbsp;{el.type}</p>     
                            <p className="education-place__longing">{el.start_year + ' - ' + el.end_year}</p>
                        </div>
                    </div>
                )
            })}
        </div>)
    }

    checkWorkExperience(){
        if (this.props.userData.education.length!== 0) return (
        <div className="info__work-experience">
            <h3 className="courses-head bold headed">Опыт Работы:</h3>
            {this.props.userData.exp.map((el, index)=>{
                return (
                    <div className="education-block" key={index}>
                        <p className="education-name highlighted">{el.position}</p>
                        <div className="education-place">
                            <p className="education-place__institution">{el.company},</p>
                            <p className="education-place__grade">&nbsp;{el.type},</p>     
    
                            <p className="education-place__longing">{el.start_year + ' - ' + el.end_year}</p>
                        </div>
                    </div>
                )
            })}
        </div>)
    }

    render() {
        if (this.props.userState.hasProfile && this.props.userState.user.id === this.props.userData.user_id){
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
                            <h2 className="info__name bold">{this.props.userData.name}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userData.about}</p>

                        <div className="info__common-info">
                            <p className="info__common-info__birthday">{this.props.userData.birthday}</p>
                            <p className={"info__common-info__gender " + this.props.userData.gender}></p>

                            <div className="info__common-info__living">
                                <p className="living__place">{this.props.userData.city}</p>
                                <p className="living__cz">{this.props.userData.cz}</p>
                            </div>
                        </div>
                        
                        {this.checkContacts()}
                        
                        {this.checkEducation()}
                                               
                        {this.checkWorkExperience()}
                        
                    </section>
                </div>
                
            )
        }
        
        else if (this.props.userState.user.id === this.props.userData.user_id)
        return(
            <div className="main rounded">
                <section className="personal top-rounded">
                    <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>
                </section>
                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.props.userData.name}</h2>
                    </div>
                    {/* {
                        this.props.userState.user.id === this.props.userData.user_id ? (
                            <div>
                                <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!</p>
                                {this.goPhrase()}

                                <button className="profile-redact-btn" onClick={this.redactProfile}>
                                    <img src={plusIcon} alt="plusIcon"/>
                                </button> 
                            </div>
                            
                        ):(
                            <p className="info__description">Профиль пуст</p>
                        )
                    } */}
                    <div>
                        <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!</p>
                        {this.goPhrase()}

                        <button className="profile-redact-btn" onClick={this.redactProfile}>
                            <img src={plusIcon} alt="plusIcon"/>
                        </button> 
                    </div>
                </section>
            </div>
        )
        else
        return(
                <div className="main rounded">
                    <section className="personal top-rounded">
                        <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>

                    </section>
    
                    <section className="info">
                        <div className="info-head">
                            <h2 className="info__name bold">{this.props.userData.name}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userData.about}</p>

                        <div className="info__common-info">
                            <p className="info__common-info__birthday">{this.props.userData.birthday}</p>
                            <p className={"info__common-info__gender " + this.props.userData.gender}></p>

                            <div className="info__common-info__living">
                                <p className="living__place">{this.props.userData.city}</p>
                                <p className="living__cz">{this.props.userData.cz}</p>
                            </div>
                        </div>
                        
                        {this.checkContacts()}
    
                        {this.checkEducation()}

                        {this.checkWorkExperience()}
                    </section>
                </div>
        )

    }
}

const mapStateToProps = (state) =>{
    return {
      userState: state.user,
      userData: state.userData
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
