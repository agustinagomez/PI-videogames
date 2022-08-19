import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME,
    SEARCH_VIDEOGAMES,
    GET_GENRES,
    GET_PLATFORMS,
    CLEAR_STATE,
    GET_ALL_NAMES,
    UPDATE_PAGE
} from '../actions/actions.js'

const initialState = {
    videogames: [],
    platforms: [],
    genres: [],
    created: {},
    videogameDetail: {},
    allNames: [],
    currentPage: 1,
    perPage: 15
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
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
                created: {}
            }
        case GET_ALL_VIDEOGAMES:
            console.log('PAYLOAD', action.payload)
            return {
                ...state,
                videogames: action.payload
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
                videogames: action.payload
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