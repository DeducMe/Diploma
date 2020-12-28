const initialState = {
    searchActive: '',
    popup:{
        state:'muted',
        type:'',
        subject:'employee',
        submitValue:'Начать карьеру!'
    }
};
  
export default function navState(state = initialState, action){
    if (action.type === 'SEARCH_ACTIVATE'){
        state.searchActive = 'active';
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_DEACTIVATE'){
        state.searchActive = '';
        return {
            ...state
        };
    }
    else if (action.type === 'POPUP_ACTIVATE'){
        state.popup.state = 'active';
        state.popup.type = action.payload;
        return {
            ...state
        }
    }else if (action.type === 'CHANGE_SUBJECT_TO_EMPLOYEE'){
        state.popup.subject = 'employee';
        state.popup.submitValue = 'Начать карьеру!';
        return {
            ...state
        }
    }
    else if (action.type === 'CHANGE_SUBJECT_TO_EMPLOYER'){
        state.popup.subject = 'employer';
        state.popup.submitValue = 'Найти команду!';
        return {
            ...state
        }
    }
    
    return state;
}