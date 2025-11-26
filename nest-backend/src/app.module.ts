import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonsModule } from './persons/persons.module';
import databaseConfig from './config/database.config';
import { Person } from './persons/entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev.local', '.env.dev'],
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get('database') as ReturnType<typeof databaseConfig>;
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.pass,
          database: db.name,
          entities: [Person],
          synchronize: config.get('ENVIRONMENT') == 'development',
          logging: config.get('ENVIRONMENT') !== 'production',
        };
      },
    }),
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
