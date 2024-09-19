import { Module } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { HederaController } from './hedera.controller';

@Module({
  controllers: [HederaController],
  providers: [HederaService],
})
export class HederaModule {}
