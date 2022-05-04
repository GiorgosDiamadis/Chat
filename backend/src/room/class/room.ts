import * as mongoose from "mongoose";
import {Prop, raw, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../users/class/user";

export type RoomDocument = Room & Document;

@Schema()
export class Room {

    @Prop(
        raw({
            type: String,
            unique: true
        })
    )

    name: string;

    @Prop(raw({
        type: String,
        unique: true,
    }))
    dateCreated: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', path: 'user'})
    adminUser: User

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'User', path: 'user'}])
    participants: User[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);