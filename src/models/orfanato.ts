import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Imagem from './imagem';

@Entity('orfanatos')
export default class orfanato {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    nome: string;
    
    @Column()
    latitude: string;
    
    @Column()
    longitude: string;
    
    @Column()
    sobre: string;
    
    @Column()
    instrucoes: string;
    
    @Column()
    aberto_fim_de_semana: boolean;
    
    @Column()
    horas_aberto: string

    @OneToMany(()=>Imagem, imagem => imagem.orfanato, {
        cascade:['insert', 'update']
    })
    @JoinColumn({name: 'orfanato_id'})
    imagens: Imagem[];
}