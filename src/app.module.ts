import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AppDataSource } from './app.datasource';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
