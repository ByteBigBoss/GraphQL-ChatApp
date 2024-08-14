import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse } from './dto/userResponse';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { UserEntity } from './entities/user.entity';
import { UserUpdateDTO } from './dto/userUpdate.dto';

@Resolver()
export class UserResolver {

    constructor(private readonly userService: UserService) { }

    @Mutation(() => UserResponse)
    async addUser(@Args("userRegisterDTO") userRegisterDTO: UserRegisterDTO): Promise<UserResponse> {

        console.log(userRegisterDTO);
        return this.userService.addUser(userRegisterDTO);
    }

    @Mutation(() => UserResponse)
    async updateUser(@Args("updateUserDTO") updateUserDTO: UserUpdateDTO): Promise<UserResponse> {
        return this.userService.updateUser(updateUserDTO);
    }


    @Query(() => UserEntity, { name: 'user' })
    async getUser(@Args("email") email: string) {
        return this.userService.getUser(email);
    }

    @Query(() => [UserEntity], { name: 'allUsers' })
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

}
