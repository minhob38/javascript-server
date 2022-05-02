import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
