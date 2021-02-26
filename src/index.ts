import "reflect-metadata"

import { ApolloServer } from "apollo-server-express"
import Express from "express"

import { buildSchema, Query, Resolver } from "type-graphql"

@Resolver()
class HelloResolver {

    @Query(() => String)
    hello() {
        return "Hello"
    }
}

const main = async () => {

    const schema = await buildSchema({
        resolvers: [HelloResolver]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(9000, () => {
        console.log("running")
    })


}

main()