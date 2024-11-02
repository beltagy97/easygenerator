import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDTO } from './dto/AuthResponse.dto';
import { SignInDto, SignUpDto } from './dto/HTTPRequest/request.dto';
import { AuthResponseType } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Body() signUpDto: SignUpDto): Promise<AuthResponseType> {
    try {
      const response: AuthResponseDTO = await this.userService.signUp({
        email: signUpDto.email,
        name: signUpDto.name,
        password: signUpDto.password,
      });
      return {
        message: 'User registered successfully',
        access_token: response.access_token,
        user: {
          email: response.email,
          username: response.username,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponseType> {
    try {
      const response: AuthResponseDTO = await this.userService.signIn({
        email: signInDto.email,
        password: signInDto.password,
      });
      return {
        message: 'User signed in successfully',
        access_token: response.access_token,
        user: {
          email: response.email,
          username: response.username,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
