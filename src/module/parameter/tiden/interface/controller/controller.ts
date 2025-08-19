import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiResponse, ApiResponses, ParamsDto } from 'src/shared/util';
import { TidenEnum } from '../../infrastructure/enum/enum';
import { TidenService } from '../../infrastructure/service/service';
import { TidenEntity } from '../../domain/entity';
import { TidenDto } from '../../infrastructure/dto';


@Controller(TidenEnum.table)
export class TidenController {
    constructor(private readonly service: TidenService) { }


    @Get('/')
    public async findAll(@Body() params: ParamsDto): Promise<ApiResponses<TidenEntity>> {
        return await this.service.findAll(params);
    }

    @Get(':id')
    public async findById(@Param('id') id: number) {
        return await this.service.findById(+id);
    }

    @Post()
    public async create(@Body() data: TidenDto): Promise<ApiResponse<TidenEntity>> {
        return await this.service.create(data);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() data: TidenDto): Promise<ApiResponse<TidenEntity>> {
        return await this.service.update(+id, data);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<ApiResponse<TidenEntity>> {
        return await this.service.delete(+id);
    }
}
