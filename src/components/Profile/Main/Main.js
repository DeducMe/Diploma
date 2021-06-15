import React, { Component } from 'react'
import { connect } from 'react-redux'
import getEducationValues from '../../../scripts/commonScripts'
import getGradeValues from '../../../scripts/commonScripts'

import plusIcon from '../../../img/plusIcon.svg'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import './main.css'
import personalBackground from'../../../img/personal-background.png'
import LeafletMap from '../../leafletMap/LeafletMap'

import editIcon from '../../../img/edit.svg'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapPopupState:''
        };
    }

    convertIntToDay = (num) =>{
        const days = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
        ]

        return days[num]
    }

    toggleMapPopup = () =>{
        if (this.state.mapPopupState === ''){
            this.setState({mapPopupState:'active'})
        }
        else this.setState({mapPopupState:''})
    }
    
    goPhrase(){
        if (this.props.userState.user.user_type === "employee"){
            return <p className="info__go-phrase highlighted">Пора начать свою карьеру!</p>
        }
        return <p className="info__go-phrase highlighted">Пора найти команду!</p>
    }

    checkOnEmpty(el, returnValue){
        if (el !== ""){
            return el
        }

        return returnValue
    }

    redactProfile = () =>{
        this.props.onPopupRedactProfileActivate()
    }

    
    render() {
        console.log(this.props.userData)
        if (this.props.userState.hasProfile){
            return (
                <div className="main rounded">
                    <section className="personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.userData.profile_background, personalBackground)})`}}>
                        <img className="personal__avatar" src={this.checkOnEmpty(this.props.userData.photo_url, placeholderAvatar)} alt="аватар"/>
                        
                        {this.props.userState.user.id === this.props.userData.user ? (
                            <button className="profile-redact-btn"  onClick={this.redactProfile}>
                                <img src={editIcon} alt="editIcon"/>
                            </button>
                        ) : ('')}

                    </section>
    
                    <section className="info">
                        <div className="info-head">
                            <h2 className="info__name bold">{this.props.userData.name}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userData.about}</p>

                        <div className="info__common-info">
                            <p className="info__common-info__birthday">{this.props.userData.birthday?.substring(0, 10)}</p>
                            <p className={"info__common-info__gender " + this.props.userData.gender}></p>
                            {this.props.userData.address ?
                                <div className="address__popup-block">
                                    <span className="living__place underline-link" onClick={this.toggleMapPopup}>{this.props.userData.address.name}</span>

                                    {this.state.mapPopupState === 'active' ? 
                                        <div className ={"map-popup rounded"}>
                                            <button className="map-popup__closer-btn" onClick={this.toggleMapPopup}>x</button>
                                            <LeafletMap address={this.props.userData.address}></LeafletMap>
                                        </div>
                                    : ''}
                                </div>
                            : ''}
                            <p className="living__cz">{this.props.userData.citizenship}</p>

                        </div>
                        {this.props.userData.phone && this.props.userData.language && this.props.userData.education && this.props.userData.experience ?
                            <div>
                                {this.props.userData.phone.length !== 0 ? (
                                <div className="info__contacts">
                                    <p>Контакты:</p>
                                    <div className="info__contacts__phones">
                                        {this.props.userData.phone.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
                                    </div>
                                </div>):('')}

                            {this.props.userData.language.length !== 0 ? (
                            <div className="info__languages">
                                <p>Владение языками:</p>
                                {this.props.userData.language.map((language, index) => <a key={index} className="languages-el">{language.language + ' - ' + language.grade}</a> )}
                            </div>):('')}
                            {this.props.userData.schedule.length !== 0 ? (
                            <div className="info__languages">
                                <p>Желательный график:</p>
                                {this.props.userData.schedule.map((schedule, index) => <a key={index} className="schedule-el">{schedule.start_time + ' - ' + schedule.end_time + '(' + this.convertIntToDay(schedule.day) + ')'}</a> )}
                            </div>):('')}
                            {this.props.userData.education.length!== 0 ?(
                                <div className="info__education">
                                    <h3 className="education-head bold headed">Образование:</h3>
                                    {this.props.userData.education.map((el, index)=>{
                                        return (
                                            <div className="education-block" key={index}>
                                                <p className="education-name highlighted">{el.profession}</p>
                                                <div className="education-place">
                                                    <p className="education-place__institution">{el.university},</p>
                                                    <p className="education-place__grade">&nbsp;{getEducationValues(el.type)}</p>     
                                                    <p className="education-place__longing">{el.start_year.substring(0, 10) + ' - ' + el.end_year.substring(0, 10)}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>):('')}
                                                
                            {this.props.userData.experience.length!== 0 ? (
                                <div className="info__work-experience">
                                    <h3 className="courses-head bold headed">Опыт Работы:</h3>
                                    {this.props.userData.experience.map((el, index)=>{
                                        return (
                                            <div className="education-block" key={index}>
                                                <p className="education-name highlighted">{el.position}</p>
                                                <div className="education-place">
                                                    <p className="education-place__institution">{el.company},</p>
                                                    <p className="education-place__grade">&nbsp;{getGradeValues(el.type)},</p>     
                                                    <p className="education-place__longing">{el.start_year.substring(0, 10) + ' - ' + el.end_year !== '' ? el.end_year.substring(0, 10) : 'по настоящее время'}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>):('')}
                            </div>
                         : ''}
                        
                        
                    </section>
                </div>
                
            )
        }
        
        else if (this.props.userState.user.id === this.props.userData.user){
        return(
            <div className="main rounded">
                <section className="personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.userData.profile_background, personalBackground)})`}}>
                    <img className="personal__avatar" src={this.checkOnEmpty(this.props.userData.photo_url, placeholderAvatar)} alt="аватар"/>
                </section>
                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.props.userData.name}</h2>
                    </div>
                    <div>
                        <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!</p>
                        {this.goPhrase()}

                        <button className="profile-add-btn" onClick={this.redactProfile}>
                            <img src={plusIcon} alt="plusIcon"/>
                        </button> 
                    </div>
                </section>
            </div>
        )}
        else
        return(
            <div className="main rounded">
                <section className="personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.userData.profile_background, personalBackground)})`}}>
                    <img className="personal__avatar" src={this.checkOnEmpty(this.props.userData.photo_url, placeholderAvatar)} alt="аватар"/>
                </section>

                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.props.userData.name}</h2>
                    </div>
                    <div>
                        <p className="info__description">Профиль пуст!</p>
                    </div>
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
