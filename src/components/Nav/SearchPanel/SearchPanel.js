import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./searchPanel.css"

class SearchPanel extends Component {
    render() {
        return (
            <form className="search-form" action="">
                <input className="search-form__input" type="text" placeholder="Вакансии"/>

                <select className="search-form__dropdown-menu f-medium semi">
                    <option value="vacancy">Вакансии</option>
                    <option value="cv">Резюме</option>
                    <option value="company">Компании</option>
                </select>

                <input className="search-form__submit highlighted" type="submit" value="Поиск"/>

                <button className="more-filters-btn"></button>

            </form>

        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {

    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
