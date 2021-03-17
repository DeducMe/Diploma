const initialState = {
    searchValues:[],
    searchResumeOptions:{
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
        tags:[],
        industry:''
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
        state.searchValues = action.payload;
        return {
            ...state
        };
    }
    
    return state;
}