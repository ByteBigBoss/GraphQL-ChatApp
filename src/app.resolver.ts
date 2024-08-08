import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"

@Resolver()
export class AppResolver {

    @Query(() => String)
    hello() {
        return 'Hello Nethmina!'
    }
}