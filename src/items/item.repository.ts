import { User } from './../entities/user.entity';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.itemsRepository.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user,
    });

    await this.itemsRepository.save(item);

    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemsRepository.findOneBy({ id: id });
  }

  async saveItem(item: Item): Promise<Item> {
    return await this.itemsRepository.save(item);
  }

  async deleteItem(id: string) {
    await this.itemsRepository.delete({ id });
  }
}
