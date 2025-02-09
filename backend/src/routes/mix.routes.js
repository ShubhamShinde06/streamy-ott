import {Router} from 'express'
import { toggleLike, countView, getAllContent } from '../controllers/mix.controller.js'

const route = Router()

route.get('/get-mix', getAllContent)
route.post('/content/:id', countView)
route.post('/toggle-like/:id', toggleLike)

export default route