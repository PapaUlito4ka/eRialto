import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './users/entities/user.entity';
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  database: configService.get('POSTGRES_DB'),
  entities: [User],
  migrations: ['src/migrations/*{.ts,.js}']
});