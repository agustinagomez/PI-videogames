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
        type: CLEAR_STATE
    }
}
export const getAllVideogames = () => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames`)
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
        return axios.get('http://localhost:3001/videogames')
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
        return axios.get(`http://localhost:3001/videogame/${id}`)
        .then(r => {
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: r.data
            }) 
        })
        .catch(e => {alert(e.error)})
    }
}


export const getGenres = () => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/genres`)
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
        return axios.get(`http://localhost:3001/platforms`)
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
        return axios.post(`http://localhost:3001/videogames`, body)
        .then(r => {
            dispatch({
                type: CREATE_VIDEOGAME,
                payload: r.data
            })
        })
        .catch(e => {alert(e.error)})
    }
}

export const searchVideogames = (name) => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then(r => {
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload: r.data
            })
        })
        .catch(e => {alert(e.error)})
    }
}
