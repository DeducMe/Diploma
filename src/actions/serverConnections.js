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

function getEmployerFetchSucces(userData){
    return{
        type:'GET_EMPLOYER_FETCH_SUCCESS',
        userData
    }
}

function updateEmployerFetchSucces(){
    return{
        type:'UPDATE_EMPLOYER_FETCH_SUCCES'
    }
}

function getUserVacanciesFetchSuccess(data){
    return{
        type:'GET_USER_VACANCIES_FETCH_SUCCES',
        data
    }
}

function addVacancyFetchSucces(){
    return{
        type:'ADD_RESUME_FETCH_SUCCES'
    }
}

function deleteVacancyFetchSucces(){
    return{
        type:'DELETE_RESUME_FETCH_SUCCES'
    }
}

function redactVacancyFetchSucces(){
    return{
        type:'REDACT_RESUME_FETCH_SUCCES'
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

function deleteResumeFetchSucces() {
    return{
        type:'DELETE_RESUME_FETCH_SUCCES'
    }
}

function getSearchFetchSucces(data){
    return{
        type:'GET_SEARCH_QUERY_FETCH_SUCCES',
        data
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
        
    })  //userId
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getUserDataFetchSucces(data))
        else return dispatch(notFoundError(data))
    })
}

export const getUserResumes = (userId) => (dispatch) => {
    console.log(userId)
    return fetch(url + '/cv/user/'+userId,{
        method: 'GET',
        
    })  //userId
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getUserResumesFetchSuccess(data))
        else return dispatch(notFoundError(data))
    })
}

export const addResume = (data) => (dispatch) => {
    console.log(data)
    return fetch(url + '/cv/',{
        method: 'POST',
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
        
    })  
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(addResumeFetchSucces(data.new_cv_id))
        else return dispatch(notFoundError(data))
    })
}

export const deleteResume = (id) => (dispatch) => {
    return fetch(url + '/cv/' + id,{
        method: 'DELETE',  

        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(deleteResumeFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const redactResume = (data, cvId) => (dispatch) => {
    console.log(data)
    return fetch(url + '/cv/'+cvId,{
        method: 'PUT',
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]


        }
    })  
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(redactResumeFetchSucces())
        else return dispatch(notFoundError(data))
    })
}

export const loginUser = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/auth/login/',{
        method: 'POST',  
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        }
    })
    .then(response => response.json())
    .then(data => {
        return dispatch(loginUserFetchSucces(data.user))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const registrateNewUser = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/register/',{
        method: 'POST',  
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        }
    })
    .then(response => response.json())
    .then(data => dispatch(registarteUserFetchSucces(data)))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const logout = () => (dispatch) => {
    return fetch(url + '/auth/logout',{
        method: 'DELETE',  
    })
    .then(response => response.json())
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
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
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
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
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
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
    })
    .then(response => response.json())
    .then(data => dispatch(createNewEmployerFetchSucces()))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const getEmployer = (userId) => (dispatch) => {
    return fetch(url + '/employers/' + userId,{
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => dispatch(getEmployerFetchSucces(data)))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const updateEmployer = (data, userId) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/employers/' + userId,{
        method: 'PUT',  
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(updateEmployerFetchSucces())
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const getUserVacancies = (userId) => (dispatch) => {
    console.log(userId)
    return fetch(url + '/vacancy/user/' + userId,{
        method: 'GET',
        
    })  //userId
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getUserVacanciesFetchSuccess(data))
        else return dispatch(notFoundError(data))
    })
}

export const addVacancy = (data) => (dispatch) => {
    console.log(data)
    return fetch(url + '/vacancy/',{
        method: 'POST',
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
        
    })  
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(addVacancyFetchSucces(data.new_vacancy_id))
        else return dispatch(notFoundError(data))
    })
}


export const deleteVacancy = (id) => (dispatch) => {
    return fetch(url + '/vacancy/' + id,{
        method: 'DELETE',  
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(deleteVacancyFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const redactVacancy = (data, cvId) => (dispatch) => {
    console.log(data)
    return fetch(url + '/vacancy/'+cvId,{
        method: 'PUT',
        body: JSON.stringify(data),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
        
    })  
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(redactVacancyFetchSucces())
        else return dispatch(notFoundError(data))
    })
}

export const getSearchQueries = (options, searchType) => (dispatch) => {
    console.log(options)
    return fetch(url + '/'+ searchType + '/search?'+ options,{
        method: 'GET',
    })  
    .then(response => {
        if (response.status !== 404)
        return response.json()
        else return response.status
    })
    .then(data => {
        console.log(data)
        if (data !== '404')
        return dispatch(getSearchFetchSucces(data))
        else return dispatch(notFoundError(data))
    })
}