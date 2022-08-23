import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearState, getVideogameDetail } from '../../redux/actions/actions'
import { Link } from 'react-router-dom'
import s from './Detail.module.css'

function Detail(props) {
  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id))
    return () => {dispatch(clearState())}
  },[])
 

  const videogame = useSelector(state => state.videogameDetail)

  return (
    <div><Link to='/home'><button>Go Home</button></Link>
      {videogame.name
     ? <div>
        <div> 
         <img src={videogame.image} alt="not found" />
         <h1>{videogame.name}</h1>
       </div>
       <h2>{videogame.rating}</h2>
       <p>{videogame.description}</p>
       <h4>Released: {videogame.released}</h4>
      <div>
         <h4>Genres:</h4>
         {
            props.match.params.id.includes('DB')
          ? videogame.Genres?.map((g, i) => <p key={i}>{g.name}</p>)
          : videogame.genres?.map((g, i) => <p key={i}>{g}</p>)
         }
      </div>
      <div>
        <h4>Platforms:</h4>
        {
          props.match.params.id.includes('DB')
          ? videogame.Platforms?.map((p, i) => <p key={`${i}_PLAT`}>{p.name}</p>)
          : videogame.platforms?.map((p, i) => <p key={`${i}plat`}>{p}</p>)
        }
      </div>
      
    </div>

     : videogame.message //si no hay name pregunto si hay mensaje y lo muestro
      ? <h2>{videogame.message}</h2> //si no hay mensaje ni name esta cargando y muestro el gif
      : <div className={s.container}><img src='https://i.pinimg.com/originals/f0/86/bf/f086bf3d490cddd0c739f002fd993d5c.gif'></img></div>} 
    </div>
  )
}

export default Detail