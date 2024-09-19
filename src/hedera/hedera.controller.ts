import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { CreateHederaDto } from './dto/create-hedera.dto';
import { UpdateHederaDto } from './dto/update-hedera.dto';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) {}

  @Post()
  create(@Body() createHederaDto: CreateHederaDto) {
    return this.hederaService.create(createHederaDto);
  }

  @Get()
  findAll() {
    return this.hederaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hederaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHederaDto: UpdateHederaDto) {
    return this.hederaService.update(+id, updateHederaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hederaService.remove(+id);
  }
}
