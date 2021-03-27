import e from 'cors'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSearchQueries} from '../../../actions/serverConnections'
import {searchLoaderDeactivate, searchLoaderActivate} from '../../../actions/asyncDispatch'

import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import fileUploader from '../../../actions/fileUploader';
import {getGradeValues, getWorkTypeValues} from '../../../scripts/commonScripts'


class SearchMain extends Component {

    sortByValue(arr, value, sortMethod){
        sortMethod === 'asc' ? (
            arr.sort((a, b) => a[value] - b[value])
        ) : (
            arr.sort((a, b) => b[value] - a[value])
        )
        
    }

    parseOptions(options){
        return Object
        .keys(options)
        .map(k => (options[k] !== null && k !== 'searchType') ? encodeURIComponent(k) + '=' + encodeURIComponent(options[k]) + '&': null)
        .join('')
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
        }
        this.props.onNullifyValues()
        this.props.onUpdateValues(values)
    }

    changeSearchQuery(e){
        this.props.onChangeSearchQuery(e.target.value)
    }

    getSearchValues = (e) => {
        e.preventDefault()
        this.props.onNullifyValues()
        if (this.props.searchState.searchLoading === false){
            this.props.onGetSearchResponse(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType)
            console.log('b')
        }
        // this.props.onGetSearchQueries(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType)

    }

    componentDidMount(){
        this.props.onUpdateValues(this.props.searchValues)
    }

    getAvatarFromFirebase(id, index){   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        try{
            const storageRef = fileUploader.storage().ref()
            const fileRef = storageRef.child('user-avatar' + id)
            fileRef.getDownloadURL()
            .then((response) => this.props.onSetValuePhoto(response, index))
            .catch(err=>this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', index))
        }
        catch{
            this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', index)
        }

        
    }

    render() {
        return (
            <section className="search-main">
                <div className="search-main__controls">
                    <form className="search-main__controls-form rounded" onSubmit={this.getSearchValues.bind(this)}>
                        <div className="search-input rounded">
                            <input type="text" id="queryInput" name="queryInput" placeholder="Поиск..." onChange={this.changeSearchQuery.bind(this)} value={this.props.searchOptions.phrase}/>
                            <button type="submit" className="sup-btn">Найти</button>
                        </div>

                        <select className="search-main__controls__sort-type-select" name="salarySortType" id="" onChange={this.sortSearch.bind(this)}>
                            <option value="salaryAsc">по возрастанию зарплаты</option>
                            <option value="salaryDesc">по убыванию зарплаты</option>
                        </select>

                        <select className="search-main__controls__sort-type-select" name="dateSortType" id="" onChange={this.sortSearch.bind(this)}>
                            <option value="dateAsc">начиная с новых</option>
                            <option value="dateDesc">начиная со старых</option>
                        </select>
                        <div className="search-main__controls__check-container check-container">
                            <input type="checkbox" className="search-main__controls__sort-type-check" name="strictCheckBox" id=""/>
                            <label htmlFor="strictCheckBox">Строгий поиск</label>
                        </div>
                        
                    </form>
                </div>
                <ul className="search-main__search-items-list">
                    {this.props.searchValues.map((item, index) => {
                        if (item.photo_url === "") this.getAvatarFromFirebase(item.owner_id, index)

                        return(
                            <li key={index} className="resume resumes-list-el rounded">
                                <section className="resume-main">
                                    <div className={"resume__header white top-rounded" }>
                                    {/* + this.props.item.bg_header_color */}
                                        
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{item.vacancy_name}</h2>
                                            <p>
                                                {item.salary === -1 ? <span className="resume__header__salary bold f-medium">Зарплата не указана</span>:
                                                <span className="resume__header__salary bold f-medium">{item.salary} руб.</span>}
                                            </p>
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{getGradeValues(item.grade)}</p>
                                            <p className="resume__publication-date sup">{item.pub_date.slice(0, 10)}</p>
                                        </div>
                                        
                                    </div>
            
                                    <div className="resume__main-info rounded flex">
                                        <div className="resume__main-info__text">
                                            <p className="resume__industry f-pre">{item.industry}</p>
            
                                            <p className="resume__work-type">{item.work_type.map((item)=>getWorkTypeValues(item)).join(', ')}</p>

                                            <p className="resume__about">{item.about || item.leading}</p>
                                        </div>
                                        
            
                                        {/* <ul className="resume__tags-list">
                                            {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                        </ul> */}
                                        <div className="resume__main-info__avatar-name-block">
                                            <img className="avatar-name-block__small-avatar" src={item.photo_url} alt="аватар"/>
                                            <p>{item.owner}</p>
                                        </div>
                                    </div>
                                </section>
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
    }
}


const mapStateToProps = (state) =>{
    return {
        searchState:state.search,
        searchOptions:state.search.searchOptions,
        searchValues:state.search.searchValues,

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
        onChangeSearchQuery: (query) => {
            dispatch({type : 'CHANGE_SEARCH_QUERY', payload:query})
        },
        onGetSearchQueries: (options, searchType) => {
            dispatch(getSearchQueries(options, searchType))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                }
            })
        },
        onGetSearchResponse:(options,searchType)=>{
            dispatch(searchLoaderActivate())
            dispatch(getSearchQueries(options, searchType))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                }
                return null
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