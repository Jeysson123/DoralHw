import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../dao/Log';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async insertLog(request: string, response: string): Promise<void> {
    const log = new Log(request, response);
    await this.logRepository.save(log);
  }
}
