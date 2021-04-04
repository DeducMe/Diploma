import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createResponse} from '../../../actions/serverConnections'
import {userTypeToSearchType} from '../../../scripts/commonScripts'
class ResponsePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenWorkValue:-1
        };
    }

    getResponseData = (msg) => {
        let data = {}
        if (this.props.userState.user_type === 'employer'){
            data.employer = this.props.userState.id
            data.vacancy_response = this.props.userWorkValues[0].id
            data.worker_cv = this.props.item.pk
            data.worker = this.props.item.owner_id
        }
        else{
            data.employer = this.props.item.owner_id
            data.vacancy_response = this.props.item.pk
            data.worker_cv = this.props.userWorkValues[0].id
            data.worker = this.props.userState.id
        }
        data.message = msg
        data.state = 'sent'
        console.log(data)

        return data
    }

    changeWorkValue = (e) =>{
        this.setState({
            chosenWorkValue: e.target.value
        })
    }

    popupClose = () =>{
        this.props.onCloseResponsePopup()
    }

    makeResponse = (e) => {
        e.preventDefault()
        if (this.state.chosenWorkValue === -1){
            return
        }
        const data = this.getResponseData(e.target.responseMessageInput.value)
        console.log(userTypeToSearchType(this.props.userState.user_type))
        this.props.onMakeResponse(userTypeToSearchType(this.props.userState.user_type), data)
        this.props.onCloseResponsePopup()
    }

    render() {
        return (
            <form className="response-form-popup rounded" onSubmit={this.makeResponse.bind(this)}>
                <button className="close-popup-btn" onClick={this.popupClose} tabIndex="-1">x</button>

                <textarea className="response-form-popup__textarea" type="text" name="responseMessageInput" placeholder="Сопроводительное письмо"></textarea>
                <select id="responseWorkValueInput" name="responseWorkValueInput" onChange={this.changeWorkValue.bind(this)}>
                    <option value={-1}>Выберите сопроводительную вакансию</option>
                    
                    {this.props.userWorkValues.map((value)=>{
                        return <option key={value.id} value={value.id}>{value.vacancy_name}</option>
                    })}
                </select>
                <input className="sup-btn" type="submit" />
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    let userWorkValues
    if (state.user.user.user_type === 'employer'){
        userWorkValues = state.vacancy.vacancies
    }
    else{
        userWorkValues = state.cvs.cvs
    }
    return {
        userState:state.user.user,
        userWorkValues:userWorkValues,
        item:ownProps.item
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
        onMakeResponse:(type, data)=>{
            dispatch(createResponse(type, data))
        },
        onCloseResponsePopup: () => {
            dispatch({type : 'CLOSE_RESPONSE_POPUP', payload:null})
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ResponsePopup);