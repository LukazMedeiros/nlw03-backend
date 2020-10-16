import { ErrorRequestHandler } from 'express';

const erro: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error)
    return response.status(500).json({mensagem: `irro interno no servidor`})
}

export default erro;