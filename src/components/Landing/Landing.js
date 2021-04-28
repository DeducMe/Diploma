import React, { Component } from 'react'
import './landing.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {getSearchQueries} from '../../actions/serverConnections'
import {searchLoaderDeactivate, searchLoaderActivate} from '../../actions/asyncDispatch'
import fileUploader from '../../actions/fileUploader';
import {getGradeValues, getWorkTypeValues, parseOptions, searchTypeToUserType} from '../../scripts/commonScripts'
import { InView } from "react-intersection-observer";



class Landing extends Component {
    getSearchValues = () => {
        console.log('get')
        if (this.props.searchState.searchLoading === false){
            setTimeout(()=>{
                this.props.onGetSearchResponse(parseOptions(this.props.searchOptions), this.props.searchOptions.searchType, this.props.searchState.next, this.getAvatarFromFirebase)
            },0)
        }
    }

    getAvatarFromFirebase = (id, pk) =>{   //пришлось делать кучу изменений состояний, потому что один flutter разработчик решил, что он не будет сохранять url. 
        const storageRef = fileUploader.storage().ref()
        const fileRef = storageRef.child('user-avatar' + id)
        fileRef.getDownloadURL()
        .then((response) => this.props.onSetValuePhoto(response, pk))
        .catch(err => this.props.onSetValuePhoto('https://firebasestorage.googleapis.com/v0/b/diploma-55e3f.appspot.com/o/placeholder-avatar.jpg?alt=media&token=5058f243-49e5-4df4-8686-899c6ce12c54', pk))
    }

    componentDidMount(){
        
        console.log(this.props.searchState)
        this.getSearchValues()
    }

    render(){
        return (
            <div className="landing-wrapper">
                <div className="landing__main white">
                    <h2 className="f-extra-large bold main-header">Пора встать на первую ступень своей карьерной лестницы!</h2>
                </div>
    
                <ul className="landing__recomendations">
                    {this.props.searchValues.map((item, index) =>
                        <li key={index} className="resume resumes-landing-list-el rounded">
                        <section className="resume-main">
                            <div className={"resume__header white top-rounded " + item.bg_header_color }>
                                <div className="resume__header-top">
                                    <h2 className="resume__header__name bold text-overflow">{item.vacancy_name}</h2>
                                    {item.salary === -1 ? <span className="resume__header__salary bold text-overflow">Зарплата не указана</span>:
                                    <span className="resume__header__salary bold text-overflow">{item.salary} руб.</span>}
                                </div>
                                <div className="resume__header-bottom">
                                    <p className="resume__header__grade">{getGradeValues(item.grade)}</p>
                                    <p className="resume__publication-date sup">{item.pub_date.slice(0, 10)}</p>
                                </div>
                                
                            </div>
    
                            <div className="resume__main-info bottom-rounded flex">
                                <div className="resume__main-info__text">
                                    <p className="resume__industry f-pre">{item.industry}</p>
    
                                    <p className="resume__work-type">{item.work_type.map((item)=>getWorkTypeValues(item)).join(', ')}</p>

                                    <p className="resume__about">{item.about || item.leading}</p>
                                </div>
                                
    
                                {/* <ul className="resume__tags-list">
                                    {item.tags.map((tag, index)=><li key={index} className="resume__tags-list-el">{tag}</li>)}
                                </ul> */}
                                <Link className="resume__main-info__avatar-name-block" to={"/"+searchTypeToUserType(this.props.searchOptions.searchType)+"/" + item.owner_id}>
                                    <img className="avatar-name-block__small-avatar" src={item.photo_url} alt="аватар"/>
                                    <p>{item.owner}</p>
                                </Link>
                            </div>
                        </section>
                    </li>
                    )}
                </ul>
                <InView as="div" onChange={(inView, entry) => {
                    console.log(inView)
                    if (inView) this.getSearchValues(false)}}>
                </InView>
            </div>
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
        onNullifySearchOptions: () => {
            dispatch({type : 'SEARCH_NULLIFY_OPTIONS', payload:null})
        },
        onUpdateValues: (values) => {
            dispatch({type : 'SEARCH_UPDATE_VALUES', payload:values})
        },
        onSortValues: (values) => {
            dispatch({type : 'SEARCH_SORT_VALUES', payload:values})
        },
        onChangeSearchQuery: (query) => {
            dispatch({type : 'CHANGE_SEARCH_QUERY', payload:query})
        },
        
        onGetSearchResponse:(options, searchType, next, getAvatarFromFirebase)=>{
            dispatch(searchLoaderActivate())
            dispatch(getSearchQueries(options, searchType, next))
            .then((data)=>{
                if (data.data !== null && data.data !== 404){
                    dispatch({type : 'SEARCH_UPDATE_OPTIONS', payload:data.data.next})
                    dispatch({type : 'SEARCH_UPDATE_RESULTS_COUNT', payload:data.data.count})
                    dispatch({type : 'SEARCH_UPDATE_VALUES', payload:data.data.results}) 
                    data.data.results.map((item) => {
                        if (item.photo_url === "") getAvatarFromFirebase(item.owner_id, item.pk)
                    })
                }
            })
            .then(response => dispatch(searchLoaderDeactivate()))
            
        },
        onSetValuePhoto: (photo, id) => {
            console.log('photo')
            dispatch({type : 'SEARCH_UPDATE_VALUES_PHOTO', payload:{photo:photo, id:id}})
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Landing);