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

function verifyUserFetchSucces(data){
    return{
        type:'VERIFY_USER_FETCH_SUCCES',
        data
    }
}

function changePasswordUserFetchSucces(data){
    return{
        type:'CHANGE_PASSWORD_USER_FETCH_SUCCES',
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

function getVacancyFetchSucces(data){
    return{
        type:'GET_VACANCY_FETCH_SUCCES',
        data
    }
}

function getResumeFetchSucces(data){
    return{
        type:'GET_RESUME_FETCH_SUCCES',
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

function getFavouritesFetchSucces(data){
    return{
        type:'GET_FAVOURITES_QUERY_FETCH_SUCCES',
        data
    }
}

function getFavouritesNone(data){
    return{
        type:'GET_FAVOURITES_QUERY_NONE',
        data
    }
}

function getSearchFetchSucces(data){
    return{
        type:'GET_SEARCH_QUERY_FETCH_SUCCES',
        data
    }
}

function getSearchNone(data){
    return{
        type:'GET_SEARCH_QUERY_NONE',
        data
    }
}

function getResponseFetchSucces(data){
    return{
        type:'GET_RESPONSE_QUERY_FETCH_SUCCES',
        data
    }
}

function getResponseNone(data){
    return{
        type:'GET_RESPONSE_QUERY_NONE',
        data
    }
}

function getAnswersFetchSucces(data){
    return{
        type:'GET_ANSWERS_QUERY_FETCH_SUCCES',
        data
    }
}

function getAnswersNone(data){
    return{
        type:'GET_ANSWERS_QUERY_NONE',
        data
    }
}

function onCreateResponse(){
    return{
        type:'CREATE_REPONSE'
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
        console.log(    data)
        if (data !== '404')
        return dispatch(addResumeFetchSucces(data.new_cv_id))
        else return dispatch(notFoundError(data))
    })
}

export const deleteResume = (id) => (dispatch) => {
    return fetch(url + '/cv/' + id,{
        method: 'DELETE',  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
        
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

export const verify = (data) => (dispatch) => {
    console.log(JSON.stringify(data))
    return fetch(url + '/auth/user/',{
        method: 'GET',  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        }
    })
    .then(response => 
        {
            if (response.status !== 403)
            return response.json()
            else return response.status;
        }
    )
    .then(data => {
        return dispatch(loginUserFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
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
    return fetch(url + '/auth/logout/',{
        method: 'POST', 
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        } 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(logoutUserFetchSucces(data))
    })
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))
}

export const changePassword = (password) => (dispatch) => {
    return fetch(url + '/auth/password/change/',{
        method: 'POST',  
        body: JSON.stringify({
            "new_password1": password,
            "new_password2": password
        }),  
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        } 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return dispatch(changePasswordUserFetchSucces(data))
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
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': document.cookie.split('=')[1]
        },  
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

export const getSearchQueries = (options, searchType, next) => (dispatch) => {
    let fetchUrl = url + '/'+ searchType + '/search?'+ options
    console.log(fetchUrl)
    if (next !== null){
        if (next !== 'initial'){
            fetchUrl = next
        }
        return fetch(fetchUrl,{
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
        })
    }
    else return new Promise(function(resolve){resolve(dispatch(getSearchNone(null)))})
}

export const addFavourite = (type, id) => (dispatch) => {
    return fetch(url + '/favorites/'+ type + '/',{
        method: 'POST',
        body: JSON.stringify({'item_id':id}),  
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
        return dispatch(onCreateResponse())
        else return dispatch(notFoundError(data))
    })
}

export const getFavouritesQuery = (searchType, next) => (dispatch) => {
    let fetchUrl = url + '/favorites/'+ searchType
    console.log(fetchUrl)
    if (next !== null){
        if (next !== 'initial'){
            fetchUrl = next
        }
        return fetch(fetchUrl,{
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
            return dispatch(getFavouritesFetchSucces(data))
        })
    }
    else return new Promise(function(resolve){resolve(dispatch(getFavouritesNone(null)))})
}

export const getUserResponses = (userType, next, userId) => (dispatch) => {
    let fetchUrl = url + '/'+ (userType === 'employer' ? 'cv' : 'vacancy') +'/response/' + userType + '/' + userId
    if (next !== null){
        if (next !== 'initial'){
            fetchUrl = next
        }
        console.log(fetchUrl)
        return fetch(fetchUrl,{
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
            return dispatch(getResponseFetchSucces(data))
        })
    }
    else return new Promise(function(resolve){resolve(dispatch(getResponseNone(null)))})
}

export const getUserAnswers = (userType, next, userId) => (dispatch) => {
    let fetchUrl = url + '/' + (userType === 'employer' ? 'vacancy' : 'cv') +'/response/' + userType + '/' + userId
    if (next !== null){
        if (next !== 'initial'){
            fetchUrl = next
        }
        console.log(fetchUrl)

        return fetch(fetchUrl,{
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
            return dispatch(getAnswersFetchSucces(data))
        })
    }
    else return new Promise(function(resolve){resolve(dispatch(getAnswersNone(null)))})
}

export const createResponse = (type, data) => (dispatch) => {
    return fetch(url + '/' + type + '/response/',{
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
        return dispatch(onCreateResponse())
        else return dispatch(notFoundError(data))
    })
}

export const changeAnswer = (id, responseType, type) => (dispatch) => {
    return fetch(url + '/' + responseType + '/response/',{
        method: 'PUT',
        body: JSON.stringify({'state':type, 'id':id}),  
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
        return dispatch(onCreateResponse())
        else return dispatch(notFoundError(data))
    })
}

export const getVacancy = (vacancyId) => (dispatch) =>{
    return fetch(url + '/vacancy/'+vacancyId,{
        method: 'GET',
    })  
    .then(response => {
        if (response.status !== 404)
        return response.json()
        else return response.status
    })
    .then(data => {
        console.log(data)
        return dispatch(getVacancyFetchSucces(data))
    })
}

export const getResume = (resumeId) => (dispatch) =>{
    return fetch(url + '/cv/' + resumeId,{
        method: 'GET',
    })  
    .then(response => {
        if (response.status !== 404)
        return response.json()
        else return response.status
    })
    .then(data => {
        console.log(data)
        return dispatch(getResumeFetchSucces(data))
    })
}