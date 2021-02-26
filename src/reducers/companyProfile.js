const initialState = {
    state:'muted',
    popupRedactActiveSection:'baseInfo',
    placeholder: {
      name: '',
      about: '',
      address: '',
      profile_link: '',
      photo_url: '',
      profile_background: '',
      phone: [],
      links: []
    },
    
    buf:{
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
    if (action.type === 'POPUP_EMPLOYER_REDACT_PROFILE_ACTIVATE'){
        state.state = 'active';
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_EMPLOYER_REDACT_PROFILE_DEACTIVATE'){
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
    else if (action.type === 'POPUP_EMPLOYER_REDACT_CHANGE_SECTION'){
      state.popupRedactActiveSection = action.payload;
      return {
        ...state
      };
    }
    
    else if (action.type === 'PROFILE_EMPLOYER_REDACT_AVATAR_CHANGE'){
      state.placeholder.photo_url = action.payload;
      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_EMPLOYER_REDACT_PERSONAL_BACKGROUND_CHANGE'){
      console.log(action.payload)
      state.placeholder.profile_background = action.payload;
      return {
        ...state,
      };
    }
    
    
    else if (action.type === 'POPUP_EMPLOYER_REDACT_ADD_PHONE'){
      state.placeholder.phone.push(action.payload);
      state.placeholder.phone = Object.assign([], state.placeholder.phone, [...state.placeholder.phone]);

      return {
        ...state,
      };
    }
    else if (action.type === 'POPUP_EMPLOYER_REDACT_DELETE_PHONE'){
      state.placeholder.phone.splice(state.placeholder.phone.indexOf(action.payload), 1);
      state.placeholder.phone = Object.assign([], state.placeholder.phone, [...state.placeholder.phone]);

      return {
        ...state
      };
    }

    else if (action.type === 'POPUP_EMPLOYER_REDACT_USERNAME_CHANGE'){
        state.placeholder.name = action.payload;
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_EMPLOYER_REDACT_DESCRIPTION_CHANGE'){
        state.placeholder.about = action.payload;
        return {
          ...state
        };
    }
    
    else if (action.type === 'POPUP_EMPLOYER_REDACT_ADDRESS_CHANGE'){
      state.placeholder.address = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_EMPLOYER_REDACT_INITIALIZE_PROFILE'){
        state = action.payload;
        return {
          ...state
        };
    }
  
    else if(action.type === 'PROFILE_EMPLOYER_REDACT_ACTIVATE_IMAGE_CROPPER'){
      state.buf.cropper.state = true;
      state.buf.cropper.file = action.payload[0]
      state.buf.cropper.maxWidth = action.payload[1]
      state.buf.cropper.maxHeight = action.payload[2]
      state.buf.cropper.imageType = action.payload[3]
      return {
        ...state
      };
    }
    else if(action.type === 'PROFILE_EMPLOYER_REDACT_DEACTIVATE_IMAGE_CROPPER'){
      state.buf.cropper = {}
      return {
        ...state
      };
    }
    return state;
}