import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';

@ObjectType()
@Entity()
export class Channel extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn()
    id!:number

    @Field()
    @Column()
    name!: string

    @Field()
    @Column("timestamp")
    startTime!: Date
}