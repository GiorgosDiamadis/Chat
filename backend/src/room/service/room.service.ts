import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {CreateRoomDto} from "../dto/createRoom-dto";
import {Room, RoomDocument} from "../class/room";
import {AddToRoomDto} from "../dto/addToRoom-dto";
import {UsersService} from "../../users/service/users.service";

@Injectable()
export class RoomService {
    constructor(private readonly userService: UsersService, @InjectModel(Room.name) private roomModel: mongoose.Model<RoomDocument>) {
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
        return await this.roomModel.find({$or: [{adminUser: userId}, {participants: userId}]}).exec();
    }

    async addUserToRoom(addToRoom: AddToRoomDto, username: string): Promise<boolean> {

        const room = await this.roomModel.findById(addToRoom.roomId).populate(['adminUser', 'participants']).exec();

        if (room.adminUser.username !== username)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: "You are not allowed to make changes to this room!"
            }, HttpStatus.FORBIDDEN);


        const user = await this.userService.findById(addToRoom.userId)
        const exists = room.participants.find((participant) => participant.username === user.username) !== null


        if (!exists) {
            await room.update({$push: {participants: user}})
            return true;
        }

        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: "User is already in this room!"
        }, HttpStatus.BAD_REQUEST);
    }
}