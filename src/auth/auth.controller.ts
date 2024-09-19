import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() data: LoginUserDto, @Req() request: Request, @Res() response: Response) {
    let jsonResponse = {
      'error': false,
      'code': HttpStatus.OK,
      'message': 'OK',
      'data': {}
    };

    try {

      const authResponse = await this.authService.loginJWT(data.email, data.password)

      jsonResponse['data'] = authResponse
    } catch (error) {
      console.log('ERROR',error.response);
      jsonResponse['error'] = true;
      jsonResponse['code'] = error.response.statusCode;
      jsonResponse['message'] = error.response.hasOwnProperty('message') ? error.response.message : 'Ha ocurrido un error interno';
      jsonResponse['data'] = {};

    }

    return response.status(jsonResponse.code).json(jsonResponse)
  }
}
