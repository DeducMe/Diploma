import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./searchPanel.css"
import {getSearchQueries} from '../../../actions/serverConnections'
import fileUploader from '../../../actions/fileUploader';
import {searchLoaderDeactivate, searchLoaderActivate, searchNullifyValues} from '../../../actions/asyncDispatch'
import {parseOptions} from '../../../scripts/commonScripts'
import {Link} from 'react-router-dom'


class SearchPanel extends Component {
    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }


    redirectToSearch = (e) => {
        e.preventDefault()
        this.props.onSetSearchOptions({searchType:e.target.searchPanelSearchType.value, phrase: e.target.searchPanelQueryInput.value})

        this.props.history.push("/search");
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.redirectToSearch.bind(this)}>
                <input type="text" className="search-form__input" id="searchPanelQueryInput" name="searchPanelQueryInput" placeholder="Поиск..." />

                <select className="search-form__dropdown-menu f-medium semi" id="searchPanelSearchType" name="searchPanelSearchType" >
                    <option value="vacancy">Вакансии</option>
                    <option value="cv">Резюме</option>
                    <option value="employers">Компании</option>
                </select>
                
                <input className="search-form__submit highlighted" type="submit" value="Поиск"/>
                <Link to="/search">
                    <button className="more-filters-btn"></button>
                </Link>
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
