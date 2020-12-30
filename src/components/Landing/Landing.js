import React, { Component } from 'react'
import { connect } from 'react-redux'
import './landing.css'

class Landing extends Component {

    render() {
        this.props.onNavPositionChange();

        return (
            <div className="landing-wrapper">
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
return {

}
}
  
const mapDispatchToProps = (dispatch) =>{
return{
    onNavPositionChange: () => {
        dispatch({type : 'CHANGE_NAV_POSITION_TO_FIXED', payload:null})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);