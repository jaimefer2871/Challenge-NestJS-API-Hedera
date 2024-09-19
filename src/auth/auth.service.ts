import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async loginJWT(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByAlias(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.email, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
