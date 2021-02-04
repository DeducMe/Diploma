const initialState = {
    state:'muted',
    placeholder: {
      userName: '',
      description: '',
      avatar: '',
      gender: '',
      personalBackground: '',
      birthday: '',
      cz:'',
      city: '',
      profile_link: '',
      photo_url: '',
      profile_background: ''
    },
    userPhones: [],
    language:[],
    education: [],
    exp : [],
    social_links: [],
    buf:{
      languageGrade:'A1'
  }
};
  
  
export default function profileState(state = initialState, action){
    if (action.type === 'POPUP_REDACT_PROFILE_ACTIVATE'){
        state.state = 'active';
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_PROFILE_DEACTIVATE'){
        state.state = 'muted';
        return {
          ...state
        };
    }
    // else if(action.type === 'ACTIVATE_PROFILE_REDACT_LOADER'){
    //     state.state = 'active';
    //     return{
    //         ...state
    //     }
    // }
    // else if(action.type === 'DEACTIVATE_PROFILE_REDACT_LOADER'){
    //     state.state = 'muted';
    //     return{
    //         ...state
    //     }
    // }
    else if (action.type === 'POPUP_REDACT_AVATAR_CHANGE'){
      state.placeholder.photo_url = action.payload;
      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_REDACT_ADD_LANGUAGE'){
      state.language.push(action.payload);
      state.language = Object.assign([], state.language, [...state.language]);

      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_REDACT_LANGUAGE_GRADE_CHANGE'){
      state.buf.languageGrade = action.payload;
      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_REDACT_DELETE_LANGUAGE'){
      state.language.splice(state.language.indexOf(action.payload), 1);
      state.language = Object.assign([], state.language, [...state.language]);
      return {
        ...state,

      };
    }
    
    else if (action.type === 'POPUP_REDACT_ADD_PHONE'){
      state.userPhones.push(action.payload);
      state.userPhones = Object.assign([], state.userPhones, [...state.userPhones]);

      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_REDACT_DELETE_PHONE'){
      state.userPhones.splice(state.userPhones.indexOf(action.payload), 1);
      return {
        ...state,
        userPhones: state.userPhones.map(n => n.id === action.payload
          ? { ...n, done: !n.done }
          : n
        ),
      };
    }

    else if (action.type === 'POPUP_REDACT_DELETE_EDUCATION'){
      state.education.splice(state.education.indexOf(action.payload), 1);
      state.education = Object.assign([], state.education, [...state.education]);
      return {
        ...state,

      };
    }
    else if (action.type === 'POPUP_REDACT_ADD_EDUCATION'){
      state.education.push(action.payload);
      state.education = Object.assign([], state.education, [...state.education]);
      return {
        ...state
      }
    }
    else if (action.type === 'POPUP_REDACT_DELETE_EXPERIENCE'){
      state.exp.splice(state.exp.indexOf(action.payload), 1);
      state.exp = Object.assign([], state.exp, [...state.exp]);
      return {
        ...state,

      };
    }
    else if (action.type === 'POPUP_REDACT_ADD_EXPERIENCE'){
      state.exp.push(action.payload);
      state.exp = Object.assign([], state.exp, [...state.exp]);

      return {
        ...state,
      };
    }
    
    else if (action.type === 'POPUP_REDACT_USERNAME_CHANGE'){
        state.placeholder.userName = action.payload;
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_DESCRIPTION_CHANGE'){
        state.placeholder.description = action.payload;
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_BIRTHDAY_CHANGE'){
      state.placeholder.birthday = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_CITIZENSHIP_CHANGE'){
      state.placeholder.cz = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_CITY_CHANGE'){
      state.placeholder.city = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_INITIALIZE_PROFILE'){
        state = action.payload;
        return {
          ...state
        };
    }
    
    else if (action.type === 'CHANGE_GENDER_TO_MALE'){
      state.placeholder.gender = 'male';
      return {
        ...state
      };
    }
    else if (action.type === 'CHANGE_GENDER_TO_FEMALE'){
      state.placeholder.gender = 'female';
      return {
        ...state
      };
    }
    return state;
}