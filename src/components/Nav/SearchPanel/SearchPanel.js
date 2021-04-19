import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./searchPanel.css"

class SearchPanel extends Component {
    redirectToSearch = (e) => {
        e.preventDefault()
        this.props.onSetSearchOptions({searchType:e.target.searchPanelSearchType.value, phrase: e.target.searchPanelQueryInput.value})

        this.props.history.push("/search");
    }

    render() {
        return (
            <div className={"search-panel appearence-anim " + (this.props.active ? 'active' : '')}>
                <div className="container">
                    <div className="search-panel__wrapper">
                        <form className="search-form" onSubmit={this.redirectToSearch.bind(this)}>
                            <input type="text" className="search-form__input" id="searchPanelQueryInput" name="searchPanelQueryInput" placeholder="Поиск..." />

                            <select className="search-form__dropdown-menu f-medium semi" id="searchPanelSearchType" name="searchPanelSearchType">
                                <option value="vacancy">Вакансии</option>
                                <option value="cv">Резюме</option>
                                <option value="employers">Компании</option>
                            </select>
                            
                            <input className="search-form__submit highlighted" type="submit" value="Поиск"/>
                            {/* <Link to="/search">
                                <button className="more-filters-btn"></button>
                            </Link> */}
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        history:ownProps.history,
        active:ownProps.active,
        searchOptions:state.search.searchOptions,
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
        onSetSearchOptions: (options) => {
            dispatch({type : 'SEARCH_SET_OPTIONS', payload:options})
        },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
