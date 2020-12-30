import React, { Component } from 'react'
import avatar from '../../../img/sup_photo.jpg'
import './main.css'
import photoRedactIcon from '../../../img/photovector.svg'

export default class Main extends Component {
    checkUser(){

    }

    render() {
        return (
            <div className="main rounded">
                <section className="personal top-rounded">
                    <img className="personal__avatar" src={avatar} alt="аватар"/>
                    {this.checkUser()}
                    <button className="photo-redact-btn">
                        <img src={photoRedactIcon} alt="photoRedactIcon"/>
                    </button>
                </section>

                <section className="info">
                    <div className="info-head">
                        <h2 className="info__name bold">Александр Закальский</h2>
                        <span className="info__work highlighted">Front-end dev</span>
                    </div>
                    
                    <p className="info__description">Люблю кофе и мягкие подушки ...Lorem...Lorem...Lorem...Lorem...Lorem
                        ...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem
                        ...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem...Lorem
                        ...Lorem...Lorem
                    </p>


                    <div className="info__age">
                        <p>
                            <span>Мужчина </span>
                            <span>19 лет</span>
                        </p>

                        <p>09.08.2001</p>
                    </div>

                    <p className="info__place">Красногорск, Московская область, Россия</p>

                    
                    <div className="info__education">
                        <h3 className="education-head bold headed">Образование:</h3>
                        <div className="education-block">
                            <p className="education-name highlighted">Инженер программист</p>
                            <div className="education-place">
                                <p className="education-place__institution">КИП ФИН,</p>
                                <p className="education-place__grade">&nbsp;Среднее специальное</p>    
                                <p className="education-place__longing">01.09.2016 — по н.в.</p>
                            </div>
                        </div>

                        <div className="education-block">
                            <p className="education-name highlighted">Инженер программист</p>
                            <div className="education-place">
                                <p className="education-place__institution">КИП ФИН,</p>
                                <p className="education-place__grade">&nbsp;Среднее специальное</p>    
                                <p className="education-place__longing">01.09.2016 — по н.в.</p>
                            </div>
                        </div>
                    </div>

                    <div className="info__courses">
                        <h3 className="courses-head bold headed">Курсы:</h3>
                        <div className="course-block">
                            <p className="course-name highlighted">Front-end developer</p>
                            <div className="course-place">
                                <p className="course-place__institution">Skillbox</p>   
                                <p className="course-place__longing">01.09.2019 — по н.в.</p>
                            </div>
                        </div>

                        <div className="course-block">
                            <p className="course-name highlighted">Front-end developer</p>
                            <div className="course-place">
                                <p className="course-place__institution">Skillbox</p>   
                                <p className="course-place__longing">01.09.2019 — по н.в.</p>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </div>
        )
    }
}
