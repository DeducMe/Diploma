import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {getSearchQueries} from '../../../actions/serverConnections'
import {searchLoaderDeactivate, searchLoaderActivate} from '../../../actions/asyncDispatch'
import fileUploader from '../../../actions/fileUploader';
import {getSearchNext, getSearchLoadingState} from '../../../actions/asyncDispatch';
import {parseOptions} from '../../../scripts/commonScripts'
import industriesData from '../../../jsonFiles/industries.json'
import { NavItem } from 'react-materialize';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
class SearchSide extends Component {
    changeIndustry = (e) => {
        if (e.target.value!==0){
            this.props.onChangeIndustry(e.target.value)
        }
    }

    ChangeSlider = (values) =>{
        if (this.props.searchOptions['min-salary'] !== values[0]) this.props.onSetSearchOptions({'min-salary': values[0]})
        else if (this.props.searchOptions['max-salary'] !== values[1]) this.props.onSetSearchOptions({'max-salary': values[1]})
    }

    gradeChange = (e) =>{
        if (e.target.checked) this.props.onAddGrade(e.target.value)
        else this.props.onDeleteGrade(e.target.value)
    }

    workTypeChange = (e) =>{
        if (e.target.checked) this.props.onAddWorkType(e.target.value)
        else this.props.onDeleteWorkType(e.target.value)
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }

    getSearchValues = (nullify) => {
        if (nullify) this.props.onNullifyValues()
            
        this.props.onGetSearchResponse(parseOptions(this.props.searchOptions), this.props.searchOptions.searchType, this.getAvatarFromFirebase)
    }
    
    componentDidUpdate(){
        let updateOptions

        console.log('updated')
        clearTimeout(updateOptions);
        updateOptions = setTimeout(()=>{
            this.getSearchValues(true)
        }, 2000)
        
    }

    render() {
        return (
            <div className="search-side rounded">
                <form>
                    <div className="search-side__block search-side__salary">
                        <h3>Зарплата</h3>
                        <p className="search-side__salary-placeholder">
                            <span>минимальная: {this.props.searchOptions['min-salary']} руб.</span><span>максимальная: {this.props.searchOptions['max-salary']} руб.</span>
                        </p>
                        <Range min={0} max={500000} defaultValue={[0, 400000]} onChange={this.ChangeSlider.bind(this)} />
                    </div>

                    <div className="search-side__block search-side__grade">
                        <h3>Уровень компетенции</h3>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-internship" value="internship" id="search-options__grade-internship" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-internship">Стажер</label>
                        </div>
                        
                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-junior" value="junior" id="search-options__grade-junior" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-junior">Начинающий специалист</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-middle" value="middle" id="search-options__grade-middle" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-middle">Специалист</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-senior" value="senior" id="search-options__grade-senior" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-senior">Главный специалист</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-director" value="director" id="search-options__grade-director" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-director">Управляющий отдела</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__grade-senior-director" value="senior-director" id="search-options__grade-senior-director" onChange={this.gradeChange.bind(this)}/>
                            <label htmlFor="search-options__grade-senior-director">Генеральный директор</label>
                        </div>
                    </div>
                    <div className="search-side__block search-side__grade">
                        <h3>Типы работ</h3>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-part-day" value="part-day" id="search-options__work-type-part-day" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-part-day">неполный день</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-full-day" value="full-day" id="search-options__work-type-full-day" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-full-day">полный день</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-part-time" value="part-time" id="search-options__work-type-part-time" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-part-time">неполная занятость</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-full-time" value="full-time" id="search-options__work-type-full-time" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-full-time">полная занятность</label>
                        </div>
                        
                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-volunteer" value="volunteer" id="search-options__work-type-volunteer" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-volunteer">волонтерство</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-one-time-job" value="one-time-job" id="search-options__work-type-one-time-job" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-one-time-job">разовое задание</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-flexible-schedule" value="flexible-schedule" id="search-options__work-type-flexible-schedule" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-flexible-schedule">гибкий график</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-shift-schedule" value="shift-schedule" id="search-options__work-type-shift-schedule" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-shift-schedule">сменный график</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-shift-method" value="shift-method" id="search-options__work-type-shift-method" onChange={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-shift-method">вахтовый метод</label>
                        </div>

                        <div className="checkbox-block">
                            <input type="checkbox" name="search-options__work-type-remote" id="search-options__work-type-remote" value="remote" onClick={this.workTypeChange.bind(this)}/>
                            <label htmlFor="search-options__work-type-remote" >удаленная работа</label>
                        </div>
                    </div>
                    <h3>Отрасли</h3>
                        <div className="selectbox-block">
                            <select id="searchSideIndustry" name="searchSideIndustry" onChange={this.changeIndustry.bind(this)}>
                                {industriesData.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                            </select>
                            
                        </div>
                </form>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) =>{
    return {
        history:ownProps.history,
        searchOptions:state.search.searchOptions,

        // searchLoading:state.search.searchLoading,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onNullifyValues: () => {
            dispatch({type : 'SEARCH_NULLIFY_VALUES', payload:null})
        },
        onSetSearchOptions: (options) => {
            dispatch({type : 'SEARCH_SET_OPTIONS', payload:options})
        },
        onGetSearchResponse:(options, searchType, getAvatarFromFirebase)=>{
            if (!dispatch(getSearchLoadingState())){
                dispatch(searchLoaderActivate())
                const next = dispatch(getSearchNext())
                dispatch(getSearchQueries(options, searchType, next))
                .then((data)=>{
                    if (data.data !== null && data.data !== 404){
                        dispatch({type : 'SEARCH_UPDATE_RESULTS_COUNT', payload:data.data.count})
                        dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                        data.data.results.map((item) => {
                            if (item.photo_url === "") getAvatarFromFirebase(item.owner_id, item.pk)
                        })
                    }
                })
                .then(response => dispatch(searchLoaderDeactivate()))
            }
        },
        onSetValuePhoto: (photo, id) => {
            console.log('photo')
            dispatch({type : 'SEARCH_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
        },
        onAddGrade: (value) => {
            dispatch({type : 'SEARCH_OPTIONS_ADD_GRADE', payload:value})
        },
        onDeleteGrade: (value) => {
            dispatch({type : 'SEARCH_OPTIONS_DELETE_GRADE', payload:value})
        },
        onAddWorkType: (value) => {
            dispatch({type : 'SEARCH_OPTIONS_ADD_WORK_TYPE', payload:value})
        },
        onDeleteWorkType: (value) => {
            dispatch({type : 'SEARCH_OPTIONS_DELETE_WORK_TYPE', payload:value})
        },
        onChangeIndustry: (value) => {
            dispatch({type : 'SEARCH_OPTIONS_CHANGE_INDUSTRY', payload:value})
        },
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchSide);