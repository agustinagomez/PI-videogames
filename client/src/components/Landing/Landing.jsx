import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames } from '../../redux/actions/actions.js';
import { Link } from 'react-router-dom';
import s from './Landing.module.css'

function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames())
  }, [])

  let videogames = useSelector(state => state.videogames);

  return (
    <div className={s.landing}>
      <h1 className={s.landingTitle}>Videogames</h1>
      {videogames.length ? <Link to='/home'><button className={s.goHome}>Go Home</button></Link> : <h2>Loading...</h2>}
    </div>
  )
}

export default Landing