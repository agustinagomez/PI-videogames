import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames } from '../../redux/actions/actions';
import Cards from '../Cards/Cards.jsx'


function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames)

  return (
      <div>
          {videogames.length ? <Cards/> : <button onClick={() => dispatch(getAllVideogames())}>Show All Videogames</button>}
      </div>
   )
}

export default Home