import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchSide from './SearchSide/SearchSide.js'
import SearchMain from './SearchMain/SearchMain.js'

import './search.css'

import {getSearchQueries} from '../../actions/serverConnections'


class Search extends Component {
    parseOptions(options){
        return Object
        .keys(options)
        .map(k => (options[k] !== null && k !== 'searchType') ? encodeURIComponent(k) + '=' + encodeURIComponent(options[k]) + '&': null)
        .join('')
    }

    checkSearchType = () => {
        if (this.props.searchOptions.searchType === 'vacancy'){
            return 'вакансий'
        }
        if (this.props.searchOptions.searchType === 'cv'){
            return 'резюме'
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="search-query-header">По запросу "{this.props.searchOptions.phrase}" найдено {this.props.searchValues.length} {this.checkSearchType()}</h2>

                <div className="search-page">
                    <SearchSide></SearchSide>
                    <SearchMain></SearchMain>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cropperMaxWidth:state.profile.buf.cropper.maxWidth,
        searchValues:state.search.searchValues,
        searchOptions:state.search.searchOptions

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)