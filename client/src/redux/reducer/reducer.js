import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME,
    SEARCH_VIDEOGAMES,
    GET_GENRES,
    GET_PLATFORMS,
    CLEAR_STATE,
    GET_ALL_NAMES,
    UPDATE_PAGE,
    SORT_ASC,
    SORT_DESC,
    FILTER_BY,
    TOGGLE_ORIGIN,
    SET_RESULTS
} from '../actions/actions.js'

const initialState = {
    videogames: [],
    platforms: [],
    genres: [],
    created: {},
    videogameDetail: {},
    allNames: [],
    currentPage: 1,
    perPage: 15,
    selectedFilters:{
        platforms: [],
        genres: []
    },
    dbVideogames: [],
    apiVideogames: [],
    searchResults: ''
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case SET_RESULTS:
            return{
                ...state,
                searchResults: `Search results for "${action.payload}"`
            }
        case TOGGLE_ORIGIN:
            return{
                ...state,
                searchResults: '',
                currentPage: 1,
                selectedFilters: {platforms: [], genres: []},
                videogames: action.payload === 'API'
                ? [...state.apiVideogames] : [...state.dbVideogames]
            }
        case FILTER_BY:
            return {
                ...state,
                currentPage: 1,
                searchResults: '',
                selectedFilters: {
                    ...state.selectedFilters,
                    [action.payload.filter]: [...new Set([...state.selectedFilters[action.payload.filter], action.payload.name])]
                },
                videogames: action.payload.filter === 'platforms'
                ? [...state.videogames].filter(v => v.Platforms?.some(p => p.name === action.payload.name) || v.platforms?.includes(action.payload.name))
                : [...state.videogames].filter(v => v.Genres?.some(g => g.name === action.payload.name) || v.genres?.includes(action.payload.name))
            }
        case SORT_ASC:
            return {
                ...state,
                videogames: [...state.videogames].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0)),
                currentPage: 1
            }
        case SORT_DESC:
            return {
                ...state,
                videogames: [...state.videogames].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0)),
                currentPage: 1
            }
        case UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case GET_ALL_NAMES:
            return {
                ...state,
                allNames: action.payload.map(v => v.name) 
            }
        case CLEAR_STATE:
            return {
                ...state,
                created: action.payload,
                videogameDetail: action.payload
            }
        case GET_ALL_VIDEOGAMES:
            
            return {
                ...state,
                searchResults: '',
                videogames: action.payload,
                selectedFilters: {platforms: [], genres: []},
                currentPage: 1,
                dbVideogames: action.payload?.filter(v => v.Platforms),
                apiVideogames: action.payload?.filter(v => v.platforms)
            };
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetail: action.payload
            };
        case CREATE_VIDEOGAME:
            return {
                ...state,
                videogames: [...state.videogames, action.payload],
                created: action.payload
            };
        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                currentPage: 1,
                selectedFilters: {platforms: [], genres: []}
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }

        default:
            return state;
    }
};