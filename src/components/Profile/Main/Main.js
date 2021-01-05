import React, { Component } from 'react'
import { connect } from 'react-redux'

import avatar from '../../../img/sup_photo.jpg'

import placeholderAvatar from '../../../img/placeholder-avatar.jpg'
import './main.css'
import photoRedactIcon from '../../../img/photovector.svg'

class Main extends Component {
    goPhrase(){
        if (this.props.userState.type === "employee"){
            return "Пора начать свою карьеру!"
        }
        return "Пора найти команду!"
    }

    getName(){
        
    }

    getWorkInfo(){

    }

    render() {
        if (this.props.userState.hasProfile)
        return (
            // <div className="main rounded">
            //     <section className="personal top-rounded">
            //         <img className="personal__avatar" src={avatar} alt="аватар"/>
            //         <button className="photo-redact-btn">
            //             <img src={photoRedactIcon} alt="photoRedactIcon"/>
            //         </button>
            //     </section>

            //     <section className="info">
            //         <div className="info-head">
            //             <h2 className="info__name bold">Александр Закальский</h2>
            //             <span className="info__work highlighted">Front-end dev</span>
            //         </div>
                    
            //         <p className="info__description">Люблю кофе и мягкие подушки ...Lorem...Lorem...Lorem...Lorem...Lorem
            //             ...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem
            //             ...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem
            //             ...Lorem...Lorem
            //         </p>


            //         <div className="info__age">
            //             <p>
            //                 <span>Мужчина </span>
            //                 <span>19 лет</span>
            //             </p>

            //             <p>09.08.2001</p>
            //         </div>

            //         <p className="info__place">Красногорск, Московская область, Россия</p>

                    
            //         <div className="info__education">
            //             <h3 className="education-head bold headed">Образование:</h3>
            //             <div className="education-block">
            //                 <p className="education-name highlighted">Инженер программист</p>
            //                 <div className="education-place">
            //                     <p className="education-place__institution">КИП ФИН,</p>
            //                     <p className="education-place__grade">&nbsp;Среднее специальное</p>    
            //                     <p className="education-place__longing">01.09.2016 — по н.в.</p>
            //                 </div>
            //             </div>

            //             <div className="education-block">
            //                 <p className="education-name highlighted">Инженер программист</p>
            //                 <div className="education-place">
            //                     <p className="education-place__institution">КИП ФИН,</p>
            //                     <p className="education-place__grade">&nbsp;Среднее специальное</p>    
            //                     <p className="education-place__longing">01.09.2016 — по н.в.</p>
            //                 </div>
            //             </div>
            //         </div>

            //         <div className="info__courses">
            //             <h3 className="courses-head bold headed">Курсы:</h3>
            //             <div className="course-block">
            //                 <p className="course-name highlighted">Front-end developer</p>
            //                 <div className="course-place">
            //                     <p className="course-place__institution">Skillbox</p>   
            //                     <p className="course-place__longing">01.09.2019 — по н.в.</p>
            //                 </div>
            //             </div>

            //             <div className="course-block">
            //                 <p className="course-name highlighted">Front-end developer</p>
            //                 <div className="course-place">
            //                     <p className="course-place__institution">Skillbox</p>   
            //                     <p className="course-place__longing">01.09.2019 — по н.в.</p>
            //                 </div>
            //             </div>
            //         </div>
                    
            //     </section>
            // </div>
            <div className="main rounded">
                <section className="personal top-rounded">
                    <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>
                </section>
                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">{this.getName()}</h2>
                        <span className="info__work highlighted">{this.getWorkInfo()}</span>
                    </div>
                    
                    <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!
                    </p>


                    
                </section>
            </div>
        )
        else
        return(
            <div className="main rounded">
                <section className="personal top-rounded">
                    <img className="personal__avatar" src={placeholderAvatar} alt="аватар"/>
                </section>
                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">Ваш профиль пуст</h2>
                        <span className="info__work highlighted"></span>
                    </div>
                    
                    <p className="info__description">Чтобы создать профиль нажмите на кнопку и введите информацию о себе!
                        {this.goPhrase()}
                    </p>


                    
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
      userState: state.user
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      onSubjectChangeToEmployer: () => {
        dispatch({type : 'CHANGE_SUBJECT_TO_EMPLOYER', payload:null})
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);
