import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { AuthResponseDTO } from './dto/AuthResponse.dto';
import {
  AuthSignInRequestDTO,
  AuthSignUpRequestDTO,
} from './dto/AuthRequest.dto';
import { LoggingService } from 'src/logging/logging.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private saltRounds = 10;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly loggingService: LoggingService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(request: AuthSignUpRequestDTO): Promise<AuthResponseDTO> {
    this.loggingService.log(
      `Attempting to register user with email: ${request.email}`,
    );
    const existingUser = await this.userModel.findOne({ email: request.email });
    if (existingUser) {
      this.loggingService.warn(
        `Registration failed: User with email ${request.email} already exists`,
      );
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(request.password, this.saltRounds);
    const user = new this.userModel({
      email: request.email,
      name: request.name,
      isActive: true,
      password: hashedPassword,
    });
    user.save();

    this.loggingService.log(
      `User with email ${request.email} registered successfully`,
    );
    const payload = { username: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      email: user.email,
      access_token: accessToken,
      username: user.name,
    };
  }

  async signIn(request: AuthSignInRequestDTO): Promise<AuthResponseDTO> {
    this.loggingService.log(
      `Attempting to sign in user with email: ${request.email}`,
    );
    const user = await this.userModel.findOne({ email: request.email });
    if (!user) {
      this.loggingService.warn(
        `Sign in failed: No user found with email  ${request.email}`,
      );
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.loggingService.warn(
        `Sign in failed: Invalid password for user ${request.email}`,
      );
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isActive) {
      this.loggingService.log(`This user is blocked or inactive`);
      throw new BadRequestException(`This user cannot be logged in`);
    }

    this.loggingService.log(
      `User with email ${request.email} signed in successfully`,
    );

    const payload = { username: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      email: user.email,
      access_token: accessToken,
      username: user.name,
    };
  }
}
