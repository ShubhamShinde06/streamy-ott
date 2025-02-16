import {Router} from 'express'
import { getSavedContent, saveContent } from '../controllers/saved.controller.js'

const route = Router()

route.post('/add', saveContent)
route.get('/get', getSavedContent)

export default route