const { Router } = require("express");
const platformRouter = Router();
const {Videogame, Genre, Op, Platform} = require('../db')
const {default: axios} = require ("axios")

platformRouter.get('/', async(req, res, next)=> {
    try {
        let [platforms, platformNames] = [await Platform.findAll(), []];
        if(platforms.length) return res.send(platforms.map(p => p.name));

        let apiPlatforms = await axios.get(`https://api.rawg.io/api/games?key=49d9b2c26785422e9433d2b3fd18277f`)
        apiPlatforms.data.results.map(g => g.platforms.map(p => platformNames.push(p.platform.name)))
        let set = new Set(platformNames)
        let id = 1;
        let response = [...set]
        await response.map(p => {
            Platform.create({
                name: p,
                id: id++
            })
        })
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
})

module.exports = platformRouter;