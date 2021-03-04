import { Channel } from './../../entity/Channel';
import { isAuth } from './../middleware/isAuth';
import { Arg, Ctx, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from '../../context/Context';
import { getManager } from 'typeorm';

@Resolver()
export class UserResolver {

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async getUser(
        @Ctx() ctx: Context
    ) {
        const user = await User.findOne({where: { id: ctx.userId }})

        if(! user){
            throw new Error("NO_USER")
        }

        return true
    }

    @Query(() => [Channel])
    @UseMiddleware(isAuth)
    async getChannels(
        @Ctx() ctx: Context
    ): Promise<Channel[] | null> {

        const user = await User.findOne({
            where: {
                id: ctx.userId,
            },
            relations: ["channels"]
        })
        
        console.log(user!)

        if(!user){
            return null
        }

        return user.channels
    }

}