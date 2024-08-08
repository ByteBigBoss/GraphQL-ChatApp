import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserRegisterDTO{

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string


}