import express, { response } from 'express';
import 'express-async-errors';
import './database/conexao';
import Rotas from './routes';
import Path from 'path';
import cors from 'cors';
import Erro from './errors/erros';

const server = express();
server.use(cors());
server.use(express.json());
server.use(Rotas);
server.use('/uploads', express.static(Path.join(__dirname, '..', 'uploads')));
server.use(Erro);



server.listen(3333, ()=>{
    console.log(`aplicação rodando na porta 3333`)
})