import React, { Component } from 'react'
import SearchSide from './SearchSide/SearchSide.js'
import SearchMain from './SearchMain/SearchMain.js'


export default class Search extends Component {
    render() {
        return (
            <div className="container">
                <h2>По запросу "{}" найдено {} {}</h2>
                <SearchSide></SearchSide>
                <SearchMain></SearchMain>
            </div>
        )
    }
}
