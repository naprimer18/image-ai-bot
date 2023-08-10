import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logs } from 'src/typeorm/logs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs) private LogsRepository: Repository<Logs>,
  ) {}

  async getLogs(): Promise<Logs[]> {
    return await this.LogsRepository.find();
  }

  async addLogs(name: string, message: string) {
    const obj = { name: name, message: message };
    const newLogs = this.LogsRepository.create(obj);
    return await this.LogsRepository.save(newLogs);
  }
}
