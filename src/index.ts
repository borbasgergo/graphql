import "reflect-metadata"

import { LoginResolver } from './modules/user/Login';
import { RegisterResolver } from "./modules/user/Register"
import { UserResolver } from './modules/user/UserResolver';
import { ApolloServer } from "apollo-server-express"
import Express from "express"

import { ArgumentValidationError, buildSchema } from "type-graphql"
import { createConnection } from "typeorm"

import { validate } from "class-validator"
import { formatError } from "./modules/helpers/FormatError";
import { validator } from "./modules/helpers/validate";

const main = async () => {

    const app = Express()

    await createConnection()

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, UserResolver],
        validate: validator
    })

    const apolloServer = new ApolloServer({ 
        schema,
        context: ({ req, res }) => ({ req, res }),
        formatError: formatError
    })

    apolloServer.applyMiddleware({ app })

    app.listen(9000, () => {
        console.log("running")
    })


}

main()