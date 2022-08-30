import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'
import rocket from './rocket.png'
import earth from './earth.png'
import astronaut from './astronaut.png'
import error from './error-404.png'

function Error() {
  return (
    <div class="bg-purple">

  <div class="stars">
    <div class="central-body">
     <h2 className='title'>Error 404</h2>
      
      <Link to="/home" class="btn-go-home">GO BACK HOME</Link>
    </div>
    <div class="objects">
      <img class="object_rocket" src={rocket} width="40px"/>
      <div class="earth-moon">
        <img class="object_earth" src={earth} width="100px"/>
        <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
      </div>
      <div class="box_astronaut">
        <img class="object_astronaut" src={astronaut} width="140px"/>
      </div>
    </div>
    <div class="glowing_stars">
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>
      <div class="star"></div>

    </div>

  </div>

</div>
  )
}

export default Error