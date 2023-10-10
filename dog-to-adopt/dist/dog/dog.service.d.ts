import { DogDocument } from './schema/dogs.shema';
import { Model, Types } from 'mongoose';
import { CreateDogDto } from './dto/dogs.dto';
import { AdoptValueDto } from './dto/isAdoptedDto';
export declare class DogService {
    private dogModel;
    constructor(dogModel: Model<DogDocument>);
    createDog(data: CreateDogDto): Promise<DogDocument>;
    findDogsByBreed(breed: string): Promise<DogDocument[]>;
    findDogById(id: string): Promise<DogDocument>;
    findAllDogs(): Promise<DogDocument[]>;
    findAllBreed(): Promise<string[]>;
    getBreedsOfDog(): {
        id: string;
    }[];
    getBreedsOfDogBisOne(): {
        breed: string;
    }[];
    getBreedsOfDogBis(): {
        id: string;
        breed: string;
    }[];
    findAllBreedBis(): {
        breed: string;
    }[];
    findAllIdsDogs(): Promise<{
        _id: Types.ObjectId;
    }[]>;
    updateDogAdoptStatus(dogId: string, data: AdoptValueDto): Promise<string | object>;
    countAdoptedDogs(dogIds: any): Promise<number>;
    countDog(dogIds: any): Promise<number>;
}
