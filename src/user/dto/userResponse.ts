import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserResponse{

    @Field()
    msg: string = "none"

    @Field()
    err: string = "none"

}