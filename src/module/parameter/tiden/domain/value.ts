import { TidenEntity } from "./entity";

export class TidenValue implements TidenEntity {
    tiden_cod_tiden?: number;
    tiden_des_tiden: string;
    tiden_abr_tiden: string;

    constructor(data: TidenEntity) {
        this.tiden_cod_tiden = data.tiden_cod_tiden;
        this.tiden_des_tiden = data.tiden_des_tiden;
        this.tiden_abr_tiden = data.tiden_abr_tiden;
    }

    public toJson(): TidenEntity {
        return {
            tiden_cod_tiden: this.tiden_cod_tiden,
            tiden_des_tiden: this.tiden_des_tiden,
            tiden_abr_tiden: this.tiden_abr_tiden,
        };
    }

}