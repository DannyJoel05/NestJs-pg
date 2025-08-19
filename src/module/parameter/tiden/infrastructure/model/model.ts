import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TidenEnum } from '../enum/enum';
import { TidenEntity } from '../../domain/entity';

@Entity({ name: TidenEnum.table })
export class TidenModel implements TidenEntity {
    @PrimaryGeneratedColumn()
    tiden_cod_tiden: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    tiden_des_tiden: string;

    @Column({ type: 'text', nullable: true })
    tiden_abr_tiden: string;

    @CreateDateColumn()
    tiden_fech_crea: Date;

    @UpdateDateColumn()
    tiden_fech_actu: Date;

}
