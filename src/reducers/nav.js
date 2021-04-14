const initialState = {
    searchActive: '',
    position: '',
    dropDownState: '',
    transparency:'',
    optionsPopup:{
        optionsPopupState: '',
        loaderActive:false
    },
    popup:{
        state:'muted',
        type:'',
        subject:'employee',
        submitValue:'Начать карьеру!',
        wrongEmail:'muted',
        wrongEmailError: '',
        wrongPassword:'muted',
        loginPopupLoaderActive:false
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
    if (action.type === 'DROPDOWN_ACTIVATE'){
        state.dropDownState = 'active';
        return {
            ...state
        };
    }
    else if (action.type === 'DROPDOWN_DEACTIVATE'){
        state.dropDownState = '';
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
    else if (action.type === 'POPUP_CLOSE'){
        state.popup.state = 'muted';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_POSITION_TO_FIXED'){
        state.position = 'fixed';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_POSITION_TO_NONE'){
        state.position = '';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_BG_TO_TRANSPARENT'){
        state.transparency = 'transparent';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_BG_TO_NORMAL'){
        state.transparency = '';
        return{
            ...state
        }
    }
    
    else if(action.type === 'WRONG_EMAIL_INPUT'){
        state.popup.wrongEmail = 'active';
        state.popup.wrongEmailError = action.payload
        return{
            ...state
        }
    }
    else if(action.type === 'WRONG_PASSWORD_INPUT'){
        state.popup.wrongPassword = 'active';
        state.popup.wrongPasswordError = action.payload
        return{
            ...state
        }
    }
    else if(action.type === 'RESET_VALIDATION'){
        state.popup.wrongPassword = 'muted';
        state.popup.wrongEmail = 'muted';
        return{
            ...state
        }
    }
    else if(action.type === 'LOGIN_ACTIVATE_LOADER'){
        state.popup.loginPopupLoaderActive = true;
        return{
            ...state
        }
    }
    else if(action.type === 'LOGIN_DEACTIVATE_LOADER'){
        state.popup.loginPopupLoaderActive = false;
        return{
            ...state
        }
    }
    else if(action.type === 'SET_USER_MINI_AVATAR'){
        state.avatar = action.payload;
        return{
            ...state
        }
    }

    if (action.type === 'OPTIONS_POPUP_ACTIVATE'){
        state.optionsPopup.optionsPopupState = 'active';
        return {
            ...state
        };
    }
    else if (action.type === 'OPTIONS_POPUP_DEACTIVATE'){
        state.optionsPopup.optionsPopupState = '';
        return {
            ...state
        };
    }
    else if(action.type === 'OPTIONS_POPUP_ACTIVATE_LOADER'){
        state.optionsPopup.loaderActive = true;
        return{
            ...state
        }
    }
    else if(action.type === 'OPTIONS_POPUP_DEACTIVATE_LOADER'){
        state.optionsPopup.loaderActive = false;
        return{
            ...state
        }
    }
    return state;
}