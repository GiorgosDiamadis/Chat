import {Injectable} from "@nestjs/common";
import {UsersService} from "../../users/service/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "../../users/dto/login-dto";
import * as bcrypt from "bcrypt";
import {RegisterDto} from "../../users/dto/register-dto";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }


    async validateUser(loginData: LoginDto) {
        const user = await this.userService.findOne(loginData.username);

        if (user === null)
            return null;


        const salt = user.salt;
        const isMatch = await bcrypt.compare(loginData.password + salt, user.password);
        if (!isMatch)
            return null;


        return this.login(user);

    }


    decode(token: string) {
        return this.jwtService.decode(token);
    }

    async login(user: any) {
        const payload = {username: user.username, _id: user._id}
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: RegisterDto): Promise<any> {
        const user = await this.userService.create(data);
        if (user === null)
            return null;
        return this.login(user);
    }
}