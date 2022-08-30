const { Router } = require("express");
const genreRouter = Router();
const {Videogame, Genre, Op, Platform} = require('../db')
const {default: axios} = require ("axios")
const {API_KEY} = process.env

//https://api.rawg.io/api/genres?key=49d9b2c26785422e9433d2b3fd18277f
genreRouter.get('/', async(req, res, next)=> {
    let id = 1;
    try {
        let genres = await Genre.findAll();
        if(!genres.length){
            let apigenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            let genreNames = apigenres.data.results.map(g => g.name)
            
            await genreNames.map(name => {
                 Genre.create({
                    id: id++,
                    name: name
                })
            })
            return res.send(genreNames)
        }
        return res.send(genres.map(g => g.name))
    } catch (error) {
        
        return res.status(400).send(error)
    }
    // let id = 1; 
    // Genre.findAll() //busco en la base de datos
    // .then(genres => { //recibo la respuesta, puede ser un [{}, {}, {}] o []
    //     if(genres.length){
    //         return genres
    //     }else{
    //     return axios.get(`https://api.rawg.io/api/genres?key=49d9b2c26785422e9433d2b3fd18277f`)  
    //     }
    // })
    // .then(obj => { // obj es un {...} con muchas propiedades o [{name, id},{...},{...}]
    //     if(obj.length && obj[0].id){
    //         return obj
    //     } else {
    //     const genresDB = obj.data.results.map(o => o.name)
    //     return genresDB
    //     }
    // })
    // .then(r => {
    //     if(r.length && r[0].id) return res.send(r.map(o => o.name))
    //   Promise.all(r.map(g => { Genre.create({ id: id++, name: g }) }))  
    //   .then(() => {
    //     return res.send(r)
    //   })
    // })
    // .catch(e => {
    //     console.log(e)
    //     return res.status(400).send(e)
    // })
})

module.exports = genreRouter;