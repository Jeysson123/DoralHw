import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request: string;

  @Column()
  response: string;

  constructor(request: string, response: string) {
    this.request = request;
    this.response = response;
  }
}
