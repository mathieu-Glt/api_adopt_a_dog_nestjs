/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { TypeDogBreedEnum } from "../Enum/dog.enum";
import { HydratedDocument } from "mongoose";
export type DogDocument = HydratedDocument<Dog>;
export declare class Dog {
    name: string;
    is_adopted: boolean;
    breed: TypeDogBreedEnum;
}
export declare const DogSchema: import("mongoose").Schema<Dog, import("mongoose").Model<Dog, any, any, any, import("mongoose").Document<unknown, any, Dog> & Dog & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Dog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Dog>> & import("mongoose").FlatRecord<Dog> & {
    _id: import("mongoose").Types.ObjectId;
}>;
