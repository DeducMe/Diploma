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
        this.props.onSetSearchOptions({searchType:e.target.searchType.value, phrase: e.target.searchQuery.value})
        this.props.onNullifyValues()
        this.props.onGetSearchQueries(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType)

        this.props.history.push("/search");
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.redirectToSearch.bind(this)}>
                <input className="search-form__input" type="text" name="searchQuery" placeholder="Поиск..."/>

                <select className="search-form__dropdown-menu f-medium semi" name="searchType">
                    <option value="vacancy">Вакансии</option>
                    <option value="cv">Резюме</option>
                    <option value="company">Компании</option>
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
        }  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
