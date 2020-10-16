import express, { response } from 'express';
import './database/conexao';
import Rotas from './routes';

const server = express();
server.use(express.json());
server.use(Rotas)



server.listen(3333, ()=>{
    console.log(`aplicação rodando na porta 3333`)
})