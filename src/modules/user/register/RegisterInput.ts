import { MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput {

    @Field()
    @MinLength(4, {
        message: "First name is too short!"
    })
    @MaxLength(255, {
        message: "too long"
    })
    firstName!: string

    @Field()
    @MinLength(4, {
        message: "Last name is too short!"
    })
    @MaxLength(255)
    lastName!: string

    @Field()
    @MaxLength(255)
    @IsEmailAlreadyExist({
        message: "Email already in use!"
    })
    email!: string

    @Field()
    @MaxLength(255)
    @MinLength(4, {
        message: "Password must be longer than 4 characters!"
    })
    password!:string
}