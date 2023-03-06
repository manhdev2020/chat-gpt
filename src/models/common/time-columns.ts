// import { Exclude } from 'class-transformer';
// import {
//   CreateDateColumn,
//   UpdateDateColumn,
//   DeleteDateColumn,
//   BaseEntity,
//   Column,
// } from 'typeorm';

// export abstract class TimeColumns extends BaseEntity {
//   @Column({ nullable: true })
//   public readonly createdById!: number;

//   @Column({ nullable: true })
//   public readonly updatedById!: number;

//   @Column({ nullable: true })
//   @Exclude()
//   public readonly deletedById!: number;

//   @CreateDateColumn()
//   public readonly createdAt!: Date;

//   @UpdateDateColumn()
//   public readonly updatedAt!: Date;

//   @DeleteDateColumn()
//   @Exclude()
//   public readonly deletedAt!: Date;
// }
