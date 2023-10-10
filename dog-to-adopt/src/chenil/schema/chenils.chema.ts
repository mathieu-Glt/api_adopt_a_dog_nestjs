import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ChenilDocument = HydratedDocument<Chenil>;
@Schema({ collection: 'chenils', timestamps: true})
export class Chenil {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  capacity: number;

  @Prop([{ type: Types.ObjectId, ref: 'Dog'}])
  doggos: Types.ObjectId[]
}

export const ChenilSchema = SchemaFactory.createForClass(Chenil)