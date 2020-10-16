import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload'
import orfanatosController from './controllers/orfanatosController'

const rotas = Router();
const upload = multer(uploadConfig);

rotas.post('/orfanatos', upload.array('imagens'), orfanatosController.criar)
rotas.get('/orfanatos', orfanatosController.listar)
rotas.get('/orfanatos/:id', orfanatosController.buscarEspecifico)

export default rotas;