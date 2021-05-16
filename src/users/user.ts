import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
  @PrimaryGeneratedColumn('increment',{name:'userid'})
  userId: number;

  @Column({name:'firstname'})
  firstName: string;

  @Column({name:'lastname'})
  lastName: string;

  @Column({name:'email'})
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true,name:'refreshtoken' })
  refreshToken: string;

  @Column({ type: 'date', nullable: true, name:'refreshtokenexp' })
  refreshTokenExp: string;
}
