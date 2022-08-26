import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames } from '../../redux/actions/actions';
import Cards from '../Cards/Cards.jsx'
import s from './Home.module.css'
import Nav from '../Nav/Nav.jsx'
import SearchBar from '../Nav/SearchBar'
function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames)

  return (
    <>
     <SearchBar/>
      <div className={s.homeContainer}>
        <Nav/>
          {videogames.length ? <Cards/> : <button onClick={() => dispatch(getAllVideogames())}>Show All Videogames</button>}
      </div>
    </> 
   )
}

export default Home