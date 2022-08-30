import React from 'react'
import { Link } from 'react-router-dom';
import s from './Card.module.css'
import spiderman from './spiderman.jpg'
function Card({name, rating,image, genres, Genres, Platforms, id}) {
  
  return (
    <div className={s.card}>
      <div className={s.imgTitleContainer}>
        <img className={s.image} src={name.toLowerCase() !== `marvel's spider-man` ? image : spiderman} alt="not found" />
        <b>{rating.toString().length === 1 ? `${rating}.0  ★` : `${rating}  ★`}</b>
        <div className={s.content}>
        
        {
          Platforms && Platforms.length
          ? <Link to={`/videogame/${id}_DB`} className={s.title}><h1 >{name}</h1></Link>
          : <Link to={`/videogame/${id}`} className={s.title} ><h1 >{name}</h1></Link>
        }
        <div className={s.genres}>
        <h4>Genres:</h4>
       {
          Genres && Genres.length
          ? Genres.map((g, i) => g.name ? <p key={i}>{g.name}</p> : <p key={i}>{g}</p>) //los de la base de datos tienen name
          : genres?.map((g, i) => <p key={i}>{g}</p>) //los de la api son genres con minuscula
        }
      </div>
        <div className={s.rating}>
        <h4>Rating: </h4>
        <p>{rating.toString()[0] === '1' ? '★☆☆☆☆' 
            : rating.toString()[0] === '2' ? '★★☆☆☆'
            : rating.toString()[0] === '3' ? '★★★☆☆'
            : rating.toString()[0] === '4' ? '★★★★☆'
            : '★★★★★'}</p>
         </div>   
        
        </div>
      </div>
    </div>
  )
}

export default Card