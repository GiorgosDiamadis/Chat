import {Controller, Get, Request} from "@nestjs/common";
import {UsersService} from "./service/users.service";

@Controller("user")
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @Get('validate/')
    async validateToken(@Request() request): Promise<any> {

        const token = request.headers.authorization.split(' ')[1];
        return await this.userService.validateToken(token);
        // return this.userService.validateToken(token) !== null;
    }

}