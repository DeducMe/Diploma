const initialState = {
    searchValues:[],
    searchOptions:{
        searchType:'vacancy',
        phrase:'',
        'max-salary':null,
        'min-salary':null,
        grade: null,
        'work-type':null,
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
        max_grade: 'middle',
        min_grade: 'junior',
        work_type:[],
        experience:'',
        tags:[],
        industry:''
    }
  };
  
  
export default function userState(state = initialState, action){
    if (action.type === 'SEARCH_UPDATE_VALUES'){
        action.payload.map((item)=>{state.searchValues.push(item)});
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);

        return {
            ...state
        };
    }
    if (action.type === 'SEARCH_UPDATE_VALUES_PHOTO'){
        if (state.searchValues[action.payload.id] !== undefined) state.searchValues[action.payload.id].photo_url = action.payload.photo
        state.searchValues = Object.assign([], state.searchValues, [...state.searchValues]);

        return {
            ...state
        };
    }
    if (action.type === 'CHANGE_SEARCH_QUERY'){
        state.searchOptions.phrase = action.payload;
        return {
            ...state
        };
    }
    if (action.type === 'CHANGE_SEARCH_TYPE'){
        state.searchOptions.searchType = action.payload;
        return {
            ...state
        };
    }
    
    if (action.type === 'SEARCH_NULLIFY_VALUES'){
        state.searchValues = []
        return {
            ...state
        };
    }
    if (action.type === 'SEARCH_SET_OPTIONS'){
        state.searchOptions = {...state.searchOptions, ...action.payload}
        state.searchOptions = Object.assign({}, state.searchOptions, {...state.searchOptions});
        return {
            ...state
        };
    }
    
    
    
    return state;
}