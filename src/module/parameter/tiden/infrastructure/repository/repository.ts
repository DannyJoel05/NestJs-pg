import { InjectRepository } from "@nestjs/typeorm";
import { TidenEntity, TidenParams } from "../../domain/entity";
import { TidenPort } from "../../domain/port";
import { TidenModel } from "../model/model";
import { Repository } from "typeorm";
import { TidenValue } from "../../domain/value";
import { InformationMessage, ResponseUtil } from "src/shared/util";
import { TidenEnum } from "../enum/enum";
import { Injectable } from "@nestjs/common";
import { PgService } from "src/common/database/pg.service";

@Injectable()
export class TidenDBRepository implements TidenPort {

    private readonly table = TidenEnum.table;

    constructor(
        @InjectRepository(TidenModel) private readonly ormRepository: Repository<TidenModel>,
        private readonly pgRepository: PgService,
    ) {
    }


    public async findAll(params: TidenParams): Promise<{ data: TidenEntity[]; total: number; }> {
        try {
            const { page, pageSize } = params;
            const skip = (page - 1) * pageSize;
            const sql = `SELECT * FROM ${this.table} ORDER BY tiden_cod_tiden LIMIT ${pageSize} OFFSET ${skip}`;
            const result = await this.pgRepository.queryList<TidenEntity>(sql);
            const countResult = await this.pgRepository.queryGet<{ total: number }>(`SELECT COUNT(*)::int AS total FROM ${this.table}`);
            const total = countResult?.total || 0;
            return {
                data: result.map(item => new TidenValue(item).toJson()),
                total,
            };
        } catch (error: any) {
            throw ResponseUtil.error(
                InformationMessage.error({ action: 'list', resource: this.table, method: 'findAll' }),
                500,
                error
            );
        }
    }

    public async findById(id: number): Promise<TidenEntity | null> {
        try {
            // Usar parámetros en la consulta para evitar inyección SQL
            const sql = `SELECT * FROM ${this.table} WHERE tiden_cod_tiden = $1`;
            const geted = await this.pgRepository.queryGet<TidenEntity>(sql, [id]);
            if (!geted) return null;
            return new TidenValue(geted).toJson();
        } catch (error: any) {
            throw ResponseUtil.error(
                InformationMessage.error({ action: 'get', resource: this.table, method: 'findById' }),
                500,
                error
            );
        }
    }



    public async create(data: TidenEntity): Promise<TidenEntity | null> {
        try {
            const sql = `
            INSERT INTO ${this.table} (tiden_des_tiden, tiden_abr_tiden)
            VALUES ( $1, $2)
            RETURNING *;
            `;
            const params = [data.tiden_des_tiden, data.tiden_abr_tiden];
            console.log('Params:', params);
            const created = await this.pgRepository.queryGet<TidenEntity>(sql, params);
            if (!created) return null;
            return new TidenValue(created).toJson();
        } catch (error: any) {
            throw ResponseUtil.error(
                InformationMessage.error({ action: 'create', resource: this.table, method: 'create' }),
                500,
                error,
            );
        }
    }



    public async update(id: number, data: TidenEntity): Promise<TidenEntity | null> {
        try {
            const sql = `UPDATE ${this.table} SET 
            tiden_des_tiden = '${data.tiden_des_tiden}',
            tiden_abr_tiden = '${data.tiden_abr_tiden}'
            WHERE tiden_cod_tiden = ${id} RETURNING *; `;
            const updated = await this.pgRepository.queryGet<TidenEntity>(sql);
            if (!updated) return null;
            return new TidenValue(updated).toJson();
        } catch (error: any) {
            throw ResponseUtil.error(InformationMessage.error({ action: 'update', resource: this.table, method: 'update' }), 500, error);
        }
    }

    public async delete(id: number): Promise<TidenEntity | null> {
        try {
            const sql = `DELETE FROM ${this.table} WHERE tiden_cod_tiden = ${id} RETURNING *; `;
            const deleted = await this.pgRepository.queryGet<TidenEntity>(sql);
            if (!deleted) return null;
            return new TidenValue(deleted).toJson();
        } catch (error: any) {
            throw ResponseUtil.error(InformationMessage.error({ action: 'delete', resource: this.table, method: 'delete' }), 500, error);

        }
    }

}