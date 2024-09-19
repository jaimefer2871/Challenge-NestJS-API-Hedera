import { PartialType } from '@nestjs/mapped-types';
import { CreateHederaDto } from './create-hedera.dto';

export class UpdateHederaDto extends PartialType(CreateHederaDto) {}
