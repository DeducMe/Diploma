import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchMain extends Component {

    sortByValue(arr, value, sortMethod){
        sortMethod === 'asc' ? (
            arr.sort((a, b) => a[value] - b[value])
        ) : (
            arr.sort((a, b) => b[value] - a[value])
        )
        
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

    componentDidMount(){
        this.props.onUpdateValues(this.props.searchValues)
    }

    render() {
        return (
            <section className="search-main">
                <div className="search-main__sort-controls">
                    <select name="searchValueSort" id="searchValueSort" onChange={this.sortSearch.bind(this)}>
                        <option value="dateDesc">Сначала новые</option>
                        <option value="dateAsc">Сначала старые</option>
                        <option value="salaryDesc">По возрастанию зарплаты</option>
                        <option value="salaryAsc">По убыванию зарплаты</option>
                    </select>
                </div>

                <ul className="search-main__search-items-list">
                    {this.props.searchValues.map((item, index) => {
                        if (item.type === 'vacancy')
                        return(
                            <li key={index} className="resume resumes-list-el rounded">
                                <section className="resume-main">
                                    <div className={"resume__header white top-rounded " + this.props.item.bg_header_color}>
                                        <div className="resume__header-top">
                                            <h2 className="resume__header__name bold f-large">{item.vacancy_name}</h2>
                                            <p><span className="resume__header__salary bold f-medium">{item.salary}</span><span className="bold f-medium"> руб.</span></p>
                                        </div>
                                        <div className="resume__header-bottom">
                                            <p className="resume__header__grade">{item.grade}</p>
                                            <p className="resume__publication-date sup">{item.pub_date}</p>
                                        </div>
                                    </div>
            
                                    <div className="resume__main-info rounded">
                                        <p className="resume__industry f-pre">{item.industry}</p>
            
                                        <p className="resume__work-type">{item.work_type.join(', ')}</p>
            
                                        <p className="resume__about">{item.about}</p>
            
                                        <ul className="resume__tags-list">
                                            {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                        </ul>
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
        searchValues:state.search.searchValues
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onUpdateValues: (values) => {
            dispatch({type : 'SEARCH_UPDATE_VALUES', payload:values})
          },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchMain);