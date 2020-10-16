import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import Orfanatos from '../models/orfanato';
import orfanatoView from '../views/orfanatosView';
import * as Yup from 'yup';

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
        
        const dados = {
            nome,
            latitude,
            longitude,
            sobre,
            instrucoes,
            aberto_fim_de_semana,
            horas_aberto,
            imagens
        }
        
        const validacao = Yup.object().shape({
            nome: Yup.string().required('o campo nome é obrigatório'),
            latitude: Yup.number().required('o campo latitude é obrigatório'),
            longitude: Yup.number().required('o campo longitude é obrigatório'),
            sobre: Yup.string().required('o campo sobre é obrigatório').max(300),
            instrucoes: Yup.string().required('o campo instrucoes é obrigatório'),
            horas_aberto: Yup.string().required('o campo horas_aberto é obrigatório'),
            aberto_fim_de_semana: Yup.boolean().required('o campo aberto_fim_de_semana é obrigatório'),
            imagens: Yup.array(Yup.object().shape({
                caminho: Yup.string().required('o campo é obrigatório')
            }))
        })

        await validacao.validate(dados, {abortEarly: false})
        
        const orfanato = orfanatosRepository.create(dados);
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