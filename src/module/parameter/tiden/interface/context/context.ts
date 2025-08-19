import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiResponses, ParamsDto } from 'src/shared/util';
import { TidenEnum } from '../../infrastructure/enum/enum';
import { TidenService } from '../../infrastructure/service/service';
import { TidenEntity } from '../../domain/entity';
import { TidenDto } from '../../infrastructure/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller(TidenEnum.msService)
export class TidenContext {
    constructor(private readonly service: TidenService) { }


    @MessagePattern({ cmd: TidenEnum.cmdFindAll })
    public async findAll(@Payload() params: ParamsDto): Promise<ApiResponses<TidenEntity>> {
        return await this.service.findAll(params);
    }

    @MessagePattern({ cmd: TidenEnum.cmdFindById })
    public async findById(@Payload('id') id: number) {
        return await this.service.findById(+id);
    }

    @MessagePattern({ cmd: TidenEnum.cmdCreate })
    public async create(@Payload() data: TidenDto): Promise<ApiResponse<TidenEntity>> {
        return await this.service.create(data);
    }

    @MessagePattern({ cmd: TidenEnum.cmdUpdate })
    public async update(@Payload('id') id: number, @Payload() data: TidenDto): Promise<ApiResponse<TidenEntity>> {
        return await this.service.update(+id, data);
    }

    @MessagePattern({ cmd: TidenEnum.cmdDelete })
    public async delete(@Payload('id') id: number): Promise<ApiResponse<TidenEntity>> {
        return await this.service.delete(+id);
    }
}
