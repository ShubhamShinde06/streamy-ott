import {Router} from 'express'
import verifyToken from '../middleware/verifyToken.js'
import { addReport } from '../controllers/report.controller.js'

const route = Router()

route.post('/add', verifyToken ,addReport)

export default route