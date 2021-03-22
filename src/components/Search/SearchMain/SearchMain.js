import e from 'cors'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSearchQueries} from '../../../actions/serverConnections'

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
                this.sortByValue(values, 'date', 'asc')
                break;

            case 'dateDesc':
                this.sortByValue(values, 'date', 'desc')
                break;
        }

        this.props.onUpdateValues(values)
    }

    changeSearchQuery(e){
        this.props.onChangeSearchQuery(e.target.value)
    }

    getSearchValues = (e) => {
        e.preventDefault()
        this.props.onNullifyValues()
        this.props.onGetSearchQueries(this.parseOptions(this.props.searchOptions), this.props.searchOptions.searchType)

    }

    componentDidMount(){
        this.props.onUpdateValues(this.props.searchValues)
    }

    render() {
        return (
            <section className="search-main">
                {/* <div className="search-main__sort-controls">
                    <select name="searchValueSort" id="searchValueSort" onChange={this.sortSearch.bind(this)}>
                        <option value="dateDesc">Сначала новые</option>
                        <option value="dateAsc">Сначала старые</option>
                        <option value="salaryDesc">По возрастанию зарплаты</option>
                        <option value="salaryAsc">По убыванию зарплаты</option>
                    </select>
                </div> */}
                <div className="search-main__controls">
                    <form onSubmit={this.getSearchValues.bind(this)}>
                        <input type="text" id="search-main__controls__query-input" name="search-main__controls__query-input" placeholder="Поиск..." onChange={this.changeSearchQuery.bind(this)} value={this.props.searchOptions.phrase}/>
                        <button type="submit">Найти</button>
                    </form>
                </div>
                <ul className="search-main__search-items-list">
                    {this.props.searchValues.map((item, index) => {
                        return(
                            <li key={index} className="resume resumes-list-el rounded">
                                <section className="resume-main">
                                    <div className={"resume__header white top-rounded " }>
                                    {/* + this.props.item.bg_header_color */}
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{item.vacancy_name}</h2>
                                            <p><span className="resume__header__salary bold f-medium">{item.salary}</span><span className="bold f-medium"> руб.</span></p>
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{item.grade}</p>
                                            <p className="resume__publication-date sup">{item.pub_date.slice(0, 10)}</p>
                                        </div>
                                    </div>
            
                                    <div className="resume__main-info rounded">
                                        <p className="resume__industry f-pre">{item.industry}</p>
            
                                        <p className="resume__work-type">{item.work_type.join(', ')}</p>
            
                                        <p className="resume__about">{item.about}</p>
            
                                        {/* <ul className="resume__tags-list">
                                            {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                        </ul> */}
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
        } 
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchMain);