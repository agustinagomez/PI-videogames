import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllVideogames } from '../../redux/actions/actions'
import SearchBar from './SearchBar'

function Nav() {
    const dispatch = useDispatch();
  return (
    <div>
        <SearchBar/>
        <ul>
            <li>Filters</li>
            <ul>
                <li><button onClick={() => dispatch(getAllVideogames())}>Show All</button></li>
                <li>By Genre</li>
                <li>By Platform</li>
            </ul>
            <li><Link to='/videogames/create'>Create Videogame</Link></li>
        </ul>
    </div>
  )
}

export default Nav