function getUserDatafetchSucces(userData){
    return{
        type:'GET_USER_DATA_FETCH_SUCCES',
        userData
    }
}

export const getUserData = (userId, redirectUser) => (dispatch) => {
    return fetch('http://localhost:3000/workers/'+userId)
    .then(response => response.json())
    .then(data => dispatch(getUserDatafetchSucces(data)))
    .catch(err => dispatch({ type: 'SOME_ERROR', err }))


}