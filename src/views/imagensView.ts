import Imagem from '../models/imagem';

export default {
    render(imagem: Imagem){
        return {
            id: imagem.id,
            url: `http://localhost:3333/uploads/${imagem.caminho}`
        }
        
    },

    renderVarios(imagem: Imagem[]){
        return imagem.map(imagem => this.render(imagem))
    }
}