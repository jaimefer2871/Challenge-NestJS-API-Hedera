import { Controller, Get, Post, Body, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { CreateHederaDto } from './dto/create-hedera.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('hedera')
export class HederaController {
  constructor(private readonly hederaService: HederaService) { }

  @UseGuards(AuthGuard)
  @Post('/create-token-hedera')
  async create(@Body() createHederaDto: CreateHederaDto, @Req() request: Request, @Res() response: Response) {
    let jsonResponse = {
      'error': false,
      'code': HttpStatus.CREATED,
      'message': 'OK',
      'data': {}
    };

    try {
      let tokenResponse = await this.hederaService.create(createHederaDto);

      if (tokenResponse.token !== null) {
        jsonResponse['data'] = {
          "token": tokenResponse.token
        };
      } else {
        throw (tokenResponse);
      }

    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message') ? error.message : 'Ha ocurrido un error interno';
      jsonResponse['data'] = error.data;
    }


    return response.status(jsonResponse.code).json(jsonResponse);
  }

  @UseGuards(AuthGuard)
  @Get('/list-tokens')
  async listTokens(@Req() request: Request, @Res() response: Response) {
    let jsonResponse = {
      'error': false,
      'code': HttpStatus.CREATED,
      'message': 'OK',
      'data': {}
    };

    try {
      let res = await this.hederaService.getTokensByAccount();
      jsonResponse['data'] = res;
    } catch (error) {
      jsonResponse['error'] = true;
      jsonResponse['code'] = HttpStatus.INTERNAL_SERVER_ERROR;
      jsonResponse['message'] = error.hasOwnProperty('message') ? error.message : 'Ha ocurrido un error interno';
      jsonResponse['data'] = error.data;
    }


    return response.status(jsonResponse.code).json(jsonResponse);
  }


}
