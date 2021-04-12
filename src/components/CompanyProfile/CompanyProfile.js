import React, { Component } from 'react'
import Main from './Main/Main'
import Side from './Side/Side'
import Vacancies from './Vacancies/Vacancies'
import ProfileRedactPopup from './ProfileRedactPopup/ProfileRedactPopup'
import { connect } from 'react-redux'
import {getUserVacancies, getEmployer} from '../../actions/serverConnections'
import './profile.css'
import Loader from '../Loader/Loader'


class Profile extends Component {
    checkIfNotNull(variable, def){
        if(typeof(variable) !== "undefined") {
            if(variable !== null && variable !== '') {
                return variable
            }
        }
        return def
    }

    initPlaceholder = () => {
        this.props.onInitializeProfileData({
                state:'muted',
                popupRedactActiveSection:'baseInfo',
                placeholder: this.props.userData,
                buf:{
                    cropper:{
                        state:false,
                        file:'',
                        maxWidth:0,
                        maxHeight:0,
                        instance:{
                
                        },
                        imageType:''
                    }
                }
            })
    }

    componentDidMount(){
        if (this.props.userState.logged && this.props.userFetchId === String(this.props.userState.user.id)){
            console.log(this.props.userState.user)
            this.props.onGetLoggedEmployerFetch(this.props.userFetchId, this.props.onHasProfile, this.initPlaceholder, this.props.history)
        }
        else{
            this.props.onGetEmployer(this.props.userFetchId, this.props.onHasProfile, this.props.history)
        }        

        console.log(this.props.userFetchId)
        this.props.onGetVacancies(this.props.userFetchId)
    }
    
    render() {
        if (Object.keys(this.props.userData).length !== 0)
        return (
            <div className="small-container profile-wrapper">
                <div className="profile__main">
                    <Main></Main>
                    
                    <Vacancies></Vacancies>
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
        profileState: state.companyProfile,
        userState: state.user,
        userData: state.userData,
        placeholderData: state.companyProfile.placeholder,
        resumeData:state.cvs
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onInitializeProfileData: (data)=>{
            dispatch({type : 'POPUP_EMPLOYER_REDACT_INITIALIZE_PROFILE', payload:data}) 
        },
        onHasProfile: ()=>{
            dispatch({type : 'USER_HAS_PROFILE', payload:null}) 
        },
        onGetLoggedEmployerFetch: (userId, onHasProfile, initPlaceholder, history)=> {
            dispatch(getEmployer(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    if (data.userData.profile_link !== "empty"){
                        onHasProfile()
                    }
                    initPlaceholder()

                }
                else history.push('/landing')           
            })
        },
        onGetEmployer: (userId,onHasProfile, history)=> {
            dispatch(getEmployer(userId))
            .then((data)=>{
                if (data.userData !== null && data.userData!=='404'){
                    onHasProfile()
                }
                else history.push('/landing')           
            })
        },
        onGetVacancies: (fetchId) => {
            dispatch(getUserVacancies(fetchId))
            .then((data)=>{
                if (data.data !== null && data.data!=='404'){
                    
                    data.data.map(el=>el.state = '')
                    dispatch({type : 'INITIALIZE_VACANCY_PLACEHOLDER', payload:data.data}) 
                }
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
