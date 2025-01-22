import {Router} from 'express'
import { countLike, countView, getAllContent } from '../controllers/mix.controller.js'

const route = Router()

route.get('/get-mix', getAllContent)
route.get('/content/:id/visit', countView)
route.post('/content/:id/toggle-like', countLike)

export default route