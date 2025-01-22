import {Router} from 'express'
import { deleteSeries, getSeries, singleSeries, updateSeries, uploadSeries } from '../controllers/webseries.controller.js'
import upload from '../middleware/multer.middleware.js'

const route = Router()

route.post('/upload', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}]), uploadSeries)
route.get('/get-series', getSeries)
route.get('/get-single-series/:id', singleSeries)
route.delete('/delete-series/:id', deleteSeries)
route.put('/update-series/:id', updateSeries)

export default route