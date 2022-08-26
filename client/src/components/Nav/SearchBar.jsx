import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  searchVideogames } from '../../redux/actions/actions';
import s from './SearchBar.module.css'
import loupe from './loupe.png'
import { Link } from 'react-router-dom';
function SearchBar() {
    const videogames = useSelector(state => state.videogames)
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        if(input.length < 3) return alert('Search a videogame')
        dispatch(searchVideogames(input))
        setInput('')
    }

  return (
    <div className={s.searchContainer}>
        <div className={s.titleContainer}>
        <h1 className={s.searchTitle}>Videogames</h1>
        <Link to='/videogames/create'><button>Create Videogame</button></Link>
        </div>
        <form onSubmit={onSubmit}>
            <input className={s.searchInput} type="text" value={input} placeholder='Search Videogames' onChange={(e)=> setInput(e.target.value)}/>
            <button className={s.searchButton} type='submit'>
              <img src={loupe} className={s.loupe} alt="aaa"/>
            </button>
        </form>
    </div>
  )
}

export default SearchBar