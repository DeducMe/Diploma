import React, { Component } from 'react'
import Main from './Main/Main'
import Side from './Side/Side'
import Resumes from './Resumes/Resumes'
import ProfileRedactPopup from './ProfileRedactPopup/ProfileRedactPopup'
import { connect } from 'react-redux'
import {getUserResumes, getUserData} from '../../actions/serverConnections'
import './profile.css'
import Loader from '../Loader/Loader'


class Profile extends Component {
    checkIfNotNull(variable, def){
        console.log(variable)

        if(typeof(variable) !== "undefined") {
            if(variable !== null && variable !== '') {
                return variable
            }
        }
        return def
    }

    initPlaceholder = () => {
        console.log(this.props.userState.hasProfile)
        setTimeout(()=>{
            if (this.props.userState.hasProfile)
            this.props.onInitializeProfileData({
                    state: this.props.profileState.state,
                    popupRedactActiveSection: this.props.profileState.popupRedactActiveSection,
                        placeholder: {
                        userName: this.props.userData.name,
                        description: this.checkIfNotNull(this.props.userData.about, ''),
                        avatar: '',
                        gender: this.checkIfNotNull(this.props.userData.gender, ''),
                        birthday: this.checkIfNotNull(this.props.userData.birthday, ''),
                        citizenship: this.checkIfNotNull(this.props.userData.citizenship, ''),
                        profile_link: '',
                        photo_url: this.checkIfNotNull(this.props.userData.photo_url, 'https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54'),
                        profile_background: this.checkIfNotNull(this.props.userData.profile_background, '')
                    },
                    address: this.props.userData.address,
                    userPhones: this.checkIfNotNull(this.props.userData.phone, []),
                    language: this.checkIfNotNull(this.props.userData.language, []),
                    schedule: this.checkIfNotNull(this.props.userData.schedule, []),
                    education: this.checkIfNotNull(this.props.userData.education, []),
                    experience: this.checkIfNotNull(this.props.userData.experience, []),
                    social_links: [],
                    buf:{
                        languageGrade:'A1',
                        scheduleDay:'0',
                        scheduleEndTime:'00:00',
                        scheduleStartTime:'00:00',
                        cropper:{
                          state:false,
                          file:this.checkIfNotNull(this.props.userData.photo_url, 'https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54'),
                          maxWidth:120,
                          maxHeight:120
                        }
                    }
                }
            )
            else 
            this.props.onInitializeProfileData({
                    state: this.props.profileState.state,
                    popupRedactActiveSection:'baseInfo',
                    placeholder: {
                        userName: this.props.userData.name,
                        description: '',
                        avatar: '',
                        gender: '',
                        birthday: '',
                        citizenship:'',
                        profile_link: '',
                        photo_url: '',
                        profile_background: ''
                    },
                    address: null,
                    userPhones: [],
                    schedule:[],
                    education: [],
                    experience : [],
                    social_links: [],
                    buf:{
                        languageGrade:'A1',
                        scheduleDay:'0',
                        scheduleEndTime:'00:00',
                        scheduleStartTime:'00:00',
                        cropper:{
                          state:false,
                          file:'https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54',
                          maxWidth:0,
                          maxHeight:0,
                          imageType:''
    
                        }
                    }
    
                }
            )
        }, 100)
        

    }

    componentDidMount(){

        if (this.props.userState.logged && this.props.userFetchId === String(this.props.userState.user.id)){
            console.log(this.props.userState.user)
            this.props.onGetLoggedUserFetch(this.props.userFetchId,this.props.onHasProfile, this.initPlaceholder, this.props.history)
        }
        else{
            this.props.onGetUserFetch(this.props.userFetchId, this.props.history, this.props.onHasProfile)
        }        
        this.props.onGetResumes(this.props.userFetchId)
    }
    
    render() {
        if (Object.keys(this.props.userData).length !== 0)
        return (
            <div className="small-container profile-wrapper">
                <div className="profile__main">
                    <Main></Main>
                    
                    <Resumes></Resumes>
                </div>
                <div className="profile__side">
                    <Side></Side>
                </div>
                {this.props.profileState.state === 'active' ? (<ProfileRedactPopup></ProfileRedactPopup>):('')}
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
        resumeData:state.cvs
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onInitializeProfileData: (data)=>{
            dispatch({type : 'POPUP_REDACT_INITIALIZE_PROFILE', payload:data}) 
        },
        onHasProfile: ()=>{
            dispatch({type : 'USER_HAS_PROFILE', payload:null}) 
        },
        onGetLoggedUserFetch: (userId, onHasProfile, initPlaceholder, history)=> {
            dispatch(getUserData(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    console.log(data.userData)
                    if (data.userData.profile_link !== "empty"){
                        onHasProfile()
                        console.log('profile')
                    }
                    initPlaceholder()

                }
                else history.push('/landing')           
            })
        },
        onGetUserFetch: (userId, history, onHasProfile)=> {
            dispatch(getUserData(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    if (data.userData.profile_link !== "empty"){
                        onHasProfile()
                        console.log('profile')
                    }
                }
                else history.push('/landing')           
            })
        },
        onGetResumes: (fetchId) => {
            console.log(fetchId)
            dispatch(getUserResumes(fetchId))
            .then((data)=>{
                if (data.data !== null && data.data!=='404'){
                    
                    data.data.map(el=>el.state = '')
                    dispatch({type : 'INITIALIZE_RESUME_PLACEHOLDER', payload:data.data}) 
                }
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
