import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards, UsePipes} from "@nestjs/common";
import {CreateRoomDto} from "./dto/createRoom-dto";
import {JoiValidator} from "../pipes/joi.validator";
import {createRoomSchemaValidator} from "./dto/createRoom-schema.validator";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RoomService} from "./service/room.service";

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {
    }


    @Post('create')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidator(createRoomSchemaValidator))
    async createRoom(@Body() createRoomDto: CreateRoomDto, @Request() request) {

        const created = await this.roomService.create(createRoomDto, request.user.userId);

        if (created === null)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "A room with that name already exists!"
            }, HttpStatus.BAD_REQUEST);

        return created;
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    async myRooms(@Request() request) {
        const userId = request.user.userId;

        return await this.roomService.getRoomsWith(userId);
    }

    @Post('addUserToRoom')
    @UseGuards(JwtAuthGuard)
    async addUserToRoom(@Body() addToRoomDto:,@Request() request){

    }
}