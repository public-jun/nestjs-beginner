import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashPassword,
      status,
    });

    await this.userRepository.save(user);

    return user;
  }

  async findUser(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findUserByPayload(payload: {
    id: string;
    username: string;
  }): Promise<User> {
    const { id, username } = payload;
    return await this.userRepository.findOneBy({ id, username });
  }
}
