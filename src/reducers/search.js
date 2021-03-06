const initialState = {
    searchLoading:false,
    next:'initial',
    searchCount: 0,
    openedResponseId:-1,
    searchValues:[],
    searchOptions:{
        searchType:'vacancy',
        phrase:'',
        'max-salary':400000,
        'min-salary':0,
        grades: [],
        'work-type':[],
        tag:null,
        industry:null
    },

    searchVacancyOptions:{
        search_query:'front-end разработчик',
        main_sort_value:'pub_date',
        sort_type:'asc',
        sub_sort_value:'salary',
        salary_max:123,
        salary_min:10,
        pub_date_min:'03-03-2020',
        max_grades: 'middle',
        min_grades: 'junior',
        work_type:[],
        experience:'',
        tags:[],
        industry:''
    }
  };
  
  
export default function userState(state = initialState, action){
    if (action.type === 'SEARCH_UPDATE_VALUES'){
        action.payload.forEach((item)=>{state.searchValues.push(item)});
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_SORT_VALUES'){
        state.searchValues = action.payload;
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_UPDATE_VALUES_PHOTO'){
        let value = state.searchValues.find(x => x.pk === action.payload.id)
        if (value !== undefined) value.photo_url = action.payload.photo
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);

        return {
            ...state
        };
    }
    else if (action.type === 'CLOSE_RESPONSE_POPUP'){
        state.openedResponseId = -1;

        return {
            ...state
        };
    }
    else if (action.type === 'OPEN_RESPONSE_POPUP'){
        state.openedResponseId = action.payload;

        return {
            ...state
        };
    }
    else if (action.type === 'UPDATE_SEND_RESPONSE'){
        state.searchValues.find(x => x.pk === action.payload).got_responsed = true
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);
        return {
            ...state
        };
    }
    
    else if (action.type === 'ADD_TO_FAVOURITES'){
        state.searchValues.find(x => x.pk === action.payload).favorite = true
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);
        return {
            ...state
        };
    }
    else if (action.type === 'DELETE_FROM_FAVOURITES'){
        state.searchValues.find(x => x.pk === action.payload).favorite = false
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);
        return {
            ...state
        };
    }
    
    else if (action.type === 'CHANGE_SEARCH_QUERY'){
        state.searchOptions.phrase = action.payload;
        return {
            ...state
        };
    }
    else if (action.type === 'CHANGE_SEARCH_TYPE'){
        state.searchOptions.searchType = action.payload;
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_START_LOADING'){
        state.searchLoading = true;
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_STOP_LOADING'){
        state.searchLoading = false;
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_NULLIFY_VALUES'){
        state.searchValues = []
        state.next = 'initial'
        state.searchCount = 0
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_SET_OPTIONS'){
        state.searchOptions = {...state.searchOptions, ...action.payload}
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_NULLIFY_OPTIONS'){
        state.searchOptions = {
                searchType:'vacancy',
                phrase:'',
                'max-salary':400000,
                'min-salary':0,
                grades: [],
                'work-type':[],
                tag:null,
                industry:null
        }
        return {
            ...state
        };
    }
    
    else if (action.type === 'SEARCH_OPTIONS_ADD_GRADE'){
        console.log(state.searchOptions.grades.includes(action.payload))
        if (!state.searchOptions.grades.includes(action.payload)) state.searchOptions.grades.push(action.payload)
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_OPTIONS_DELETE_GRADE'){
        if (state.searchOptions.grades.includes(action.payload)) state.searchOptions.grades.splice(state.searchOptions.grades.indexOf(action.payload), 1)
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_OPTIONS_ADD_WORK_TYPE'){
        if (!state.searchOptions['work-type'].includes(action.payload)) state.searchOptions['work-type'].push(action.payload)
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_OPTIONS_DELETE_WORK_TYPE'){
        if (state.searchOptions['work-type'].includes(action.payload)) state.searchOptions['work-type'].splice(state.searchOptions['work-type'].indexOf(action.payload), 1)
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});

        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_OPTIONS_CHANGE_INDUSTRY'){
        state.searchOptions.industry = action.payload
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});


        return {
            ...state
        };
    }
    
    else if (action.type === 'GET_SEARCH_QUERY_FETCH_SUCCES'){
        state.next = action.data.next
        return {
            ...state
        };
    }
    
    else if (action.type === 'SEARCH_UPDATE_RESULTS_COUNT'){
        state.searchCount = action.payload
        return {
            ...state
        };
    }
    
    return state;
}