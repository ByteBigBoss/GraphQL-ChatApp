import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from './dto/userResponse';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserEntity } from './entities/user.entity';
import { UserUpdateDTO } from './dto/userUpdate.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async addUser(dto: UserRegisterDTO): Promise<UserResponse> {

        const userResponse: UserResponse = new UserResponse();
    
        try {

            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (user) userResponse.msg = "Already user registered.";

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    userResponse.err = 'User already exists';

                    return userResponse
                }
                userResponse.msg = userResponse.err;
            }
        }

        try {

            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    password: dto.password
                }
            })

            userResponse.msg = newUser.email

            return userResponse;
        } catch (error) {
            userResponse.err = error;
            userResponse.msg = userResponse.err;
        }

        return userResponse
    }


    async updateUser(dto: UserUpdateDTO): Promise<UserResponse>{

        const userResponse: UserResponse = new UserResponse();


        try {


            const updatedUser = await this.prisma.user.update({
                data:dto,
                where:{
                    email: dto.email
                }
            });


            userResponse.msg = "User: "+updatedUser.email+" Updated Successfully";

            return userResponse;

        } catch (error) {
            userResponse.err = error;
            userResponse.msg = userResponse.err;
        }

        return userResponse

    }

    async getUser(email:string){

        const user:UserEntity =  await this.prisma.user.findFirst({
            where:{
                email: email
            }
        });

        return user;

    }



    async getAllUsers(){

        const users:UserEntity[] = await this.prisma.user.findMany();

        return users;
    }

}
