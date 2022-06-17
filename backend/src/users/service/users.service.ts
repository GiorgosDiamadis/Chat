import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../class/user";
import {Model} from "mongoose";
import {RegisterDto} from "../dto/register-dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {
    }

    async validateToken(token: string): Promise<object> {
        try {
            return await this.jwtService.verify(token);
        } catch (exc) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Invalid Token!"
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findById(id).exec();

    }

    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({username: username}).exec();
    }

    async create(data: RegisterDto): Promise<any> {
        const user = await this.userModel.findOne({$or: [{username: data.username}, {email: data.email}]});
        if (user !== null) {
            return null;
        }
        const newUser = new this.userModel({username: data.username, password: data.password, email: data.email})
        await newUser.save();
        return {...newUser, _id: newUser._id};
    }
}