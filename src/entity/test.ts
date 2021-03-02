import { Arg, Field, ObjectType, Root } from "type-graphql";

@ObjectType()
export class Useer {

    @Field()
    id!:number

    @Field()
    name!: string
}


@ObjectType()
export class Test {

    @Field()
    id!: number

    @Field()
    text!: string

    @Field(() => [Useer])
    users!: [Useer]


}