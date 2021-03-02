import { RegisterInput } from './register/RegisterInput';
import { User } from '../../entity/User';
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(User)
export class RegisterResolver {

    /* testing */
    @Query(() => String)
    hello () {
        return "okay"
    }

    @Mutation(() => Boolean, { nullable: true })
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ){  
        try {

            const user = await User.create({
                firstName, 
                lastName,
                email,
                password
            }).save()
            
        } catch(err) {
            console.log(err)
            return false
        }
        console.log("ok")
        return true
    }

}