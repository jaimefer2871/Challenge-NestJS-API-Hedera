import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private dbc: PrismaService) { }

  async create(createUser: CreateUserDto) {
    return await this.dbc.user.create({ data: createUser })
  }

  async findAll() {
    return await this.dbc.user.findMany();
  }

  async findByAlias(alias: string) {
    return await this.dbc.user.findUnique({
      where: {
        email: alias,
      },
    });
  }
}
