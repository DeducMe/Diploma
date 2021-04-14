
const initialState = {
    vacancies:[],
    placeholder:[],
    newVacancy:{},
    openedVacancyId:-1,
    buf:{
        bufPoints:[]
    }
};
export default function profileState(state = initialState, action){
    if (action.type === 'GET_USER_VACANCIES_FETCH_SUCCES'){
        state.vacancies = action.data
        return {
            ...state,
        };
    }
    else if(action.type === 'INITIALIZE_VACANCY_PLACEHOLDER'){

        state.placeholder = JSON.parse(JSON.stringify(action.payload))
        state.placeholder.map((el)=>el.state='' )
        return {
            ...state,
        };
    }
    else if(action.type === 'ADD_VACANCY_FETCH_SUCCES'){
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_ADD_TAG'){
        console.log(action.payload)
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].tags.push(action.payload.tag)
            console.log(state.placeholder[action.payload.index], state.vacancies[action.payload.index])
            Object.assign([], state.placeholder[action.payload.index].tags, [...state.placeholder[action.payload.index].tags]);
        }
        else {
            state.newVacancy.tags.push(action.payload.tag)

            Object.assign([], state.newVacancy.tags, [...state.newVacancy.tags]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_DELETE_TAG'){
        if (action.payload.index !== state.vacancies.length){
            console.log(state.placeholder[action.payload.index])
            state.placeholder[action.payload.index].tags.splice(state.placeholder[action.payload.index].tags.indexOf(action.payload.index),1)
            
            Object.assign([], state.placeholder[action.payload.index].tags, [...state.placeholder[action.payload.index].tags]);
        }
        else {
            state.newVacancy.tags.splice(state.newVacancy.tags.indexOf(action.payload.tagId),1)
            Object.assign([], state.newVacancy.tags, [...state.newVacancy.tags]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_ADD_POINT'){
        console.log(action.payload)
        state.buf.bufPoints.push(action.payload.text)
        Object.assign([], state.buf.bufPoints, [...state.buf.bufPoints]);
        
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_DELETE_POINT'){
        state.buf.bufPoints.splice(state.buf.bufPoints.indexOf(action.payload.index),1)
        Object.assign([], state.buf.bufPoints, [...state.buf.bufPoints]);
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_ADD_WORK_TYPE'){
        console.log(action.payload)
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].work_type.push(action.payload.workType)
            Object.assign([], state.placeholder[action.payload.index].work_type, [...state.placeholder[action.payload.index].work_type]);
        }
        else {
            state.newVacancy.work_type.push(action.payload.workType)

            Object.assign([], state.newVacancy.work_type, [...state.newVacancy.work_type]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_DELETE_WORK_TYPE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].work_type.splice(state.placeholder[action.payload.index].work_type.indexOf(action.payload.workTypeId),1)
            Object.assign([], state.placeholder[action.payload.index].work_type, [...state.placeholder[action.payload.index].work_type]);
        }
        else {
            state.newVacancy.work_type.splice(state.newVacancy.work_type.indexOf(action.payload.workTypeId),1)
            Object.assign([], state.newVacancy.work_type, [...state.newVacancy.work_type]);
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_VACANCY_NAME'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].vacancy_name = action.payload.text
        }
        else {
            state.newVacancy.vacancy_name = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_GRADE_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].grade = action.payload.text
        }
        else {
            state.newVacancy.grade = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if (action.type ==='POPUP_REDACT_VACANCY_CHANGE_COLOR'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].bg_header_color = action.payload.color
        }
        else {
            state.newVacancy.bg_header_color = action.payload.color
        }

        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_INDUSTRY_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].industry = action.payload.text
        }
        else {
            state.newVacancy.industry = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_ADDRESS_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].address = action.payload.text
        }
        else {
            state.newVacancy.address = action.payload.text
        }
        return {
            ...state,
        };
    }
    
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_LEADING_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].leading = action.payload.text
        }
        else {
            state.newVacancy.leading = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_TRAILING_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].trailing = action.payload.text
        }
        else {
            state.newVacancy.trailing = action.payload.text
        }
        return {
            ...state,
        };
    }
    
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_ABOUT_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].about = action.payload.text
        }
        else {
            state.newVacancy.about = action.payload.text
        }
        return {
            ...state,
        };
    }
    else if(action.type === 'POPUP_REDACT_VACANCY_CHANGE_SALARY_VALUE'){
        if (action.payload.index !== state.vacancies.length){
            state.placeholder[action.payload.index].salary = action.payload.text
        }
        else {
            state.newVacancy.salary = action.payload.text
        }
        return {
            ...state,
        };
    }

    else if (action.type === 'POPUP_REDACT_VACANCY_ACTIVATE'){
        console.log(state.vacancies.length, action.payload)

        state.vacancies[action.payload].state = 'active';
        state.placeholder[action.payload].state = 'active';
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_NEW_VACANCY_ACTIVATE'){
        console.log(state.vacancies.length, action.payload)

        state.newVacancy = action.payload;
        state.newVacancy.state = 'active'
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_DEACTIVATE'){
        console.log(state.vacancies.length, action.payload)
        if (action.payload !== state.vacancies.length && state.vacancies.length !== 0 && action.payload!==-1){
            state.vacancies[action.payload].state = '';
            state.placeholder[action.payload].state = '';
        }
        else {
            state.newVacancy.state = ''
        }
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_ADD_ABOUT_BODY'){
        if (action.payload.index !== state.placeholder.length){
            state.placeholder[action.payload.index].body.push(action.payload.body)
            Object.assign([], state.placeholder[action.payload.index].body, [...state.placeholder[action.payload.index].body]);
        }
        else {
            state.newVacancy.body.push(action.payload.body)
            Object.assign([], state.newVacancy.body, [...state.newVacancy.body]);
        }
        
        return {
            ...state
        }
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_REDACT_ABOUT_BODY'){
        const bodyId = parseInt(state.buf.activeBodyId)
        console.log(bodyId)
        if (action.payload.index !== state.placeholder.length){
            state.placeholder[action.payload.index].body[bodyId] = action.payload.body
            Object.assign([], state.placeholder[action.payload.index].body, [...state.placeholder[action.payload.index].body]);
        }
        else {
            state.newVacancy.body[bodyId] = action.payload.body
            console.log(state.newVacancy.body[bodyId])
            Object.assign([], state.newVacancy.body, [...state.newVacancy.body]);
        }
        
        return {
            ...state
        }
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_DELETE_ABOUT_BODY'){
        console.log(action.payload)
        if (action.payload.index !== state.placeholder.length){
            state.placeholder[action.payload.index].body.splice(action.payload.bodyId, 1)
            Object.assign([], state.placeholder[action.payload.index].body, [...state.placeholder[action.payload.index].body]);
            console.log(state.placeholder[action.payload.index].body)
        }
        else {
            state.newVacancy.body.splice(action.payload.bodyId,1)
            Object.assign([], state.newVacancy.body, [...state.newVacancy.body]);
        }
        return {
            ...state
        }
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_ACTIVATE_ABOUT_BODY'){
        state.buf.activeBodyId = action.payload.bodyId
        return {
            ...state
        }
    }
    else if (action.type === 'POPUP_REDACT_VACANCY_DEACTIVATE_ABOUT_BODY'){
        state.buf.activeBodyId = ''
        return {
            ...state
        }
    }
    else if (action.type === 'OPEN_VACANCY_POPUP'){
        state.openedVacancyId = action.payload;
        return {
        ...state
        };
    }
    else if (action.type === 'CLOSE_VACANCY_POPUP'){
        state.openedVacancyId = -1;
        return {
        ...state
        };
    }
    
    return state
}