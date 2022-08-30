const { Router } = require("express");
const vgRouter = Router();
const {Videogame, Genre, Op, Platform} = require('../db')
const {default: axios} = require ("axios");
const {API_KEY} = process.env

let cache = [];

vgRouter.get('/', async(req, res, next)=>{
    const {name} = req.query;
    try {
        //SI HAY LONGITUD EN EL CACHE:
        if(cache.length){
            const dbVideogames = await Videogame.findAll({include:[{
                model: Genre,
                attributes: ["name"],
                through: {attributes: []}
            }, {
                model: Platform,
                attributes: ['name'],
                through: {attributes: []}
            }]})

            const response = [...cache.slice(0, 99), ...dbVideogames]
            //SI ME PASAN UN NAME POR QUERY DEVUELVO LOS PRIMEROS 15
            if(name){
                const filtered = response.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
               return filtered.length > 15 ? res.send(filtered.slice(0, 15)) : res.send(filtered)
            }

            return res.send(response);
        };  


        //SI NO HAY LONGITUD EN EL CACHE:
        const dbVideogames = await Videogame.findAll({include:[{
            model: Genre,
            attributes: ["name"],
            through: {attributes: []}
        }, {
            model: Platform,
            attributes: ['name'],
            through: {attributes: []}
        }]})

        // let [promises, page, current] = [[], 1, ''];
        // while(page < 6){
        //     if(page === 1){
        //         current = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        //         videogames = [...current.data.results];
        //     } else {
        //         current = await axios.get(current.data.next);
        //         videogames = [...videogames, ...current.data.results]
        //     }
        //     page++
        // }
  
        // const response = videogames.map(v => {
        //     return {
        //         id: v.id,
        //         image: v.background_image,
        //         name: v.name,
        //         genres: v.genres.map(g => g.name)
        //     }
        // })
        // cache = [...response];

        // return res.send([...cache, ...dbVideogames]);
        let urls = [];
        for(let i = 1; i < 6; i++){
            urls.push((`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`))
        }
   
        let promisesVg = await Promise.all(urls.map(url => axios.get(url))) //ESTO ME DEVUELVE UN ARRAY DE POMESAS
        let apiVideogames = promisesVg.map(p => p.data.results)  //Mapeo el array de promesas, accedo a cada data y results[]
       //le hago un flat porque apivideogames es un array con subarrays que contienen distintos results, asi tengo cada pag en el mismo []
        cache = apiVideogames.flat().map(v => { // guardo en mi cache lo que me interesa traer
            return {
                id: v.id,
                rating: v.rating,
                image: v.background_image,
                name: v.name,
                genres: v.genres.map(g => g.name),
                platforms: v.platforms.map(p => p.platform.name)
            }
        })
        return res.send([...cache, ...dbVideogames])
    } catch (error) {
        return res.status(404).send(error)
    }
})

vgRouter.post('/', async(req, res, next)=>{
    const {name, description, released, image, rating, Platforms, Genres} = req.body;
    try {
        const newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            image
        })
        let genresDB = await Genre.findAll({where:{
            name: {[Op.or]: Genres}
        }})
        await newGame.setGenres(genresDB);

        let platformsDB = await Platform.findAll({where:{
            name: {[Op.or]: Platforms}
        }})
        await newGame.setPlatforms(platformsDB);
        
        let response = newGame.dataValues
        return res.send({...response, Genres, Platforms})
    } catch (error) {
       
        return res.status(400).send(error)
    }
})

module.exports = {vgRouter, cache};