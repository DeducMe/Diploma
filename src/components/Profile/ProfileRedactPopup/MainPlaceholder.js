import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import personalBackground from'../../../img/personal-background.png'


export class MainPlaceholder extends Component {
    checkOnEmpty(el, returnValue){
        console.log(el, returnValue)
        if (el !== ""){
            return el
        }

        return returnValue
    }

    componentDidUpdate(){
        console.log(this.props.userPhones)
    }
    render() {

        return (
            <div className="main-placeholder rounded">
                <section className="main-placeholder__personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.personalBackground, personalBackground)})`}}>
                    <img className="main-placeholder__personal__avatar" src={this.checkOnEmpty(this.props.avatarPhoto, placeholderAvatar)} alt="аватар"/>
                </section>
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
                                <p className="living__place">{this.props.userCity}</p>
                            </div>
                            
                        </div>
                        
                        <div className="info__contacts__phones">
                            {this.props.userPhones.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
                        </div>

                        
                        {this.props.userEducation.length!== 0 ?(
                            <div className="info__education">
                                <h3 className="education-head bold headed">Образование:</h3>
                                {this.props.userEducation.map((el, index)=>{
                                    console.log('education', el)
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
        userCity:state.profile.placeholder.city,
        userCz:state.profile.placeholder.cz,
        userPhones:state.profile.userPhones,
        userEducation:state.profile.education,
        userExperience:state.profile.exp
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
      onUpdateUserName: (userName) => {
        dispatch({type : 'PLACEHOLDER_UPDATE_USER_NAME', payload:userName})
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPlaceholder)
