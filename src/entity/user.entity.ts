import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  roll: string;

  @Column()
  type: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  @Column()
  age: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column('varchar', {
    nullable: true,
  })
  firstName: string;

  @Column('varchar', {
    nullable: true,
  })
  lastName: string;

  @Column('varchar', {
    nullable: true,
  })
  streetAddress1: string;

  @Column('varchar', {
    nullable: true,
  })
  streetAddress2: string;

  @Column('varchar', {
    nullable: true,
  })
  city: string;

  @Column('varchar', {
    nullable: true,
  })
  state: string;

  @Column('varchar', {
    nullable: true,
  })
  stateCode: string;

  @Column('varchar', {
    nullable: true,
  })
  pinCode: string;

  @Column('varchar', {
    nullable: true,
  })
  zipCode: string;

  @Column('varchar', {
    nullable: true,
  })
  country: string;

  @Column('varchar', {
    nullable: true,
  })
  countryCode: string;

  @Column({ default: true })
  isSuccess: boolean;
}
