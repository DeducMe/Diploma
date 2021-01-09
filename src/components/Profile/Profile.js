import React, { Component } from 'react'
import Main from './Main/Main'
import Side from './Side/Side'
import ProfileRedactPopup from './ProfileRedactPopup/ProfileRedactPopup'
import { connect } from 'react-redux'
import {getUserData} from '../../actions/serverConnections'
import './profile.css'


class Profile extends Component {
    checkIfNotNull(variable, def){
        if(typeof(variable) !== "undefined") {
            if(variable !== null) {
                return variable
            }
        }
        return def
    }

    initPlaceholder = () => {
        if (this.props.userState.hasProfile)
        this.props.onInitializePlaceholderData(
            {
                userName: this.props.userState.user.name,
                description: this.checkIfNotNull(this.props.userState.userData.about, ''),
                avatar: '',
                gender: this.checkIfNotNull(this.props.userState.userData.gender, 'male'),
                personalBackground: '',
                birthday: this.checkIfNotNull(this.props.userState.userData.birthday, '')
            }
        )
        else 
        this.props.onInitializePlaceholderData(
            {
                userName: this.props.userState.user.name,
                description: '',
                avatar: '',
                gender: 'male',
                personalBackground: '',
                birthday: ''
            }
        )
    }

    componentDidMount(){
        if (this.props.userState.logged){
            console.log(this.props.userState.user)
            this.props.onGetUserFetch(this.props.userState.user.id, this.props.onHasProfile, this.initPlaceholder)
        }

        
        
    }
    
    render() {
        
        return (
            <div className="small-container profile-wrapper">
                <div className="profile__main">
                    <Main></Main>
                </div>
                <div className="profile__side">
                    <Side></Side>
                </div>

                <ProfileRedactPopup></ProfileRedactPopup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileState: state.profile,
        userState: state.user,
        placeholderData: state.profile.placeholder,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onHasProfile: () => {
            dispatch({type : 'USER_HAS_PROFILE', payload:null})
        },
        onInitializePlaceholderData: (data)=>{
            dispatch({type : 'POPUP_REDACT_INITIALIZE_PLACEHOLDER', payload:data}) 
        },
        onGetUserFetch: (userId, onHasProfile, initPlaceholder)=> {
            dispatch(getUserData(userId))
            .then((data)=>{

                if (data.userData !== null){
                    console.log(data.userData)
                    return onHasProfile()
                }
            })
            .then(data => initPlaceholder())
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
