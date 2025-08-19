
import { Module } from '@nestjs/common';
import { TidenModule } from './tiden/interface/module';


const submodule = [
  TidenModule,

];

@Module({
  imports: submodule,
  exports: submodule,
})
export class ParameterModule { }
