import React, { Component } from 'react'
import Main from './Main/Main'
import Side from './Side/Side'
import './profile.css'


export default class Profile extends Component {
    
    render() {
        
        return (
            <div className="small-container profile-wrapper">
                <div className="profile__main">
                    <Main></Main>
                </div>
                <div className="profile__side">
                    <Side></Side>
                </div>
                
            </div>
        )
    }
}
