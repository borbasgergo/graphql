import { verify } from "jsonwebtoken";
import { Ctx, MiddlewareFn } from "type-graphql";
import { Context } from "../../context/Context";
import { User } from "../../entity/User";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    
    const token = context.req.headers['authorization']?.split(" ")[1]

    if(!token){
        throw new Error("UNAUTHENTICATED!")
    }

    try {
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
       
        context.userId = (payload as any).userId

    } catch ( e ){
        throw new Error("INVALID_TOKEN")
    }


    return next();
};