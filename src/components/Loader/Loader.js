import React from 'react'
import './loader.css'

export default function Loader(active) {
    if (active.active)
    return (
        <div className="loader active">
            <div className="content">
                <div className="planet">
                    <div className="ring"></div>
                        <div className="cover-ring"></div>
                    <div className="spots">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>
                </div>

                <p>loading</p>
            </div>
        </div>
        
    )
    else return <div className="loader"></div>
}
