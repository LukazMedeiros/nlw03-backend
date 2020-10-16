import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import Orfanatos from '../models/orfanato';
import orfanatoView from '../views/orfanatosView';

export default {
    
    async criar(request:Request, response:Response){
        const {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            aberto_fim_de_semana,
            horas_aberto
        } = request.body;
        
        const orfanatosRepository = getRepository(Orfanatos);
        
        const requestImagens = request.files as Express.Multer.File[];
        const imagens = requestImagens.map(imagem =>{
            return {caminho:imagem.filename}
        })
        
        const orfanato = orfanatosRepository.create({
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            aberto_fim_de_semana,
            horas_aberto,
            imagens
        });
        await orfanatosRepository.save(orfanato)
        
        response.status(201).json({mensagem:"cadastrado com sucesso"})
    },
    
    async listar(request:Request, response:Response){
        const orfanatosRepository = getRepository(Orfanatos)
        const orfanatos = await orfanatosRepository.find({
            relations: ['imagens']
        })
        return response.json(orfanatoView.renderVarios(orfanatos))  
    },
    
    async buscarEspecifico(request:Request, response:Response){
        const {id} = request.params;
        const orfanatosRepository = getRepository(Orfanatos)
        const orfanato = await orfanatosRepository.findOneOrFail(id, {
            relations: ['imagens']
        })
        return response.json(orfanatoView.render(orfanato)) 
    },
}