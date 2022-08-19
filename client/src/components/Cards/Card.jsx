import React from 'react'
import { Link } from 'react-router-dom';
import s from './Card.module.css'
function Card({name, image, genres, Genres, Platforms, id}) {
  
  return (
    <div className={s.card}>
      <div className={s.imgTitleContainer}>
        <img className={s.image} src={image} alt="not found" />
        {
          Platforms && Platforms.length
          ? <Link to={`/videogame/${id}_DB`}><h1 className={s.title}>{name}</h1></Link>
          : <Link to={`/videogame/${id}`}><h1 className={s.title} >{name}</h1></Link>
        }
      </div>
        <h4>Genres:</h4>
       {
          Genres && Genres.length
          ? Genres.map((g, i) => g.name ? <p key={i}>{g.name}</p> : <p key={i}>{g}</p>) //los de la base de datos tienen name
          : genres?.map((g, i) => <p key={i}>{g}</p>) //los de la api son genres con minuscula
        }
    </div>
  )
}

export default Card