const initialState = {
    state:'muted',
    popupRedactActiveSection:'images',
    placeholder: {
      userName: '',
      description: '',
      avatar: '',
      gender: '',
      personalBackground: '',
      birthday: '',
      citizenship:'',
      profile_link: '',
      photo_url: '',
      profile_background: ''
    },
    address:{},
    userPhones: [],
    language:[],
    education: [],
    experience : [],
    social_links: [],
    buf:{
      languageGrade:'A1',
      cropper:{
        state:false,
        file:'',
        maxWidth:0,
        maxHeight:0,
        instance:{

        },
        imageType:''
      }
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
    else if (action.type === 'SET_CROPPER_INSTANCE'){
      state.buf.cropper.instance = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_CHANGE_SECTION'){
      state.popupRedactActiveSection = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'SET_CROPPER_FILE'){
      state.buf.cropper.file = action.payload;
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
    else if (action.type === 'POPUP_REDACT_PERSONAL_BACKGROUND_CHANGE'){
      state.placeholder.profile_background = action.payload;
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
      state.experience.splice(state.experience.indexOf(action.payload), 1);
      state.experience = Object.assign([], state.experience, [...state.experience]);
      return {
        ...state,

      };
    }
    else if (action.type === 'POPUP_REDACT_ADD_EXPERIENCE'){
      state.experience.push(action.payload);
      state.experience = Object.assign([], state.experience, [...state.experience]);

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
      state.placeholder.citizenship = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_ADDRESS_CHANGE'){
      state.address = action.payload;
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
    else if(action.type === 'ACTIVATE_PROFILE_REDACT_IMAGE_CROPPER'){
      console.log(action.payload)
      state.buf.cropper.state = true;
      state.buf.cropper.file = action.payload[0]
      state.buf.cropper.maxWidth = action.payload[1]
      state.buf.cropper.maxHeight = action.payload[2]
      state.buf.cropper.imageType = action.payload[3]
      return {
        ...state
      };
    }
    else if(action.type === 'DEACTIVATE_PROFILE_REDACT_IMAGE_CROPPER'){
      state.buf.cropper = {}
      return {
        ...state
      };
    }
    return state;
}