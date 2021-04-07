import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'
import {getUserResponses, getUserAnswers} from '../../actions/serverConnections'
import {responseLoaderActivate, responseLoaderDeactivate, answersLoaderActivate, answersLoaderDeactivate} from '../../actions/asyncDispatch'
import {userTypeToUrlUserType, getNormalUserType, userTypeToSearchType, simplifyDate} from '../../scripts/commonScripts'
import fileUploader from '../../actions/fileUploader';
import { Link } from 'react-router-dom'
import './responses.css'
import dropdownArrow from '../../img/right-arrow.svg'
import ResponsePopup from './ResponsePopup'
import VacancyPopup from '../VacancyPopup/VacancyPopup'


// здесь пришлось делать два запроса на одной странице, потому что бекендер ленивое чмо (ОБА ЕЩЕ И ЧЕРЕЗ ПАГИНАЦИЮ)
// с пагинацией пока не очень понятно что делать. 
// прокачана стрессоустойчивость и решение нестандартаных задач

class Responses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedId:-1
        };
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url фотографии. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }

    invertUserType(type){
        return type === 'employer' ? 'worker' : 'employer'
    }

    openVacancyInfo = (id) =>{
        this.props.onOpenVacancyInfo(id)
    }
    
    openResponsePopup = (index, state) => {
        this.props.onOpenResponsePopup(index, state)
    }

    getInvites = () =>{
        return this.props.responseState.responseAnswers.filter((item) => 
            this.props.responseState.responseValues.find(value => value.vacancy === item.vacancy && value.cv === item.cv) === undefined
        )
    }
    componentDidMount(){
        this.props.onNullifyValues()
        this.props.onNullifyAnswers()
        console.log(this.props.userState.id)

        const userType = getNormalUserType(this.props.userState.user_type) // а это прекрасный костыль, чтобы обойти говнорукость бэкендера. В userState у нас тип юзера employee, а во всех юрлах нам нужен worker
        this.props.onGetUserResponses(userType, this.props.responseState.nextValues, this.props.userState.id, this.getAvatarFromFirebase)
        this.props.onGetUserAnswers(userType, this.props.responseState.nextAnswers, this.props.userState.id, this.getAvatarFromFirebase)

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
                    {this.props.responseState.responseValues.length !== 0 || this.props.responseState.responseAnswers.length !== 0 ? 
                        <ul className="responses__list rounded">
                        {this.getInvites().map((item, index)=> 
                            <li key={index} className="responses__list-el rounded">
                            <div className="responses__list-el__header">
                                <button className="responses__list-el__header__link" onClick={this.openVacancyInfo.bind(this, item.vacancy)}>
                                    <h3 className="underline-link f-medium semi">{item.vacancy_name}</h3>
                                </button>
                                <button className="responses__list-el__header__btn"></button>

                                <p className="responses__list-el__header__response-date semi">{simplifyDate(item.date_response)}</p>
                                
                                <p className="green">Приглашение</p>
                            </div>

                            <div className="responses__list-el__body opened">
                                <div className="responses__reciever responded">
                                    <Link to={"/"+userTypeToUrlUserType(this.invertUserType(this.props.userState.user_type))+"/" + item[this.invertUserType(this.props.userState.user_type)]}>
                                        <img className="responses__avatar" src={item[this.invertUserType(this.props.userState.user_type)+ '_avatar'] === '' ? 'https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54' : item[this.invertUserType(this.props.userState.user_type)+'_avatar']} alt="" />
                                    </Link>
                                        <p className="responses__message rounded">{item.message}</p>
                                    
                                    <span className="responses__decoration"></span>
                                </div>
                                    
                                {/* <div className="responses-control-block">
                                    <img className="responses-control-block__arrow" src={dropdownArrow} alt="dropdown-arrow" />
                                    <button onClick={this.openResponseInfo.bind(this, item.id)}>Развернуть</button>
                                </div> */}   
                                {/* тут я мучаюсь с индексом */}

                                <div className="responses__sender controls">
                                    <button className="sup-btn" onClick={this.openResponsePopup.bind(this, index, 'accepted')}>принять</button>
                                    <button className="sup-btn" onClick={this.openResponsePopup.bind(this, index), 'rejected'}>отказать</button>
                                    {this.props.responseState.openedResponseId === index ? 
                                    <ResponsePopup
                                    item ={{
                                        'owner_id':item[this.invertUserType(this.props.userState.user_type)],
                                        'pk':item[userTypeToSearchType(this.invertUserType(this.props.userState.user_type))],
                                        'state': this.props.responseState.responseSendState
                                    }}></ResponsePopup> : ''}
                                </div>
                            </div>
                            <div className="responses__list-el__footer"></div>

                        </li>
                        )}
                        {this.props.responseState.responseValues.map((item, index)=>{
                        return (
                        <li key={index} className="responses__list-el rounded">
                            <div className="responses__list-el__header">
                                <button className="responses__list-el__header__link" onClick={this.openVacancyInfo.bind(this, item.vacancy)}>
                                    <h3 className="underline-link f-medium semi">{item.vacancy_name}</h3>
                                </button>
                                <button className="responses__list-el__header__btn"></button>

                                <p className="responses__list-el__header__response-date semi">{simplifyDate(item.date_response)}</p>
                                {item.state === 'sent' ? 
                                <p>Вакансия не просмотрена</p>
                                : item.state === 'viewed' ?
                                <p className="yellow">Вакансия просмотрена</p>
                                : item.state === 'rejected' ? 
                                <p className="red">Отказ</p>
                                : item.state === 'accepted' ? 
                                <p className="green">Приглашение</p>
                                : ''}
                            </div>

                            <div className="responses__list-el__body opened">
                                <div className={"responses__reciever " + (item.state === 'rejected' || item.state === 'accepted' ? 'responded' : '')}>
                                    <Link to={"/"+userTypeToUrlUserType(this.invertUserType(this.props.userState.user_type))+"/" + item[this.invertUserType(this.props.userState.user_type)]}>
                                        <img className="responses__avatar" src={item[this.invertUserType(this.props.userState.user_type)+ '_avatar'] === '' ? 'https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54' : item[this.invertUserType(this.props.userState.user_type)+'_avatar']} alt="" />
                                    </Link>
                                    {item.state === 'sent' ? 
                                        <p className="responses__message rounded">Ответа пока нет :( </p>
                                    : item.state === 'viewed' ?
                                        <p className="responses__message rounded">Ответа пока нет, но резюме уже посмотрели!</p>
                                    : item.state === 'accepted' || item.state === 'rejected' ?
                                        <p className="responses__message rounded">{this.props.responseState.responseAnswers.find(answer => answer.vacancy === item.vacancy || answer.cv === item.cv).message}</p>
                                    :''}
                                    
                                    <span className="responses__decoration"></span>
                                </div>
                                
                                {/* <div className="responses-control-block">
                                    <img className="responses-control-block__arrow" src={dropdownArrow} alt="dropdown-arrow" />
                                    <button onClick={this.openResponseInfo.bind(this, item.id)}>Развернуть</button>
                                </div> */}   
                                {/* тут я мучаюсь с индексом */}

                                <div className="responses__sender responded">
                                    <p className="responses__message rounded">
                                        {item.message}
                                    </p>
                                    <span className="responses__decoration "></span>

                                    <Link to={"/" + userTypeToUrlUserType(this.props.userState.user_type) + "/" + this.props.userState.id}>
                                        <img className="responses__avatar" src={this.props.userAvatar} alt="" />
                                    </Link>
                                </div>
                                

                            </div>

                            <div className="responses__list-el__footer"></div>

                        </li>)
                        })}

                    </ul>
                    : <p>Откликов нет :(</p>}
                    {this.props.responseState.openedVacancyId !== -1 ? <VacancyPopup id={this.props.responseState.openedVacancyId}></VacancyPopup> : <p>cringe</p>}
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
                        getAvatarFromFirebase(userId, item.id)
                    })
                }
            })
            .then(response => dispatch(answersLoaderDeactivate()))
        },
        onSetValuePhoto: (photo, id) => {
            dispatch({type : 'RESPONSE_UPDATE_ANSWERS_PHOTO', payload:{photo:photo, id:id}})
        },
        onNullifyValues: () => {
            dispatch({type : 'RESPONSE_NULLIFY_VALUES', payload:null})
        },
        onNullifyAnswers: () => {
            dispatch({type : 'RESPONSE_NULLIFY_ANSWERS', payload:null})
        },
        onOpenResponsePopup: (index, state) => {
            console.log(index)
            dispatch({type : 'RESPONSE_OPEN_RESPONSE_POPUP', payload:{index:index, state:state}})
        },
        onOpenVacancyInfo: (id) =>{
            dispatch({type : 'OPEN_VACANCY_POPUP', payload:id})
        }

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Responses);