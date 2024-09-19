import { IsString } from 'class-validator';

export class CreateUserDto {
    id?: number
    @IsString()
    email: string
    @IsString()
    name: string
    @IsString()
    password: string
    createdAt?: string
    updatedAt?: string
}