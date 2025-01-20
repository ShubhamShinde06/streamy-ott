import {Router} from 'express'
import { getMovies, uploadMovie } from '../controllers/movie.controller.js'
import upload from '../middleware/multer.middleware.js'

const route = Router()

route.post('/upload', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}]) ,uploadMovie)
route.get('/get-movies', getMovies )

export default route