import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchSide from './SearchSide/SearchSide.js'
import SearchMain from './SearchMain/SearchMain.js'

import './search.css'

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
                {this.props.searchState.searchLoading === false ?
                    <h2 className="search-query-header">По запросу "{this.props.searchOptions.phrase}" найдено {this.props.searchState.searchCount} {this.checkSearchType()}</h2>
                :
                    <h2 className="search-query-header">Идет загрузка...</h2>}

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
        searchOptions:state.search.searchOptions,
        searchState:state.search,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)