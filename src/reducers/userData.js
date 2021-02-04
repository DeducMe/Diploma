const initialState = {

};
  
  
export default function userData(state = initialState, action){
    if (action.type === 'GET_USER_DATA_FETCH_SUCCES'){
        state = action.userData;
        return {
        ...state
        };
    }
    return state;
}