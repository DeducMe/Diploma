import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createResponse} from '../../actions/serverConnections'
import {getUserResponses, getUserAnswers} from '../../actions/serverConnections'
import {responseLoaderActivate, responseLoaderDeactivate, answersLoaderActivate, answersLoaderDeactivate} from '../../actions/asyncDispatch'
import {userTypeToSearchType , getNormalUserType} from '../../scripts/commonScripts'
import fileUploader from '../../actions/fileUploader';


// компонент костыль, когда-нибудь пофикшу
class ResponsePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenWorkValue:-1
        };
    }

    getResponseData = (msg) => {
        let data = {}
        if (this.props.userState.user_type === 'employer'){
            data.employer = this.props.userState.id
            data.vacancy = this.props.userWorkValues[0].id
            data.cv = this.props.item.pk
            data.worker = this.props.item.owner_id
        }
        else{
            data.employer = this.props.item.owner_id
            data.vacancy = this.props.item.pk
            data.cv = this.props.userWorkValues[0].id
            data.worker = this.props.userState.id
        }
        data.message = msg
        data.state = this.props.item.state || 'sent'
        console.log(data)

        return data
    }

    changeWorkValue = (e) =>{
        this.setState({
            chosenWorkValue: e.target.value
        })
    }

    popupClose = () =>{
        this.props.onCloseResponsePopup()
    }

    getAvatarFromFirebase = (id, pk, userType) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url фотографии. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk, userType))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk, userType))
    }

    makeResponse = (e) => {
        e.preventDefault()
        if (this.state.chosenWorkValue === -1){
            return
        }
        const data = this.getResponseData(e.target.responseMessageInput.value)
        console.log(userTypeToSearchType(this.props.userState.user_type))
        console.log(this.props.userState.user_type)
        this.props.onMakeResponse(userTypeToSearchType(this.props.userState.user_type), data)
        this.props.onCloseResponsePopup()
        this.props.onNullifyValues()
        this.props.onNullifyAnswers()
        console.log(this.props.userState.id)

        const userType = getNormalUserType(this.props.userState.user_type) // а это прекрасный костыль, чтобы обойти говнорукость бэкендера. В userState у нас тип юзера employee, а во всех юрлах нам нужен worker
        this.props.onGetUserResponses(userType, this.props.responseState.nextValues, this.props.userState.id, this.getAvatarFromFirebase)
        this.props.onGetUserAnswers(userType, this.props.responseState.nextAnswers, this.props.userState.id, this.getAvatarFromFirebase)
    }

    render() {
        return (
            <form className="response-form-popup rounded" onSubmit={this.makeResponse.bind(this)}>
                <button className="close-popup-btn" onClick={this.popupClose} tabIndex="-1">x</button>

                <textarea className="response-form-popup__textarea rounded" type="text" name="responseMessageInput" placeholder="Сопроводительное письмо"></textarea>
                <select id="responseWorkValueInput" name="responseWorkValueInput" onChange={this.changeWorkValue.bind(this)}>
                    <option value={-1}>Выберите сопроводительную вакансию</option>
                    
                    {this.props.userWorkValues.map((value)=>{
                        return <option key={value.id} value={value.id}>{value.vacancy_name}</option>
                    })}
                </select>
                <input className="sup-btn" type="submit" />
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let userWorkValues
    if (state.user.user.user_type === 'employer'){
        userWorkValues = state.vacancy.vacancies
    }
    else{
        userWorkValues = state.cvs.cvs
    }

    return {
        userState:state.user.user,
        userWorkValues:userWorkValues,
        item:ownProps.item,
        responseState:state.response,
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onMakeResponse:(type, data)=>{
            dispatch(createResponse(type, data))
        },
        onCloseResponsePopup: () => {
            dispatch({type : 'CLOSE_RESPONSE_POPUP', payload:null})
        },
        onGetUserResponses: (userType, next, userId, getAvatarFromFirebase) => {
            dispatch(responseLoaderActivate())

            dispatch(getUserResponses(userType, next, userId))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'RESPONSE_UPDATE_RESULTS_COUNT', payload:data.data.count})
                    dispatch({type : 'RESPONSE_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.map((item) => {
                        getAvatarFromFirebase(userId, item.id, userType)
                    })
                }
            })
            .then(response => dispatch(responseLoaderDeactivate()))
        },
        onGetUserAnswers: (userType, next, userId, getAvatarFromFirebase) => {
            dispatch(answersLoaderActivate())

            dispatch(getUserAnswers(userType, next, userId))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'ANSWERS_UPDATE_RESULTS_COUNT', payload:data.data.count})
                    dispatch({type : 'RESPONSE_UPDATE_ANSWERS', payload:data.data.results}) 
                    data.data.results.map((item) => {
                        getAvatarFromFirebase(userId, item.id, userType)
                    })
                }
            })
            .then(response => dispatch(answersLoaderDeactivate()))
        },
        onNullifyValues: () => {
            dispatch({type : 'RESPONSE_NULLIFY_VALUES', payload:null})
        },
        onNullifyAnswers: () => {
            dispatch({type : 'RESPONSE_NULLIFY_ANSWERS', payload:null})
        },
        onSetValuePhoto: (photo, id, userType) => {
            if (userType === 'worker')
            dispatch({type : 'SEARCH_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
            else 
            dispatch({type : 'SEARCH_UPDATE_ANSWERS_PHOTO', payload:{photo:photo, id:id}})

        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ResponsePopup);