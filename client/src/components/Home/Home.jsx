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
    <div className={s.container}>
      <div className={s.head}>
      <SearchBar/>
      <Nav/>
      </div>
          {videogames.length ? <Cards/> : <div className={s.empty}> <div className={s.gradient}> <button onClick={() => dispatch(getAllVideogames())}>Show All</button></div> </div>}

    </div> 
   )
}

export default Home