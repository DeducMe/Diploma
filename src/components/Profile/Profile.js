import React, { Component } from 'react'
import Main from './Main/Main'
import Side from './Side/Side'
import ProfileRedactPopup from './ProfileRedactPopup/ProfileRedactPopup'
import { connect } from 'react-redux'
import {getUserData} from '../../actions/serverConnections'
import './profile.css'
import userData from '../../reducers/userData'
import Loader from '../Loader/Loader'


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
        this.props.onInitializeProfileData({
                state: this.props.profileState.state,
                    placeholder: {
                    userName: this.props.userState.user.name,
                    description: this.checkIfNotNull(this.props.userData.about, ''),
                    avatar: '',
                    gender: this.checkIfNotNull(this.props.userData.gender, ''),
                    personalBackground: '',
                    birthday: this.checkIfNotNull(this.props.userData.birthday, ''),
                    cz: this.checkIfNotNull(this.props.userData.cz, ''),
                    city: this.checkIfNotNull(this.props.userData.city, ''),
                    profile_link: '',
                    photo_url: '',
                    profile_background: ''
                },
                userPhones: this.checkIfNotNull(this.props.userData.phone, []),
                userPhones: [],
                language:[],
                education: [],
                workExp: [],
                social_links: [],
                buf:{
                    languageGrade:'A1'
                }
            }
        )
        else 
        this.props.onInitializeProfileData({
                state: this.props.profileState.state,
                placeholder: {
                    userName: this.props.userState.user.name,
                    description: '',
                    avatar: '',
                    gender: '',
                    personalBackground: '',
                    birthday: '',
                    cz:'',
                    city: '',
                    profile_link: '',
                    photo_url: '',
                    profile_background: ''
                },
                userPhones: [],
                language:[],
                education: [],
                workExp: [],
                social_links: [],
                buf:{
                    languageGrade:'A1'
                }

            }
        )
    }

    componentDidMount(){
        if (this.props.userState.logged && this.props.userFetchId === String(this.props.userState.user.id)){
            console.log(this.props.userState.user)
            this.props.onGetLoggedUserFetch(this.props.userFetchId,this.props.onHasProfile, this.initPlaceholder, this.props.history)
        }
        else{
            this.props.onGetUserFetch(this.props.userFetchId, this.props.history)
        }        
    }
    
    render() {
        if (Object.keys(this.props.userData).length !== 0)
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

        else return <Loader active={true}></Loader>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userFetchId: ownProps.match.params.id,
        history: ownProps.history,
        profileState: state.profile,
        userState: state.user,
        userData: state.userData,
        placeholderData: state.profile.placeholder,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{

        onInitializeProfileData: (data)=>{
            dispatch({type : 'POPUP_REDACT_INITIALIZE_PROFILE', payload:data}) 
        },
        onHasProfile: (data)=>{
            dispatch({type : 'USER_HAS_PROFILE', payload:null}) 
        },
        onGetLoggedUserFetch: (userId, onHasProfile, initPlaceholder, history)=> {
            dispatch(getUserData(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    console.log(data.userData)
                    initPlaceholder()
                    if (data.userData.profile_link !== "empty"){
                        onHasProfile()
                    }
                }
                else history.push('/landing')           
            })
        },

        onGetUserFetch: (userId, history)=> {
            dispatch(getUserData(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    console.log(data.userData)
                }
                else history.push('/landing')           
            })
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
