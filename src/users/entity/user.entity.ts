import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterRemove,AfterUpdate } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert(){
    console.log('Insert User with id', this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log('update User with id', this.id)

  }

  @AfterRemove()
  logRemove(){
    console.log('remove User with id', this.id)

  }
}
