import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

const erro: ErrorRequestHandler = (error, request, response, next) => {
    
    if (error instanceof ValidationError) {
        let erros: ValidationErrors ={};
        error.inner.forEach(err =>{
            erros[err.path] = err.errors;
        })

        return response.status(400).json({mensagem: `erro de validação`, erros})
    }
    
    console.error(error)
    return response.status(500).json({mensagem: `irro interno no servidor`})
}

export default erro;