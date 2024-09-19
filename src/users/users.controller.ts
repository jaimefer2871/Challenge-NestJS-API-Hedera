import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/register')
  async create(@Body() data: CreateUserDto, @Req() request: Request, @Res() response: Response) {
    let jsonResponse = {
      'error': false,
      'code': HttpStatus.CREATED,
      'message': 'OK',
      'data': {}
    };

    try {
      const result = await this.usersService.create(data);

      if (result !== null) {
        jsonResponse['data'] = result;
      }

    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message') ? error.message : 'Ha ocurrido un error interno';
      jsonResponse['data'] = {};

    }

    return response.status(jsonResponse.code).json(jsonResponse)
  }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response) {
    let jsonResponse = {
      'error': false,
      'code': HttpStatus.OK,
      'message': 'OK',
      'data': []
    };

    try {
      const result = await this.usersService.findAll();

      if (result !== null && result.length !== 0) {
        jsonResponse['data'] = result;
      }

    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message') ? error.message : 'Ha ocurrido un error interno';
      jsonResponse['data'] = [];

    }

    return response.status(jsonResponse.code).json(jsonResponse)
  }

  @Post('/login')
  async login(@Body() data: LoginUserDto, @Req() request: Request, @Res() response: Response) {
    return response.status(200).json({'dataResponse' : data})
  }
}
