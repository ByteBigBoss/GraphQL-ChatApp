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

            if (user) {
                userResponse.msg = "Already user registered.";
                userResponse.status = 409;
            }

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {

                userResponse.err = 'User already exists';
                userResponse.status = 500;
                return userResponse

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
            userResponse.status = 200;
            return userResponse;
        } catch (error) {
            userResponse.err = error;
            userResponse.msg = userResponse.err;
        }

        return userResponse
    }


    async updateUser(dto: UserUpdateDTO): Promise<UserResponse> {

        const userResponse: UserResponse = new UserResponse();


        try {


            const updatedUser = await this.prisma.user.update({
                data: dto,
                where: {
                    email: dto.email
                }
            });


            userResponse.msg = "User: " + updatedUser.email + " Updated Successfully";
            userResponse.status = 200;
            return userResponse;

        } catch (error) {
            userResponse.err = error;
            userResponse.msg = userResponse.err;
        }

        return userResponse

    }

    async getUser(email: string) {

        const user: UserEntity = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        });

        return user;

    }



    async getAllUsers() {

        const users: UserEntity[] = await this.prisma.user.findMany();

        return users;
    }

    async login(email: string, password: string) {

        const userResponse: UserResponse = new UserResponse();

        try {

            const user: UserEntity = await this.prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            if (!user) {
                userResponse.msg = "User not found!"
            } else if (user.password !== password) {
                userResponse.msg = "Wrong Password"
            } else {
                userResponse.user = user;
                userResponse.msg = "Success";
            }

            userResponse.status = 200;
            return userResponse;
        } catch (error) {
            userResponse.err = error;
            userResponse.status = 500;
            return userResponse;

        }

    }

}
