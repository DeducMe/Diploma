import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import personalBackground from'../../../img/personal-background.png'
import ImageCropper from "./ImageCropper";

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
                <section className="main-placeholder__personal top-rounded" style={{backgroundImage: `url(${this.checkOnEmpty(this.props.personalBackground, personalBackground)})`}}>
                    <img className="main-placeholder__personal__avatar" src={this.checkOnEmpty(this.props.avatarPhoto, placeholderAvatar)} alt="аватар"/>
                </section>

                <section className="main-placeholder__info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.props.userName}</h2>
                    </div>
                    
                    <p className="info__description">{this.props.userDescription}</p>

                    <div className="info__common-info">
                        <p className="living__place">{this.props.userAddress ? this.props.userAddress.name:''}</p>
                    </div>
                    
                    {this.props.userPhones !== 0 ? (
                        <div className="info__contacts">
                            <p>Контакты:</p>
                            <div className="info__contacts__phones">
                                {this.props.userPhones.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
                            </div>
                        </div>):('')}
                </section>
                <ImageCropper></ImageCropper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        placeholderData: state.companyProfile.placeholder,
        userState: state.user,
        userData: state.userData,
        userName: state.companyProfile.placeholder.name,
        avatarPhoto:state.companyProfile.placeholder.photo_url,
        personalBackground:state.companyProfile.placeholder.profile_background,
        userDescription: state.companyProfile.placeholder.about,
        userAddress:state.companyProfile.placeholder.address,
        userPhones:state.companyProfile.placeholder.phone,
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
