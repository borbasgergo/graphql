import "dotenv/config"

import "reflect-metadata"
import { LoginInput } from './login/LoginInput';
import { Arg, Field, Mutation, ObjectType } from "type-graphql"
import { User } from "../../entity/User"
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken!: string
}

export class LoginResolver {
    
    @Mutation(() => LoginResponse)
    async login(
        @Arg("data") { email, password }: LoginInput
    ): Promise<LoginResponse> {  

        const user = await User.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw new Error("User does not exist!")
        }

        const valid = await compare(password, user.password)

        if(!valid) {
            throw new Error("Invalid credentails!")
        }

        return {
            accessToken: sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" })
        }

    }
}