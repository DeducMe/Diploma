import React, { Component } from 'react'
import { connect } from 'react-redux'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'


export class MainPlaceholder extends Component {
    checkAvatar(){
        if (this.props.userState.hasProfile){
            if (this.props.userData.photo_url !== ""){
                return this.props.userData.avatar
            }

        }   
        return placeholderAvatar
    }

    // componentDidMount(){
    //     this.props.store.subscribe(() => {
    //       this.setState({reduxState: this.props.store.getState()});
    //     });
    //   }
    componentDidUpdate(){
        console.log(this.props.userPhones)
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
                            
                            <p className={'info__common-info__birthday ' + this.props.userBirthday}>{this.props.userBirthday}</p>
                            <p className={'info__common-info__gender ' + this.props.userGender}></p>
                            <div className="info__common-info__living">
                                <p className="living__place">{this.props.userCity}</p>
                                <p className="living__cz">{this.props.userCz}</p>
                            </div>
                            
                        </div>
                        
                        <div className="info__contacts__phones">
                            {this.props.userPhones.map((phone, index) => <a key={index} className="contacts__phones-el" href={"tel:"+phone}>{phone}</a> )}
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
        userGender:state.profile.placeholder.gender,
        userCity:state.profile.placeholder.city,
        userCz:state.profile.placeholder.cz,
        userPhones:state.profile.userPhones
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
