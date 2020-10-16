import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Orfanato from './orfanato';

@Entity('imagens')
export default class imagens {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    caminho: string;
    
    @ManyToOne(()=>Orfanato, orfanato=>orfanato.imagens)
    @JoinColumn({name: 'orfanato_id'})
    orfanato: Orfanato;
}