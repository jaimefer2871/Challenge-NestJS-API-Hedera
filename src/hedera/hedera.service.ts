import { Injectable } from '@nestjs/common';
import { CreateHederaDto } from './dto/create-hedera.dto';
import { UpdateHederaDto } from './dto/update-hedera.dto';

@Injectable()
export class HederaService {
  create(createHederaDto: CreateHederaDto) {
    return 'This action adds a new hedera';
  }

  findAll() {
    return `This action returns all hedera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hedera`;
  }

  update(id: number, updateHederaDto: UpdateHederaDto) {
    return `This action updates a #${id} hedera`;
  }

  remove(id: number) {
    return `This action removes a #${id} hedera`;
  }
}
