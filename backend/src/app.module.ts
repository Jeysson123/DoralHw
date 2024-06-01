import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikimediaController } from './controllers/wikimedia.controller';
import { HttpModule } from '@nestjs/axios';
import { LogService } from './services/LogService';
import { Log } from './dao/Log';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Wikimedia',
      entities: [Log],
      synchronize: false,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([Log]),
  ],
  controllers: [AppController, WikimediaController],
  providers: [AppService, LogService],
})
export class AppModule {}
