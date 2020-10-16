import Orfanato from '../models/orfanato';
import ImagemView from './imagensView';

export default {
    render(orfanato: Orfanato){
        return {
            id: orfanato.id,
            nome: orfanato.nome,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            sobre: orfanato.sobre,
            instrucoes: orfanato.instrucoes,
            aberto_fim_de_semana: orfanato.aberto_fim_de_semana,
            horas_aberto: orfanato.horas_aberto,
            imagem: ImagemView.renderVarios(orfanato.imagens)
        }
        
    },

    renderVarios(orfanatos: Orfanato[]){
        return orfanatos.map(orfanato => this.render(orfanato))
    }
}