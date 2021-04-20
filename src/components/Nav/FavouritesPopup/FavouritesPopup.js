import React, { Component } from 'react'
import {getFavouritesQuery} from '../../../actions/serverConnections'
import fileUploader from '../../../actions/fileUploader'
import {userTypeToSearchType} from '../../../scripts/commonScripts'
import { connect } from 'react-redux'
import {favouritesLoaderDeactivate, favouritesLoaderActivate} from '../../../actions/asyncDispatch'

import ResponsePopup from '../../ResponsePopup/ResponsePopup'
import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import {getGradeValues, getWorkTypeValues, invertUserType} from '../../../scripts/commonScripts'
import { InView } from "react-intersection-observer";
import { Link } from 'react-router-dom'
import Loader from '../../Loader/Loader'

class FavouritesPopup extends Component {
    popupClose = () =>{
        this.props.onCloseFavouritesPopup()
    }

    checkZoneClick(e){
        if (e.target.id === 'favouritesBlurBox'){
            this.popupClose()
        }
    }

    getFavouritesValues = (nullify) => {
        if (nullify) this.props.onNullifyValues()
        console.log(this.props.favouritesState)
        if (this.props.favouritesState.favouritesLoading === false){
            this.props.onFavouritesLoaderActivate()
            
            this.props.onGetFavouritesResponse(userTypeToSearchType(invertUserType(this.props.userState.user_type)), this.props.favouritesState.next, this.getAvatarFromFirebase)
        }
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }

    componentDidMount(){
        this.getFavouritesValues(true)
    }

    render() {
        return (
            <div className="blur-box active" onClick={this.checkZoneClick.bind(this)} id="favouritesBlurBox">
                <div className="popup-wrapper rounded">
                    <h2 className="popup-header">Избранное</h2>
                    <ul className="favourites-main__favourites-items-list">
                    {this.props.favouritesState.favouritesLoading === false ?
                    this.props.favouritesValues.length !== 0 ? 
                    this.props.favouritesValues.map((item, index) => {
                        // item = item[item.item_type]
                        return(
                            <li key={index} className="resume resumes-list-el rounded">
                                {console.log(item)}
                                <section className="resume-main">
                                    <div className={"resume__header white top-rounded " + item[item.item_type].bg_header_color }>
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{item[item.item_type].vacancy_name}</h2>
                                            <p>
                                                {item[item.item_type].salary === -1 ? <span className="resume__header__salary bold f-medium">Зарплата не указана</span>:
                                                <span className="resume__header__salary bold f-medium">{item[item.item_type].salary} руб.</span>}
                                            </p>
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{getGradeValues(item[item.item_type].grade)}</p>
                                            <p className="resume__publication-date sup">{item[item.item_type].pub_date.slice(0, 10)}</p>
                                        </div>
                                        
                                    </div>
            
                                    <div className="resume__main-info bottom-rounded flex">
                                        <div className="resume__main-info__text">
                                            <p className="resume__industry f-pre">{item[item.item_type].industry}</p>
            
                                            <p className="resume__work-type">{item[item.item_type].work_type.map((item)=>getWorkTypeValues(item)).join(', ')}</p>

                                            <p className="resume__about">{item[item.item_type].about || item[item.item_type].leading}</p>
                                        </div>
                                        
            
                                        {/* <ul className="resume__tags-list">
                                            {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                        </ul> */}
                                        <Link className="resume__main-info__avatar-name-block" to={"/"+userTypeToSearchType(invertUserType(this.props.userState.user_type))+"/" + item[item.item_type].owner_id}>
                                            <img className="avatar-name-block__small-avatar" src={item[item.item_type].photo_url} alt="аватар"/>
                                            <p>{item[item.item_type].owner}</p>
                                        </Link>
                                    </div>
                                    {this.props.favouritesOptions.favouritesType === 'vacancy' && this.props.userState.user_type === 'employee' ?
                                        <div className="vacancy-control-block">
                                            <div className="vacancy-control-block__response-block">
                                                <p className="underline-link" onClick={this.openResponsePopup.bind(this, index)}>Откликнуться</p>
                                                {this.props.favouritesState.openedResponseId === index ? <ResponsePopup item={item[item.item_type]} onClick={this.openResponsePopup}></ResponsePopup> : ''}
                                            </div>
                                            <p className="underline-link">Добавить в избранное</p>
                                        </div>
                                    : this.props.favouritesOptions.favouritesType === 'cv' && this.props.userState.user_type === 'employer' ?
                                        <div className="vacancy-control-block">
                                            <div className="vacancy-control-block__response-block">
                                                <p className="underline-link" onClick={this.openResponsePopup.bind(this, index)}>Пригласить</p>
                                                {this.props.favouritesState.openedResponseId === index ? <ResponsePopup item={item[item.item_type]} onClick={this.openResponsePopup}></ResponsePopup> : ''}
                                            </div>
                                            <p className="underline-link">Добавить в избранное</p>
                                        </div>
                                    : ''
                                    }
                                </section>
                            </li>
                        )
                    })
                    : this.props.favouritesState.error ? <div className="error-block rounded">На сервере технические шоколадки :(</div> 
                    : <div>У вас нет избранных вакансий :(</div>
                        :<Loader active={this.props.favouritesLoading}></Loader>}
                    </ul>
                </div>

                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        favouritesState:state.favourites,
        favouritesValues:state.favourites.favouritesValues,
        userState:state.user.user,
        favouritesLoading:state.favourites.favouritesLoading
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onNullifyValues: () => {
            dispatch({type : 'FAVOURITES_NULLIFY_VALUES', payload:null})
        },
        onUpdateValues: (values) => {
            dispatch({type : 'FAVOURITES_UPDATE_VALUES', payload:values})
        },
        onSortValues: (values) => {
            dispatch({type : 'FAVOURITES_SORT_VALUES', payload:values})
        },

        onOpenResponsePopup: (index) => {
            dispatch({type : 'OPEN_RESPONSE_POPUP', payload:index})
        },
        onFavouritesLoaderActivate: () => {
            dispatch(favouritesLoaderActivate())
        },
        onGetFavouritesResponse:(searchType, next, getAvatarFromFirebase)=>{
            dispatch(favouritesLoaderActivate())
            dispatch(getFavouritesQuery(searchType, next))
            .then((data)=>{
                console.log(data)
                if (data.data !== null){
                    dispatch({type : 'FAVOURITES_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.map((item) => {
                        if (item.photo_url === "") getAvatarFromFirebase(item.owner_id, item.pk)
                    })
                }
                else dispatch({type : 'FAVOURITES_VALUES_ERROR', payload:null}) 
            })
            .then(response => dispatch(favouritesLoaderDeactivate()))
        },
        onCloseFavouritesPopup: () => {
            dispatch({type : 'CLOSE_FAVOURITES_POPUP', payload:null})
        },
        onSetValuePhoto: (photo, id) => {
            console.log('photo')
            dispatch({type : 'FAVOURITES_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesPopup);
