import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'item' })
export class User {
    @PrimaryGeneratedColumn('uuid') id : string;

    @CreateDateColumn() created: Date;

    @Column('text') username : string;
}