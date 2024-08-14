import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "../entities/user.entity";

@ObjectType()
export class UserResponse{

    @Field()
    msg: string = "none"

    @Field()
    err: string = "none"

    @Field({nullable:true})
    user: UserEntity

    @Field(() => Int)
    status: number

}