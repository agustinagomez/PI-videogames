import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updatePage} from '../../redux/actions/actions.js'
import s from './Pagination.module.css'; 

function Pagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.currentPage)
    const videogames = useSelector(state => state.videogames)
    const [maxPages, setMaxPages] = useState(1);
    const perPage = useSelector(state => state.perPage)

    useEffect(() => {
        setMaxPages(videogames.length > perPage
            ? Math.ceil(videogames.length / perPage)
            : 1)
    }, [videogames]) //el maximo de paginas disponibles depende directamente del estado de videogames

  return (
    <div className={s.container}>
        <button disabled={currentPage - 1 < 1} onClick={() => dispatch(updatePage(currentPage - 1))}>{'<'}</button>
        <b>{currentPage} of {maxPages}</b>
        <button disabled={currentPage + 1 > maxPages} onClick={() => dispatch(updatePage(currentPage + 1))}>{'>'}</button>
    </div>
  )
}

export default Pagination