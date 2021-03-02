import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import bcrypt from "bcryptjs"
import { Channel } from "./Channel";


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    firstName!: string

    @Field()
    @Column()
    lastName!: string

    @Field()
    @Column()
    email!: string

    @Column()
    password!: string

    @Field(() => [Channel])
    @ManyToMany(type => Channel)
    @JoinTable()
    channels!: Channel[];

    @BeforeInsert()
    async hashPassword() {
        try {
            this.password = await bcrypt.hash(this.password, 10)
        } catch( e ) {
            console.log(e)
        }
    }
}