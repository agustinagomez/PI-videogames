const { Router } = require("express");
const videogameRouter = Router();
const {Videogame, Genre, Op, Platform} = require('../db')
const {default: axios} = require ("axios")
const {API_KEY} = process.env

videogameRouter.get('/:id', (req, res, next)=>{
    const {id} = req.params;
    if(id[id.length - 1] === 'B'){
        Videogame.findByPk(id.split('_')[0]*1, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }, {
                model: Platform,
                attributes: ['name'],
                through: {attributes: []}
            }]
        })
        .then(r => res.send(r))
        .catch(e => res.status(404).send(e))

    } else {

        axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(r => res.send ({
            image: r.data.background_image,
            name: r.data.name,
            genres: r.data.genres.map(g => g.name),
            platforms: r.data.platforms.map(p => p.platform.name),
            rating: r.data.rating,
            description: r.data.description_raw,
            released: r.data.released
        }))
        .catch(e => res.send(e))
    } 
})



module.exports = videogameRouter;