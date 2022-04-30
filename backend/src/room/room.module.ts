import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Room, RoomSchema} from "./class/room";
import {RoomController} from "./room.controller";
import {RoomService} from "./service/room.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [AuthModule,MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}])],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService]
})

export class RoomModule {
}