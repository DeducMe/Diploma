const url = 'http://job-flow.ru/api'  //http://localhost:3000

function getUserDataFetchSucces(userData){
    return{
        type:'GET_USER_DATA_FETCH_SUCCES',
        userData
    }
}

function registarteUserFetchSucces(data){
    return{
        type:'REGISTRATE_USER_FETCH_SUCCES',
        data
    }
}

function getUserResumesFetchSuccess(data){
    return{
        type:'GET_USER_RESUMES_FETCH_SUCCES',
        data
    }
}

function logoutUserFetchSucces(data){
    return{
        type:'LOGOUT_USER_FETCH_SUCCES',
        data
    }
}

function loginUserFetchSucces(data){
    return{
        type:'LOGIN_USER_FETCH_SUCCES',
        data
    }
}

function createNewEmployerFetchSucces(){
    return{
        type:'CREATE_NEW_EMPLOYER_FETCH_SUCCES'
    }
}

function updateEmployeeFetchSucces(){
    return{
        type:'UPDATE_EMPLOYEE_FETCH_SUCCES'
    }
}

function createNewEmployeeFetchSucces(){
    return{
        type:'CREATE_NEW_EMPLOYEE_FETCH_SUCCES'
    }
}

function addResumeFetchSucces(){
    return{
        type:'ADD_RESUME_FETCH_SUCCES'
    }
}

function redactResumeFetchSucces(){
    return{
        type:'REDACT_RESUME_FETCH_SUCCES'
    }
}

function notFoundError(userData){
    return{
        type:'404_ERROR',
        userData
    }
}

export const getUserData = (userId) => (dispatch) => {
    console.log(userId)
    return fetch(url + '/workers/'+userId,{
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })  //userId
    .then(response => {
        let a = response.json()
        console.log(a)
        return a
    })
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getUserDataFetchSucces(data))
        else return dispatch(notFoundError(data))
    })
}

export const getUserResumes = (userId) => (dispatch) => {
    console.log(userId)
    return fetch(url + '/cv/'+userId,{
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })  //userId
    .then(response => {
        let a = response.json()
        console.log(a)
        return a
    })
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getUserResumesFetchSuccess(data))
        else return dispatch(notFoundError(data))
    })
}

export const addResume = (data) => (dispatch) => {
    console.log(data)
    return fetch(url + '/cv',{
        method: 'POST',
        body: JSON.stringify(data),  
        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })  
    .then(response => {
        let a = response.json()
        console.log(a)
        return a
    })
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(addResumeFetchSucces(data.new_cv_id))
        else return dispatch(notFoundError(data))
    })
}

export const redactResume = (data, cvId, userId) => (dispatch) => {
    console.log(data)
    return fetch(url + '/cv/'+userId+'/'+cvId,{
        method: 'PUT',
        body: JSON.stringify(data),  
        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })  
    .then(response => {
        let a = response.json()
        console.log(a)
        return a
    })
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(redactResumeFetchSucces())
        else return dispatch(notFoundError(data))
    })
}

export const loginUser = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/login',{
        method: 'POST',  
        body: JSON.stringify(data),  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(loginUserFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const registrateNewUser = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/register',{
        method: 'POST',  
        body: JSON.stringify(data),  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })
    .then(response => response.json())
    .then(data => dispatch(registarteUserFetchSucces(data)))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const logout = () => (dispatch) => {
    return fetch(url + '/logout',{
        method: 'DELETE',  
        body: '',  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        'XSRF-TOKEN':'xjk2kzjn4',
        "X-XSRF-TOKEN":'xjk2kzjn4',
        "X-CSRF-TOKEN":'xjk2kzjn4'
      }
    })
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(data => {
        console.log(data)
        return dispatch(logoutUserFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const createNewEmployee = (data) => (dispatch) => {
    
    return fetch(url + '/workers',{
        method: 'POST',  
        body: JSON.stringify(data),  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(createNewEmployeeFetchSucces())
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const updateEmployee = (data, userId) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/workers/' + userId,{
        method: 'PUT',  
        body: JSON.stringify(data),  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(updateEmployeeFetchSucces())
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}


export const createNewEmployer = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/employers',{
        method: 'POST',  
        body: JSON.stringify(data),  

        headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    })
    .then(response => response.json())
    .then(data => dispatch(createNewEmployerFetchSucces()))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}
