import { Nullable } from 'src/config/config.service';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_login')
export class UserLoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  email?: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  userName?: Nullable<string>;

  @Column('varchar', {
    nullable: true,
  })
  employeeId?: Nullable<string>;

  @Column('varchar', {
    nullable: false,
  })
  password?: Nullable<string>;

  @Column('varchar', {
    nullable: false,
  })
  userType?: Nullable<string>;


  @Column('int', {
    nullable: true,
  })
  isActive?: Nullable<number>;

  @Column('varchar', {
    nullable: false,
  })
  createdOn?: Nullable<Date>;

  @Column('varchar', {
    nullable: false,
  })
  updatedOn?: Nullable<Date>;
}
