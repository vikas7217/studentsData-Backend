import { Nullable } from 'src/config/config.service';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  userName: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  roll: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  type: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  gender: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  age: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  email: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  phoneNumber: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  firstName: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  lastName: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  streetAddress1: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  streetAddress2: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  city: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  state: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  stateCode: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  pinCode: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  zipCode: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  country: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  countryCode: Nullable<string>;

  @Column('int',{ default: true })
  isActive: Nullable<number>;
}
