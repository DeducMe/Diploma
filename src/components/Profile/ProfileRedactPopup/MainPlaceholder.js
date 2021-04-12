import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import personalBackground from'../../../img/personal-background.png'
import ImageCropper from "./ImageCropper";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


export class MainPlaceholder extends Component {
    checkOnEmpty(el, returnValue){
        if (el !== ""){
            return el
        }

        return returnValue
    }

    render() {

        return (
            <div className="main-placeholder rounded">
                <div className="main-placeholder__personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.personalBackground, personalBackground)})`}}>
                    <img className="main-placeholder__personal__avatar" src={this.checkOnEmpty(this.props.avatarPhoto, placeholderAvatar)} alt="аватар"/>
                </div>
                <section className="main-placeholder__info">
                    <div className="main-placeholder__info-wrapper">
                        <div className="info-head">
                            <h2 className="info__name bold">{this.props.userName}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userDescription}</p>
                        <div className="info__common-info">
                            
                            <p className={'info__common-info__birthday ' + this.props.userBirthday}>{this.props.userBirthday}</p>
                            <p className={'info__common-info__gender ' + this.props.userGender}></p>
                            <div className="info__common-info__living">
                                <p className="living__cz">{this.props.userCz}</p>
                                <p className="living__place">{this.props.userAddress ? this.props.userAddress.name:''}</p>
                            </div>
                            
                        </div>
                        
                        <div className="info__contacts__phones">
                            <p>Контакты:</p>
                            {this.props.userPhones.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
                        </div>

                        <div className="info__languages">
                            <p>Владение языками:</p>
                            {this.props.userLanguages.map((language, index) => <a key={index} className="languages-el">{language.language + ' - ' + language.grade}</a> )}
                        </div>
                        
                        {this.props.userEducation.length!== 0 ?(
                            <div className="info__education">
                                <h3 className="education-head bold headed">Образование:</h3>
                                {this.props.userEducation.map((el, index)=>{
                                    console.log('education', el)
                                    return (
                                        <div className="education-block" key={index}>
                                            <p className="education-name highlighted">{el.profession}</p>
                                            <div className="education-place">
                                                <p className="education-place__institution">{el.university},</p>
                                                <p className="education-place__grade">&nbsp;{el.type}</p>     
                                                <p className="education-place__longing">{el.start_year + ' - ' + el.end_year}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>):('')}
                                               
                        {this.props.userExperience.length!== 0 ? (
                            <div className="info__work-experience">
                                <h3 className="courses-head bold headed">Опыт Работы:</h3>
                                {this.props.userExperience.map((el, index)=>{
                                    console.log('education', el)
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
                            </div>):('')}
                    </div>
                </section>
                
                <ImageCropper></ImageCropper>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        placeholderData: state.profile.placeholder,
        userState: state.user,
        userData: state.userData,
        userName: state.profile.placeholder.userName,
        avatarPhoto:state.profile.placeholder.photo_url,
        personalBackground:state.profile.placeholder.profile_background,
        userDescription: state.profile.placeholder.description,
        userBirthday: state.profile.placeholder.birthday,
        userGender:state.profile.placeholder.gender,
        userAddress:state.profile.address,
        userCz:state.profile.placeholder.citizenship,
        userPhones:state.profile.userPhones,
        userLanguages: state.profile.language,
        userEducation:state.profile.education,
        userExperience:state.profile.experience,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      onUpdateUserName: (userName) => {
        dispatch({type : 'PLACEHOLDER_UPDATE_USER_NAME', payload:userName})
      },
      setCropperInstance: (instance) => {
        dispatch({type : 'SET_CROPPER_INSTANCE', payload:instance})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPlaceholder)
