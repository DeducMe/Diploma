import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSearchQueries, addFavourite, deleteFavourite} from '../../../actions/serverConnections'
import {searchLoaderDeactivate, searchLoaderActivate} from '../../../actions/asyncDispatch'

import ResponsePopup from '../../ResponsePopup/ResponsePopup'
import fileUploader from '../../../actions/fileUploader';
import {getGradeValues, getWorkTypeValues, parseOptions, searchTypeToUserType} from '../../../scripts/commonScripts'
import { InView } from "react-intersection-observer";
import { Link } from 'react-router-dom'
import Loader from '../../Loader/Loader'


class SearchMain extends Component {
    sortByValue(arr, value, sortMethod){
        sortMethod === 'asc' ? (
            arr.sort((a, b) => a[value] - b[value])
        ) : (
            arr.sort((a, b) => b[value] - a[value])
        )
    }

    sortSearch = (e) => {
        const sortProp = e.target.value
        let values = this.props.searchValues

        switch (sortProp) {
            case 'salaryAsc':
                this.sortByValue(values, 'salary', 'asc')
                break;

            case 'salaryDesc':
                this.sortByValue(values, 'salary', 'desc')
                break;

            case 'dateAsc':
                this.sortByValue(values, 'pub-date', 'asc')
                break;

            case 'dateDesc':
                this.sortByValue(values, 'pub-date', 'desc')
                break;
            default:
                break;
        }
        this.props.onSortValues(values)
    }

    searchBtnClick = (e) =>{
        e.preventDefault()
        this.props.onChangeSearchQuery(e.target.queryInput.value)
        this.getSearchValues(true)
    }

    getSearchValues = (nullify) => {
        if (nullify) this.props.onNullifyValues()
        if (this.props.searchState.searchLoading === false){
            this.props.onSearchLoaderActivate()
            
            this.props.onGetSearchResponse(parseOptions(this.props.searchOptions), this.props.searchOptions.searchType, this.props.searchState.next, this.getAvatarFromFirebase)
            
        }
    }

    addToFavourites = (index) => {
        this.props.onAddToFavourites(index, this.props.searchOptions.searchType)
    }

    deleteFromFavourites = (index) => {
        this.props.onDeleteFromFavourites(index, this.props.searchOptions.searchType)
    }
    
    openResponsePopup = (index) => {
        this.props.onOpenResponsePopup(index)
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }

    render() {
        return (
            <section className="search-main">
                <div className="search-main__controls">
                    <form className="search-main__controls-form rounded" > 
                    {/* onSubmit={this.searchBtnClick.bind(this)} */}
                        {/* <div className="search-input rounded">
                            <input type="text" id="queryInput" name="queryInput" placeholder="Поиск..." />
                            <button type="submit" className="sup-btn">Найти</button>
                        </div> */}

                        <select className="search-main__controls__sort-type-select" name="salarySortType" id="" onChange={this.sortSearch.bind(this)}>
                            <option value="salaryAsc">по возрастанию зарплаты</option>
                            <option value="salaryDesc">по убыванию зарплаты</option>
                        </select>

                        <select className="search-main__controls__sort-type-select" name="dateSortType" id="" onChange={this.sortSearch.bind(this)}>
                            <option value="dateAsc">начиная с новых</option>
                            <option value="dateDesc">начиная со старых</option>
                        </select>
                        {/* <div className="search-main__controls__check-container check-container">
                            <input type="checkbox" className="search-main__controls__sort-type-check" name="strictCheckBox" id="strictCheckBox"/>
                            <label htmlFor="strictCheckBox">Строгий поиск</label>
                        </div> */}
                        
                    </form>
                </div>
                <ul className="search-main__search-items-list">
                    {this.props.searchState.searchLoading === false ? this.props.searchValues.map((item, index) => {
                        return(
                            <li key={index} className="resume resumes-list-el rounded">
                                <section className="resume-main">
                                    <div className={"resume__header white top-rounded " + item.bg_header_color }>
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{item.vacancy_name}</h2>
                                            {item.salary === -1 ? <span className="resume__header__salary bold f-medium">Зарплата не указана</span>:
                                            <span className="resume__header__salary bold f-medium">{item.salary} руб.</span>}
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{getGradeValues(item.grade)}</p>
                                            <p className="resume__publication-date sup">{item.pub_date.slice(0, 10)}</p>
                                        </div>
                                        
                                    </div>
            
                                    <div className="resume__main-info bottom-rounded flex">
                                        <div className="resume__main-info__text">
                                            <p className="resume__industry f-pre">{item.industry}</p>
                                            
                                            <p className="resume__work-type">{item.work_type.map((item)=>getWorkTypeValues(item)).join(', ')}</p>

                                            <p className="resume__about">{item.about || item.leading}</p>
                                        </div>
                                        
            
                                        {/* <ul className="resume__tags-list">
                                            {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                        </ul> */}
                                        <Link className="resume__main-info__avatar-name-block" to={"/"+searchTypeToUserType(this.props.searchOptions.searchType)+"/" + item.owner_id}>
                                            <img className="avatar-name-block__small-avatar" src={item.photo_url} alt="аватар"/>
                                            <p>{item.owner}</p>
                                        </Link>
                                    </div>
                                    {this.props.searchOptions.searchType === 'vacancy' && this.props.userState.user_type === 'employee' ?
                                        <div className="vacancy-control-block">
                                            <div className="vacancy-control-block__response-block">
                                                {
                                                    item.got_responsed === true ? <p className="green">Вы уже откликнулись!</p>
                                                    :<p className="underline-link" onClick={this.openResponsePopup.bind(this, index)}>Откликнуться</p>
                                                }
                                                
                                                {this.props.searchState.openedResponseId === index ? <ResponsePopup item={item} onClick={this.openResponsePopup}></ResponsePopup> : ''}
                                            </div>
                                            {
                                                item.favorite === true ? <p className="green underline-link" onClick={this.deleteFromFavourites.bind(this, item.pk)}>Добавлено в избранное!</p>
                                                : <p className="underline-link" onClick={this.addToFavourites.bind(this, item.pk)}>Добавить в избранное</p>
                                            }
                                        </div>
                                    : this.props.searchOptions.searchType === 'cv' && this.props.userState.user_type === 'employer' ?
                                        <div className="vacancy-control-block">
                                            <div className="vacancy-control-block__response-block">
                                                {
                                                    item.got_responsed === true ? <p className="green underline-link" onClick={this.deleteFromFavourites.bind(this, item.pk)}>Вы уже пригласили!</p>
                                                    :<p className="underline-link" onClick={this.openResponsePopup.bind(this, index)}>Откликнуться</p>
                                                }
                                                {this.props.searchState.openedResponseId === index ? <ResponsePopup item={item} onClick={this.openResponsePopup}></ResponsePopup> : ''}
                                            </div>
                                            {
                                                item.favorite === true ? <p className="green">Добавлено в избранное!</p>
                                                : <p className="underline-link" onClick={this.addToFavourites.bind(this, item.pk)}>Добавить в избранное</p>
                                            }
                                        </div>
                                    : ''
                                    }
                                </section>
                            </li>
                        )
                    }):''}
                    <Loader active={this.props.searchLoading}></Loader>
                </ul>
                <InView as="div" onChange={(inView, entry) => {
                    if (inView) this.getSearchValues(false, true)}}>
                </InView>

            </section>
        )
    }
}


const mapStateToProps = (state) =>{
    return {
        searchState:state.search,
        searchOptions:state.search.searchOptions,
        searchValues:state.search.searchValues,
        userState:state.user.user,
        searchLoading:state.search.searchLoading
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onNullifyValues: () => {
            dispatch({type : 'SEARCH_NULLIFY_VALUES', payload:null})
        },
        onUpdateValues: (values) => {
            dispatch({type : 'SEARCH_UPDATE_VALUES', payload:values})
        },
        onSortValues: (values) => {
            dispatch({type : 'SEARCH_SORT_VALUES', payload:values})
        },
        onChangeSearchQuery: (query) => {
            dispatch({type : 'CHANGE_SEARCH_QUERY', payload:query})
        },
        onOpenResponsePopup: (index) => {
            dispatch({type : 'OPEN_RESPONSE_POPUP', payload:index})
        },
        onAddToFavourites:(pk, type) => {
            dispatch(addFavourite(type, pk))
            dispatch({type : 'ADD_TO_FAVOURITES', payload:pk})
        },
        onDeleteFromFavourites:(pk, type) => {
            dispatch(deleteFavourite(type, pk))
            dispatch({type : 'DELETE_FROM_FAVOURITES', payload:pk})
        },
        onSearchLoaderActivate: () => {
            dispatch(searchLoaderActivate())
        },
        onGetSearchResponse:(options, searchType, next, getAvatarFromFirebase)=>{
            dispatch(searchLoaderActivate())
            dispatch(getSearchQueries(options, searchType, next))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_RESULTS_COUNT', payload:data.data.count})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.forEach((item) => {
                        if (item.photo_url === "") getAvatarFromFirebase(item.owner_id, item.pk)
                    })
                }
            })
            .then(response => dispatch(searchLoaderDeactivate()))
            
        },
        onSetValuePhoto: (photo, id) => {
            console.log('photo')
            dispatch({type : 'SEARCH_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchMain);