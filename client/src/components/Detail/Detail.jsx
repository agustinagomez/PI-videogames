import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearState, getVideogameDetail } from '../../redux/actions/actions'
import { Link } from 'react-router-dom'
import s from './Detail.module.css'
import goback from './left-arrow.png'
import spiderman from '../Cards/spiderman.jpg'

function Detail(props) {
  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id))
    return () => {dispatch(clearState())}
  },[])
 

  const videogame = useSelector(state => state.videogameDetail)

  return (
    <div className={s.all}>
      {videogame.name
     ? <div className={s.vgcontainer}>
        <img className={s.image}src={videogame.name.toLowerCase() !== `marvel's spider-man` ? videogame.image : spiderman} alt="not found" />
        <div className={s.content}>
          <div className={s.top}>
        <Link to='/home'><button><img src={goback} alt="notfound"/></button></Link>
        </div>
        
       <div className={s.innercontent}>
        <div className={s.titlecontainer}>
       <h1>{videogame.name}</h1>
       <div className={s.line}></div>
       </div>
        <div className={s.stars}>
          <h2>{videogame.rating.toString().length === 1 ? `${videogame.rating}.0` : `${videogame.rating}`}</h2>
          <span className={s.shadow}><div className={s.filledstar}></div></span>
          <span className={s.shadow}><div className={videogame.rating >= 1.9 ? s.filledstar: s.emptystar}></div></span>
          <span className={s.shadow}><div className={videogame.rating >= 2.9 ? s.filledstar: s.emptystar}></div></span>
          <span className={s.shadow}><div className={videogame.rating >= 3.9 ? s.filledstar: s.emptystar}></div></span>
          <span className={s.shadow}><div className={videogame.rating >= 4.9 ? s.filledstar: s.emptystar}></div></span>
        </div>      
       <p className={s.description}>{videogame.description}</p>
       <h4>Released: {videogame.released}</h4>
       <div className={s.gp}>
         <h4>Genres:</h4>
         {
            props.match.params.id.includes('DB')
          ? videogame.Genres?.map((g, i) => <p key={i}>{g.name}</p>)
          : videogame.genres?.map((g, i) => <p key={i}>{g}</p>)
         }
       </div>
       <div className={s.gp}>
        <h4>Platforms:</h4>
        {
          props.match.params.id.includes('DB')
          ? videogame.Platforms?.map((p, i) => <p key={`${i}_PLAT`}>{p.name}</p>)
          : videogame.platforms?.map((p, i) => <p key={`${i}plat`}>{p}</p>)
        }
       </div>
       </div>
       </div>
      </div>

     : videogame.message //si no hay name pregunto si hay mensaje y lo muestro
      ? <div className={s.errorcontainer}>
          <div className={s.modalwindow}>
            <div className={s.windowcontent}>
              <h2 className={s.title}>Error 404</h2>        
            <h3>{videogame.message}</h3>
            <Link to='/home'><button>Go Home</button></Link>
            </div>
          </div>
        </div> //si no hay mensaje ni name esta cargando y muestro el gif
      : <div className={s.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </div>} 
    </div>
  )
}

export default Detail