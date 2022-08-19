import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames } from '../../redux/actions/actions.js';
import { Link } from 'react-router-dom';

function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames())
  }, [])

  let videogames = useSelector(state => state.videogames);

  return (
    <div>
      {videogames.length ? <Link to='/home'><button>Go Home</button></Link> : <h1>Loading...</h1>}
    </div>
  )
}

export default Landing