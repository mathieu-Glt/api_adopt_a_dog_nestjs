import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TypeDogBreedEnum } from "../Enum/dog.enum";
import { HydratedDocument } from "mongoose";

export type DogDocument = HydratedDocument<Dog>;
@Schema({ collection: 'dogs', timestamps: true})
export class Dog {
    @Prop({
        required: true
    })
    name: string;

    @Prop({ default: false})
    is_adopted: boolean;

    @Prop({ type: String, enum: TypeDogBreedEnum })
    breed: TypeDogBreedEnum;


}

export const DogSchema = SchemaFactory.createForClass(Dog)