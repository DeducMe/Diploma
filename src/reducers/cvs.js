
const initialState = {
    cvs:[],
    placeholder:[],
    newCv:{}
};
export default function profileState(state = initialState, action){
    if (action.type === 'GET_USER_RESUMES_FETCH_SUCCES'){
        state.cvs = action.data
        return {
            ...state,
        };
    }
    else if(action.type === 'INITIALIZE_RESUME_PLACEHOLDER'){

        state.placeholder = JSON.parse(JSON.stringify(action.payload))
        state.placeholder.map((el)=>el.state='' )
        return {
            ...state,
        };
    }
    else if(action.type === 'ADD_RESUME_FETCH_SUCCES'){
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_ADD_TAG'){
        console.log(action.payload)
        if (action.payload.index !== state.cvs.length){
            state.placeholder[0].tags.push(action.payload.tag)
            console.log(state.placeholder[action.payload.index], state.cvs[action.payload.index])
            Object.assign([], state.placeholder[action.payload.index].tags, [...state.placeholder[action.payload.index].tags]);
        }
        else {
            state.newCv.tags.push(action.payload.tag)

            Object.assign([], state.newCv.tags, [...state.newCv.tags]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_DELETE_TAG'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].tags.splice(state.placeholder[action.payload.index].tags.indexOf(action.payload.tagId),1)
            Object.assign([], state.placeholder[action.payload.index].tags, [...state.placeholder[action.index].tags]);
        }
        else {
            state.newCv.tags.splice(state.newCv.tags.indexOf(action.payload.tagId),1)
            Object.assign([], state.newCv.tags, [...state.newCv.tags]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_ADD_WORK_TYPE'){
        console.log(action.payload)
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].work_type.push(action.payload.workType)
            Object.assign([], state.placeholder[action.payload.index].work_type, [...state.placeholder[action.payload.index].work_type]);
        }
        else {
            state.newCv.work_type.push(action.payload.workType)

            Object.assign([], state.newCv.work_type, [...state.newCv.work_type]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_DELETE_WORK_TYPE'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].work_type.splice(state.placeholder[action.payload.index].work_type.indexOf(action.payload.workTypeId),1)
            console.log(state.placeholder[action.payload.index])
            Object.assign([], state.placeholder[action.payload.index].work_type, [...state.placeholder[action.payload.index].work_type]);
        }
        else {
            state.newCv.work_type.splice(state.newCv.work_type.indexOf(action.payload.workTypeId),1)
            Object.assign([], state.newCv.work_type, [...state.newCv.work_type]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_CHANGE_VACANCY_NAME'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].vacancy_name = action.payload.text
        }
        else {
            state.newCv.vacancy_name = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_CHANGE_GRADE_VALUE'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].grade = action.payload.text
        }
        else {
            state.newCv.grade = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_CHANGE_INDUSTRY_VALUE'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].industry = action.payload.text
        }
        else {
            state.newCv.industry = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_CHANGE_ABOUT_VALUE'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].about = action.payload.text
        }
        else {
            state.newCv.about = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_RESUME_CHANGE_SALARY_VALUE'){
        if (action.payload.index !== state.cvs.length){
            state.placeholder[action.payload.index].salary = action.payload.text
        }
        else {
            state.newCv.salary = action.payload.text
        }
        return {
            ...state,
        };
    }

    else if (action.type === 'POPUP_REDACT_RESUME_ACTIVATE'){
        console.log(state.cvs.length, action.payload)

        state.cvs[action.payload].state = 'active';
        state.placeholder[action.payload].state = 'active';
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_NEW_RESUME_ACTIVATE'){
        console.log(state.cvs.length, action.payload)

        state.newCv = action.payload;
        state.newCv.state = 'active'
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_RESUME_DEACTIVATE'){
        console.log(state.cvs.length, action.payload)
        if (action.payload !== state.cvs.length && state.cvs.length === 0 && action.payload!==-1){
            state.cvs[action.payload].state = '';
            state.placeholder[action.payload].state = '';
        }
        else {
            state.newCv.state = ''
        }
        return {
          ...state
        };
    }
    return state
}