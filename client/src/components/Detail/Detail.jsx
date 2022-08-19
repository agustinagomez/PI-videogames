import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getVideogameDetail } from '../../redux/actions/actions'
import { Link } from 'react-router-dom'
function Detail(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id))
  },[])
  const videogame = useSelector(state => state.videogameDetail)

  return (
    <div>
      <div>
        <Link to='/home'><button>Go Home</button></Link>
        <img src={videogame.image} alt="not found" />
        <h1>{videogame.name}</h1>
      </div>
      <h2>{videogame.rating}</h2>
      <div>{videogame.description}</div>
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
  )
}

export default Detail