import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllVideogames, getGenres, getPlatforms, sortAsc, sortDesc, filterBy, updatePage } from '../../redux/actions/actions'
import SearchBar from './SearchBar'


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
    // const [isOpen, setIsOpen] = useState({
    //   genres: false,
    //   platforms: false
    // })
    // const handleFilters = (e) => {
    //   if(e.target.value !== 'all'){
    //     dispatch(filterBy(e.target.name, e.target.value))
    //     dispatch(updatePage(1))
    //   }
    // }
    // const toggle = (type) => {
    //   setIsOpen({...isOpen, [type]: !isOpen[type]})
    // }
    const handleChange = (e) => {
      // toggle(e.target.name)
      if(e.target.name && e.target.value){
        dispatch(filterBy(e.target.name, e.target.value))
        console.log(e.target.value)
        e.target.value = ''
        console.log(videogames)
      }
    }

  return (
    <div>
        <SearchBar/>
        <ul>

            <li>Filters</li>

            <ul>
                <li><button onClick={() => dispatch(getAllVideogames())}>Show All</button></li>

                <li><h4>By Genre</h4>  
                <select multiple onChange={handleChange} name='genres'>
                    {/* <option value="all">Select Genres</option> */}
                    {genresAvailable?.map(g => <option key={`${g}.op`} value={g}>{g}</option>)}
                  </select>
                  <p>Selected Filters:</p>
                  <ul>
                  {selectedFilters.genres.length
                  ?  selectedFilters.genres.map(f => <li key={`${f}_38`}>{f}</li>)
                  : <li>You haven't selected any filters</li>}
                  </ul>
                </li>

                <li><h4>By Platform</h4>  
                  <select multiple onChange={handleChange} name='platforms'>
                    {platformsAvailable?.map(p => <option key={`${p}.op`} value={p}>{p}</option>)}
                  </select>
                  <p>Selected Filters:</p>
                  <ul>
                  {selectedFilters.platforms.length
                  ?  selectedFilters.platforms.map(f => <li key={`${f}_38`}>{f}</li>)
                  : <li>You haven't selected any filters</li>}
                  </ul>
                </li>
            </ul>
            
            <li>Sort</li>
            <ul>
              <li> <button disabled={!videogames.length} onClick={() => dispatch(sortAsc())}>Z-A</button> </li>
              <li><button disabled={!videogames.length} onClick={()=> dispatch(sortDesc())}>A-Z</button></li>
            </ul>

            <li><Link to='/videogames/create'>Create Videogame</Link></li>
        </ul>
    </div>
  )
}

export default Nav