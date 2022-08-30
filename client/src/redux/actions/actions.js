import axios from 'axios';

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const CLEAR_STATE = 'CLEAR_STATE'
export const GET_ALL_NAMES = 'GET_ALL_NAMES'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const SORT_ASC = 'SORT_ASC'
export const SORT_DESC = 'SORT_DESC'
export const FILTER_BY = 'FILTER_BY'
export const TOGGLE_ORIGIN = 'TOGGLE_ORIGIN'
export const SET_RESULTS = 'SET_RESULTS'

export const setResults = (name) => {
    return function(dispatch){
        dispatch({
            type: SET_RESULTS,
            payload: name
        })
    }
}
export const toggleOrigin = (origin) => {
    return function(dispatch){
        dispatch({
            type: TOGGLE_ORIGIN,
            payload: origin
        })
    }
}

export const filterBy = (filter, name) => {
    return function(dispatch){
        dispatch({
            type: FILTER_BY,
            payload: {filter, name}
        })
    }
}

export const sortAsc = () => {
    return function(dispatch){
        dispatch({
            type: SORT_ASC
        })
    }
}

export const sortDesc = () => {
    return function(dispatch){
        dispatch({
            type: SORT_DESC
        })
    }
}

export const updatePage = (page) => {
    return function(dispatch){
        dispatch({
            type: UPDATE_PAGE,
            payload: page
        })
    }
}

export const clearState = () => {
    return {
        type: CLEAR_STATE,
        payload: {}
    }
}
export const getAllVideogames = () => {
    return function(dispatch){
        return axios.get(`/videogames`)
        .then(r => {
            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: r.data
            })
        })
        .catch(e => {alert(e.error)})
    }
};

export const getAllNames = () => {
    return function(dispatch){
        return axios.get('/videogames')
        .then(r => {
            dispatch({
                type: GET_ALL_NAMES,
                payload: r.data
            })
        })
        .catch(e => {alert(e.message)})
    }
}

export const getVideogameDetail = (id) => {
    return function(dispatch){
        return axios.get(`/videogame/${id}`)
        .then(r => {
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: r.data
            }) 
        })
        .catch(e => {alert(e.message)})
    }
}


export const getGenres = () => {
    return function(dispatch){
        return axios.get(`/genres`)
        .then(r => {
            dispatch({
                type: GET_GENRES,
                payload: r.data
            })
            
        })
        .catch(e => {alert(e.error)})
    }
}

export const getPlatforms = () => {
    return function(dispatch){
        return axios.get(`/platforms`)
        .then(r => {
            dispatch({
                type: GET_PLATFORMS,
                payload: r.data
            })
        })
        .catch(e => {alert(e.error)})
    }
}

export const createVideogame = (body) => {
    return function(dispatch){
        return axios.post(`/videogames`, body)
        .then(r => {
            dispatch({
                type: CREATE_VIDEOGAME,
                payload: r.data
            })
        })
        .catch(e => {console.log(e)})
    }
}

export const searchVideogames = (name) => {
    return function(dispatch){
        return axios.get(`/videogames?name=${name}`)
        .then(r => {
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload: r.data
            })
        })
        .catch(e => {alert(e.error)})
    }
}
