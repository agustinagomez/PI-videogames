import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {getAllVideogames, getGenres, getPlatforms, sortAsc, sortDesc, filterBy, toggleOrigin } from '../../redux/actions/actions'
import './Nav.css'
import showall from './showall.png'
function Nav() {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames)
    useEffect(()=>{
      dispatch(getGenres())
      dispatch(getPlatforms())
    }, [])
    const genresAvailable = useSelector(state => state.genres)
    const platformsAvailable = useSelector(state => state.platforms)
    const selectedFilters = useSelector(state => state.selectedFilters)
    const searchResults = useSelector(state => state.searchResults)

    const handleChange = (e) => {
      if(e.target.name && e.target.value){
        dispatch(filterBy(e.target.name, e.target.value))
        console.log(e.target.value)
        e.target.value = ''
        console.log(videogames)
      }
    }

    const [barsClass, setBarsClass] = useState('menu-bars unclicked')
    const [filtersClass, setFiltersClass] = useState('menu-filters hidden')
    const [clicked, setClicked] = useState(false)

    const updateMenu = () => {
      if(!clicked) {
        setBarsClass('menu-bars clicked')
        setFiltersClass('menu-filters visible')
      } else {
        setBarsClass('menu-bars unclicked')
        setFiltersClass('menu-filters hidden')
      }
      setClicked(!clicked)
    }

  return (
    <div className='options'>
      {searchResults ? <div className='resultscont'> <h2 className='results'>{searchResults}</h2> <button onClick={() => dispatch(getAllVideogames())}> <img width="18px" src={showall} alt="notfound" /> Show all</button></div> : <h2 className='emp'></h2>}
      <nav>
          <div onClick={updateMenu} className='filterButton'>
            <p>Filters</p>
          <div onClick={updateMenu} className='menubars'>
           <div className={barsClass}>{''}</div>
           <div className={barsClass}>{''}</div>
           <div className={barsClass}>{''}</div>
          </div>
          </div>
      </nav>
        <div className={filtersClass}>

            <ul className='filterContainer'>
                <li className='buttons'>
                 <button onClick={() => dispatch(getAllVideogames())}>Show All</button>
                 <button onClick={() => dispatch(toggleOrigin('API'))}>API Videogames</button>
                 <button onClick={() => dispatch(toggleOrigin('CREATED'))}>Created Videogames</button>
                </li>

                <li className='gp'><h4>By Genre</h4>  
                <select disabled={!videogames.length} multiple onChange={handleChange} name='genres'>
                    {/* <option value="all">Select Genres</option> */}
                    {genresAvailable?.map(g => <option key={`${g}.op`} value={g}>{g}</option>)}
                  </select>
                  <p>Selected Filters</p>
                  <ul>
                  {selectedFilters.genres.length
                  ?  selectedFilters.genres.map(f => <li key={`${f}_38`}>{f}</li>)
                  : <li>You haven't selected any filters</li>}
                  </ul>
                </li>

                <li className='gp'><h4>By Platform</h4>  
                  <select disabled={!videogames.length} multiple onChange={handleChange} name='platforms'>
                    {platformsAvailable?.map(p => <option key={`${p}.op`} value={p}>{p}</option>)}
                  </select>
                  <p>Selected Filters</p>
                  <ul>
                  {selectedFilters.platforms.length
                  ?  selectedFilters.platforms.map(f => <li key={`${f}_38`}>{f}</li>)
                  : <li>You haven't selected any filters</li>}
                  </ul>
                </li>
            
            
            <li className='sortContainer'>
              <h4>Sort</h4>
              <div className='buttons sort'>
              <button disabled={!videogames.length} onClick={() => dispatch(sortAsc())}>Z-A</button>
              <button className='az' disabled={!videogames.length} onClick={()=> dispatch(sortDesc())}>A-Z</button>
              </div>
            </li>

            <li className='clearFilters'>
              <button disabled={!selectedFilters.genres.length && !selectedFilters.platforms.length} onClick={()=> dispatch(getAllVideogames())}>Clear Filters</button>
            </li>
        </ul>
         </div>

    </div>
  )
}

export default Nav