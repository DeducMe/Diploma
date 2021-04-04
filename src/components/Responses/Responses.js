import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import {getUserResponses, getUserAnswers} from '../../actions/serverConnections'
import {responseLoaderActivate, responseLoaderDeactivate, answersLoaderActivate, answersLoaderDeactivate} from '../../actions/asyncDispatch'
import {userTypeToUrlUserType} from '../../scripts/commonScripts'
import fileUploader from '../../actions/fileUploader';
import { Link } from 'react-router-dom'
import './responses.css'
import dropdownArrow from '../../img/right-arrow.svg'

// здесь пришлось делать два запроса на одной странице, потому что бекендер ленивое чмо (ОБА ЕЩЕ И ЧЕРЕЗ ПАГИНАЦИЮ)
// с пагинацией пока не очень понятно что делать. 
// прокачана стрессоустойчивость и решение нестандартаных задач

class Responses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedId:0
        };
    }

    getAvatarFromFirebase = (id, pk, userType) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url фотографии. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk, userType))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk, userType))
    }

    invertUserType(type){
        return type === 'employer' ? 'worker' : 'employer'
    }

    getProfileLink = (userType) =>{
        
    }

    componentDidMount(){
        console.log(this.props.userState.id)
        this.props.onGetUserResponses(this.props.userState.user_type, this.props.responseState.nextValues, this.props.userState.id, this.getAvatarFromFirebase)
        this.props.onGetUserAnswers(this.props.userState.user_type, this.props.responseState.nextAnswers, this.props.userState.id, this.getAvatarFromFirebase)

    }

    render() {
        if (this.props.responseState.responseLoading || this.props.responseState.answersLoading) 
            return <Loader></Loader>

        else
            return (
                <section className="responses">
                    <div className="responses__header">
                        <h2 className="f-extra-large bold">Ваши отклики и приглашения:</h2>
                    </div>
                    <ul className="responses__list rounded">
                        {this.props.responseState.responseValues.map((item, index)=>{
                        return (
                        <li key={index} className="responses__list-el rounded">
                            <div className="responses__list-el__header">
                                <Link className="responses__list-el__header__link">
                                    <h3 className="underline-link f-medium semi">Frontend junior developer</h3>
                                </Link>
                                <button className="responses__list-el__header__btn"></button>

                                <p className="responses__list-el__header__response-date semi">{item.date_response}</p>
                                {item.state === 'sent' ? 
                                <p>Вакансия не просмотрена</p>
                                : item.state === 'viewed' ?
                                <p>Вакансия просмотрена</p>
                                : item.state === 'rejected' ? 
                                <p>Отказ</p>
                                : item.state === 'accepted' ? 
                                <p>Приглашение</p>
                                : ''}
                            </div>

                            <div className="responses__list-el__body opened">
                                <div className="responses__reciever">
                                    <Link to={"/"+userTypeToUrlUserType(this.invertUserType(this.props.userState.user_type))+"/" + item.reciever}>
                                        <img className="responses__avatar" src="" alt="" />
                                    </Link>
                                    {item.state === 'sent' ? 
                                        <p className="responses__message">Ответа пока нет :(</p>
                                    : item.state === 'viewed' ?
                                        <p className="responses__message">Ответа пока нет, но резюме уже посмотрели!</p>
                                    : item.state === 'rejected' ? 
                                        <p className="responses__message responded">{this.props.responseState.responseAnswers.find(answer => answer.reciever === item.sender)}</p>
                                    : item.state === 'accepted' ? 
                                        <p className="responses__message responded">{this.props.responseState.responseAnswers.find(answer => answer.reciever === item.sender)}</p>
                                    : ''}
                                    
                                </div>
                                <div className="responses-control-block">
                                    <img className="responses-control-block__arrow" src={dropdownArrow} alt="dropdown-arrow" />
                                    <button>Развернуть</button>
                                    
                                </div>
                                {this.props.responseState.responseAnswers.find(answer => answer.reciever === item.sender) === -1 && item.state !== 'rejected' && item.state !== 'accepted'?
                                <div className="responses__sender">
                                    <button>принять</button>
                                    <button>отказать</button>

                                </div>
                                :
                                <div className="responses__sender">
                                    <p className="responses__message rounded responded">
                                        {item.message}
                                    </p>
                                    <Link to={"/" + userTypeToUrlUserType(this.props.userState.user_type) + "/" + item.reciever}>
                                        <img className="responses__avatar" src={this.props.userAvatar} alt="" />
                                    </Link>
                                </div>}
                                

                            </div>
                        </li>)
                        })}

                    </ul>
                </section>
            )
    }
}

const mapStateToProps = (state) =>{
    return {
        userState:state.user.user,
        responseState:state.response,
        userAvatar:state.nav.avatar
    }
}
  

const mapDispatchToProps = (dispatch) =>{
    return{
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
                    dispatch({type : 'ANSWERS_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.map((item) => {
                        getAvatarFromFirebase(userId, item.id, userType)
                    })
                }
            })
            .then(response => dispatch(answersLoaderDeactivate()))
        },
        onSetValuePhoto: (photo, id, userType) => {
            if (userType === 'worker')
            dispatch({type : 'SEARCH_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
            else 
            dispatch({type : 'SEARCH_UPDATE_ANSWERS_PHOTO', payload:{photo:photo, id:id}})

        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Responses);