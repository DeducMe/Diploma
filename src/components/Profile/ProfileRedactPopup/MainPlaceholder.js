import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'


export class MainPlaceholder extends Component {
    constructor(props) {
        super(props)
     
        this.userName = React.createRef()
    }

    checkAvatar(){
        if (this.props.userState.hasProfile){
            if (this.props.userData.photo_url !== ""){
                return this.props.userData.avatar
            }

        }   
        return placeholderAvatar
    }

    render() {
        return (
            <div className="main-placeholder rounded">
                <section className="main-placeholder__personal top-rounded">
                    <img className="main-placeholder__personal__avatar" src={this.checkAvatar()} alt="аватар"/>
                </section>
                <section className="main-placeholder__info">
                    <div className="main-placeholder__info-wrapper">
                        <div className="info-head">
                            <h2 className="info__name bold">{this.props.userName}</h2>
                        </div>
                        
                        <p className="info__description">{this.props.userDescription}</p>
                        <div className="info__common-info">
                            <p>
                                <span>19 лет</span>
                                <span className={'info__common-info__gender ' + this.props.userGender}></span>
                            </p>
    
                            <p>{this.props.userBirthday}</p>
                        </div>
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
        userData: state.user.userData,
        userName: state.profile.placeholder.userName,
        userDescription: state.profile.placeholder.description,
        userBirthday: state.profile.placeholder.birthday,
        userGender:state.profile.placeholder.gender
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
