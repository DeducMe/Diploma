const initialState = {
    leafletMap:{
    },
    openedVacancy:{

    }
};
  
  
export default function userData(state = initialState, action){
    if (action.type === 'INIT_LEAFLET_MAP'){
        state.leafletMap.map = action.payload;
        return {
        ...state
        };
    }
    if (action.type === 'CHANGE_LEAFLET_MAP_POSITION'){
        state.leafletMap.data = action.payload;
        return {
        ...state
        };
    }
    if (action.type === 'GET_VACANCY_FETCH_SUCCES'){
        state.openedVacancy = action.data;
        state.openedVacancy = Object.assign({}, state.openedVacancy, {...state.openedVacancy});

        return {
        ...state
        };
    }

    return state;
}