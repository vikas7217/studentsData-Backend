import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class UserLogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  employeeId: number;

  @Column('varchar', {
    nullable: true,
  })
  workingDate: string;

  @Column('varchar', {
    nullable: true,
  })
  taskOrTicket: string;

  @Column('varchar', {
    nullable: true,
  })
  projectManager: string;

  @Column('varchar', {
    nullable: true,
  })
  workingHour: number;

  @Column('varchar', {
    nullable: true,
  })
  employeeName: string;

  @Column('varchar', {
    nullable: true,
  })
  subject: string;

  @Column('varchar', {
    nullable: true,
  })
  taskStatus: string;

  @Column('varchar', {
    nullable: true,
  })
  fileName: string;

  @Column('varchar', {
    nullable: true,
  })
  uploadedTime: Date;

  @Column('varchar', {
    nullable: true,
  })
  uploadedBy: string;
}
