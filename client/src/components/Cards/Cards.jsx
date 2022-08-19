import React from 'react'
import Card from './Card'
import {useSelector} from 'react-redux'
import Pagination from '../Pagination/Pagination.jsx'
import s from './Card.module.css'

function Cards() {
  const videogames = useSelector(state => state.videogames)
  const perPage = useSelector(state => state.perPage)
  const currentPage = useSelector(state => state.currentPage)

  return (
    <div >
      <Pagination/>
      < div className={s.cards}>{videogames?.slice((currentPage - 1) * perPage, currentPage * perPage)
          .map(v => <Card key={v.id} {...v}/>)}</div>
    </div>
  )
}

export default Cards