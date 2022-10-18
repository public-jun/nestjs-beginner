import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto;
    const user = await this.userRepository.findUser(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException(
      'ユーザ名またはパスワードを確認してください。',
    );
  }
}
