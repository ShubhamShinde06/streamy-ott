import {Router} from 'express'
import { addToList, getToList } from '../controllers/mylist.controller.js'

const route = Router()

route.post('/add', addToList)
route.get('/get/:userId', getToList)

export default route