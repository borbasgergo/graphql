import { isAuth } from './../middleware/isAuth';
import { Arg, Ctx, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from '../../context/Context';
import { Channel } from '../../entity/Channel';
import { getManager } from 'typeorm';

@Resolver()
export class UserResolver {

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async getChannels(
        @Ctx() ctx: Context
    ): Promise<User | null> {

        const user = await User.findOne({
            where: {
                id: ctx.userId,
            },
            relations: ["channels"]
        })
        
        if(!user){
            return null
        }

        return user
    }

}