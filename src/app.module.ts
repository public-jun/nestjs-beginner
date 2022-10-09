import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AppDataSource } from './app.datasource';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ItemsModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
