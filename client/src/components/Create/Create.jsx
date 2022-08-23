import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createVideogame, getGenres, getPlatforms, clearState, getAllVideogames, getAllNames } from '../../redux/actions/actions'
import Card from '../Cards/Card'
import s from './Create.module.css'
import {Link} from 'react-router-dom'

function Create() {

    const dispatch = useDispatch();
    const created = useSelector(state => state.created)
    const genresAvailable = useSelector(state => state.genres)
    const platformsAvailable = useSelector(state => state.platforms)
    const allNames = useSelector(state => state.allNames)
    const videogames = useSelector(state => state.videogames)

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
        dispatch(getAllNames())
    }, [])

    // useEffect(()=> {
    //     dispatch(getAllVideogames())
        
    // }, [created])

    useEffect(() => {
        return () => {dispatch(clearState())}
    }, []) 
    const [errors, setError] = useState({
        name: '',
        description: '',
        rating: '',
        image: '',
        released: '',
        Platforms: '',
        Genres: ''
    })

    const [data, setData] = useState({
        name: '',
        description: '',
        released: '',
        rating: 1,
        image: '' || 'https://cdn.wallpapersafari.com/65/85/5PsmQR.jpg',
        Genres: [],
        Platforms: []
    })

    const validate = (e) => {
        
            if(e.target.name === 'name'){
                !e.target.value
                ? setError({...errors, [e.target.name]: 'Required'})
                : /^[\w\d\s-:]+$/gi.test(e.target.value)
                   ? setError({...errors, [e.target.name]: ''})
                   : setError({...errors, [e.target.name]: 'Use only letters, numbers and dashes'});
                if(allNames.filter(v => v.toLowerCase() === e.target.value.toLowerCase()).length > 0) setError({...errors, [e.target.name]: `Videogame ${e.target.value} already exists`})
                else if(e.target.value.length > 35) setError({...errors, [e.target.name]: `35 characters max.`})
            }
            else if(e.target.name === 'description'){
                !e.target.value
                ? setError({...errors, [e.target.name]: 'Required'})
                : setError({...errors, [e.target.name]: ''});  
            }
            else if(e.target.name === 'released'){
                !e.target.value ? setError({...errors, [e.target.name]: ''})
                : /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(e.target.value)
                  ? setError({...errors, [e.target.name]: ''})
                  : setError({...errors, [e.target.name]: 'Enter a valid date (YYYY-MM-DD)'})
            }
            else if(e.target.name === 'image'){
                if(!e.target.value){
                 setError({...errors, [e.target.name]: ''})
                }else{
                  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(e.target.value)
                  ? setError({...errors, [e.target.name]: ''})
                  : setError({...errors, [e.target.name]: 'Enter a valid image url'})
                }
            }
            else if(e.target.name === 'rating'){
                !e.target.value
                ? setError({...errors, [e.target.name]: ''})
                : /^[+-]?([1-9]+\.?[0-9]*|\.[0-9]+)$/.test(e.target.value) && 5 >= e.target.value
                  ? setError({...errors, [e.target.name]: ''})
                  : setError({...errors, [e.target.name]: 'Rating can only contain numbers (max. 5.0)'})
            }
            else{
                !e.target.value
                ? setError({...errors, [e.target.name]: 'Required'})
                : setError({...errors, [e.target.name]: ''});
            }
        setData({...data, [e.target.name]: e.target.value});
        
    }



    const handleChange = (e) => {
        if(e.target.checked){
            setData({...data, [e.target.name]: [...data[e.target.name], e.target.value]})
            setError({...errors, [e.target.name]: ''})

        } else {
            if(data[e.target.name].length === 1){
              setError({...errors, [e.target.name]: 'Required'})
            }
         setData({...data, [e.target.name]: data[e.target.name].filter(d => d !== e.target.value)})
        }    
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Object.values(errors).some(error => error !== '') || !data.name || !data.description || !data.Platforms.length || !data.Genres.length 
        ? alert('Why would you do that to my button? ):< Check the information!')
          : data.released
          ? dispatch(createVideogame({...data, rating: (data.rating * 1).toFixed(2)})) //rating toFixed para que llegue con decimales (4.00)
          : dispatch(createVideogame({...data, released: null, rating: (data.rating * 1).toFixed(2)})) //released null para que no haya problemas
          setData({
            name: '',
            description: '',
            released: '',
            image: '' || 'https://cdn.wallpapersafari.com/65/85/5PsmQR.jpg',
            rating: 1,
            Genres: [],
            Platforms: []   
          })
        dispatch(getAllNames())
        dispatch(getAllVideogames())
    }



  return (
   <div className={s.container}>
    <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        {console.log(data)}
        <div>
            <h3>* Name: </h3>
            <input type="text" value={data.name} placeholder='Name is required' name='name' onChange={e => validate(e)} />
            {errors.name ? <p>{errors.name}</p> : ''}
        </div>

        <div>
            <h3>* Description: </h3>
            <textarea value={data.description} placeholder='Description is required' name='description' onChange={e => validate(e)}></textarea>
            {errors.description ? <p>{errors.description}</p> : ''}
        </div>

        <div>
            <h3>Release Date: </h3>
            <input type="date" name="released" placeholder='YYYY-MM-DD' value={data.released} onChange={e => validate(e)} />
            {errors.released ? <p>{errors.released}</p> : ''}
        </div>

        <div>
         <h3>* Genres: </h3>
         <ul>
            {genresAvailable?.map((g, i) => {
                return <li key={`${g}_${i}`}>
                    <input id={`${g}_cb`} type="checkbox" name='Genres' value={g} onChange={e => handleChange(e)}/>

                    <label htmlFor={`${g}_cb`}>{g}</label> 
                    </li>
                })
            }
         </ul>
         {errors.Genres ? <p>{errors.Genres}</p> : ''}
        </div>

        <div>
         <h3>* Platforms: </h3>
          <ul>
             {platformsAvailable?.map((p, i) => {
                return <li key={`${p}_${i}`}>
                <input id={`${p}_cb`} type="checkbox" name='Platforms' value={p} onChange={e => handleChange(e)}/>

                <label htmlFor={`${p}_cb`}>{p}</label> 
                </li>
               })
             }
         </ul>
         {errors.Platforms ? <p>{errors.Platforms}</p> : ''}
        </div> 

        <div>
            <h3>Rating: </h3> 
            <input type="number" value={data.rating} step='0.05' min='1' max='5' name='rating' onChange={e => validate(e)}/>
            {errors.rating ? <p>{errors.rating}</p> : ''}
        </div>

        <div>
            <h3>Image: </h3>
            <input name='image' onChange={e => validate(e)} type="url"/>
            {errors.image ? <p>{errors.image}</p> : ''}
        </div>

        {console.log(errors)}
        <button type='submit' disabled={!data.name || !data.description || !data.Platforms.length || !data.Genres.length ||Object.values(errors).some(error => error !== '')}>Create</button>
    </form>
        
    {created.name
     ? <div>
        <button onClick={() => dispatch(clearState())}>x</button>
        <h3>{`Videogame ${created.name} successfully created`}</h3>
       <Card key={created.name}{...created}/>
       </div>
     : <h3>Create A Videogame!</h3>
     }
    <Link className={s.link}to='/home'><button>Go Home</button></Link>
    </div> 
  )
}

export default Create