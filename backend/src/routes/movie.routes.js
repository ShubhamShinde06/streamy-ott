import {Router} from 'express'
import { uploadMovie } from '../controllers/movie.controller.js'
import upload from '../middleware/multer.middleware.js'

const route = Router()

route.post('/upload', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}]) ,uploadMovie)

export default route