import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {CreateRoomDto} from "../dto/createRoom-dto";
import {Room, RoomDocument} from "../class/room";

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: mongoose.Model<RoomDocument>) {
    }


    async findOne(name: string): Promise<Room> {
        return this.roomModel.findOne({name: name}).exec();
    }

    async create(data: CreateRoomDto, _id: string): Promise<any> {
        let room: any = await this.roomModel.findOne({name: data.name});
        if (room !== null) {
            return null;
        }

        room = new this.roomModel({
            name: data.name,
            dateCreated: Date.now().toString(),
            adminUser: new mongoose.Types.ObjectId(_id)
        });
        await room.save()
        return room
    }

    async getRoomsWith(userId: mongoose.Types.ObjectId): Promise<Room[]> {
        const rooms = await this.roomModel.find({$or: [{adminUser: userId}, {participants: userId}]}).exec();
        return rooms;
    }
}