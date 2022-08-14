const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express');
const {vgRouter} = require('./videogames.js')
const videogameRouter = require('./videogame.js');
const genreRouter = require('./genres.js');
const platformRouter = require('./platforms.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.use('/videogames', vgRouter);
router.use('/videogame', videogameRouter);
router.use('/genres', genreRouter);
router.use('/platforms', platformRouter)

module.exports = router;
