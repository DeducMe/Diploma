import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./searchPanel.css"
import {getSearchQueries} from '../../../actions/serverConnections'


class SearchPanel extends Component {
    parseOptions(options){
        return Object
        .keys(options)
        .map(k => (options[k] !== null && k !== 'searchType') ? encodeURIComponent(k) + '=' + encodeURIComponent(options[k]) + '&': null)
        .join('')
    }

    redirectToSearch = (e) => {
        e.preventDefault()
        this.props.onSetSearchOptions({searchType:e.target.searchPanelSearchType.value, phrase: e.target.searchPanelQueryInput.value})
        this.props.onNullifyValues()
        this.props.onGetSearchQueries(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType)

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
            <form className="search-form" onSubmit={this.redirectToSearch.bind(this)}>
                <input type="text" className="search-form__input" id="searchPanelQueryInput" name="searchPanelQueryInput" placeholder="Поиск..." onChange={this.changeSearchQuery.bind(this)} />

                <select className="search-form__dropdown-menu f-medium semi" id="searchPanelSearchType" name="searchPanelSearchType" onChange={this.changeSearchType.bind(this)}>
                    <option value="vacancy">Вакансии</option>
                    <option value="cv">Резюме</option>
                    <option value="employers">Компании</option>
                </select>

                <input className="search-form__submit highlighted" type="submit" value="Поиск"/>

                <button className="more-filters-btn" onClick={this.redirectToSearch.bind(this)}></button>

            </form>

        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        history:ownProps.history,
        searchOptions:state.search.searchOptions
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
        onGetSearchQueries: (options, searchType) => {
            dispatch(getSearchQueries(options, searchType))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                }
            })
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
