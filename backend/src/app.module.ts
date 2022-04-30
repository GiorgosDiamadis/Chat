import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {RoomModule} from "./room/room.module";

@Module({
    imports: [AuthModule, RoomModule, UsersModule, MongooseModule.forRoot("mongodb://root:root@database:27017/book-rental?authSource=admin")],
    controllers: [AppController],
    providers: [AppService],

})
export class AppModule {
}
