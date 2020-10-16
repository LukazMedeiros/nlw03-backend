import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class criarOrfanatos1602817870867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orfanatos',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'sobre',
                    type: 'text'
                },
                {
                    name: 'instrucoes',
                    type: 'text'
                },
                {
                    name: 'aberto_fim_de_semana',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'horas_aberto',
                    type: 'varchar'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orfanatos')
    }

}
