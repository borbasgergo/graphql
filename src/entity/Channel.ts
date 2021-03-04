import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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