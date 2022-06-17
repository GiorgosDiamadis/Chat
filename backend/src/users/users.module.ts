import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./class/user";
import {UsersController} from "./users.controller";
import {UsersService} from "./service/users.service";
import * as bcrypt from "bcrypt";
import {JwtStrategy} from "../auth/strategy/jwt.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JWT} from "../auth/constants";

@Module({
    imports: [MongooseModule.forFeatureAsync([{
        name: User.name,
        useFactory: async function () {
            const schema = UserSchema;
            schema.pre<User>('save', function (next) {
                const user = this;
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password + salt, 10);
                user.salt = salt;
                next();
            });
            return schema;
        }
    }]), PassportModule,
        JwtModule.register({
            secret: JWT.secret,
            signOptions: {expiresIn: '1h'}
        })],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService]
})

export class UsersModule {
}