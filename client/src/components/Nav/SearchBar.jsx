import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  searchVideogames } from '../../redux/actions/actions';


function SearchBar() {
    const videogames = useSelector(state => state.videogames)
    const [input, setInput] = useState('');
    const [results, setResults] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        if(input.length < 3) return alert('Search a videogame')
        dispatch(searchVideogames(input))
        setResults(`Search results for: ${input}`)
        setInput('')
    }

  return (
    <div>
        <h1>Videogames</h1>
        {videogames.length < 16 && <h3>{results}</h3>}
        <form onSubmit={onSubmit}>
            <input type="text" value={input} placeholder='Search Videogames' onChange={(e)=> setInput(e.target.value)}/>
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default SearchBar