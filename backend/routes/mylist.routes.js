import {Router} from 'express'
import { addToList, deleteToList, getToList } from '../controllers/mylist.controller.js'

const route = Router()

route.post('/add', addToList)
route.get('/get/:userId', getToList)
route.delete('/delete/:saveId/:userId', deleteToList)

export default route