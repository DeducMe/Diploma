import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./searchPanel.css"
import {getSearchQueries} from '../../../actions/serverConnections'
import fileUploader from '../../../actions/fileUploader';
import {searchLoaderDeactivate, searchLoaderActivate} from '../../../actions/asyncDispatch'


class SearchPanel extends Component {
    parseOptions(options){
        return Object
        .keys(options)
        .map(k => {
            if (options[k] !== null && k !== 'searchType'){
                if (Array.isArray(options[k]) && options[k].length === 0) return null
                return encodeURIComponent(k) + '=' + encodeURIComponent(options[k]) + '&'
            }
            return null   
        })
        .join('')
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }


    redirectToSearch = (nullify, e) => {
        e.preventDefault()
        this.props.onSetSearchOptions({searchType:e.target.searchPanelSearchType.value, phrase: e.target.searchPanelQueryInput.value})
        if (nullify) this.props.onNullifyValues()
        if (this.props.searchState.searchLoading === false){
            
            this.props.onGetSearchResponse(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType, this.props.searchState.next, this.getAvatarFromFirebase)
            
        }
        this.props.history.push("/search");
    }

    changeSearchQuery = (e) =>{
        console.log(this.props.searchOptions.phrase)
        this.props.onChangeSearchQuery(e.target.value)
    }

    changeSearchType = (e) =>{
        this.props.onChangeSearchType(e.target.value)
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.redirectToSearch.bind(this, true)}>
                <input type="text" className="search-form__input" id="searchPanelQueryInput" name="searchPanelQueryInput" placeholder="Поиск..." onChange={this.changeSearchQuery.bind(this)} />

                <select className="search-form__dropdown-menu f-medium semi" id="searchPanelSearchType" name="searchPanelSearchType" onChange={this.changeSearchType.bind(this)}>
                    <option value="vacancy">Вакансии</option>
                    <option value="cv">Резюме</option>
                    <option value="employers">Компании</option>
                </select>

                <input className="search-form__submit highlighted" type="submit" value="Поиск"/>

                <button className="more-filters-btn" onClick={this.redirectToSearch.bind(this, true)}></button>

            </form>

        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        history:ownProps.history,
        searchOptions:state.search.searchOptions,
        searchState:state.search
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
         
        onSetSearchOptions: (options) => {
            dispatch({type : 'SEARCH_SET_OPTIONS', payload:options})
        },
        onNullifyValues: () => {
            dispatch({type : 'SEARCH_NULLIFY_VALUES', payload:null})
        },
        onGetSearchResponse:(options, searchType, next, getAvatarFromFirebase)=>{
            dispatch(searchLoaderActivate())
            dispatch(getSearchQueries(options, searchType, next))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_RESULTS_COUNT', payload:data.data.count})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.map((item) => {
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
        onChangeSearchQuery: (query) => {
            dispatch({type : 'CHANGE_SEARCH_QUERY', payload:query})
        }, 
        onChangeSearchType: (searchType) => {
            dispatch({type : 'CHANGE_SEARCH_TYPE', payload:searchType})
        }, 
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
