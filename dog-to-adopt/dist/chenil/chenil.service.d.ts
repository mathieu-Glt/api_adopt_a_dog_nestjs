import { ChenilDocument } from './schema/chenils.chema';
import { CreateChenilDto } from './dto/chenil.dto';
import { Model } from 'mongoose';
export declare class ChenilService {
    private chenilModel;
    constructor(chenilModel: Model<ChenilDocument>);
    create(data: CreateChenilDto): Promise<ChenilDocument>;
    findAllChenilContainAtLeastOneDog(): Promise<any>;
    findChenilById(id: string): Promise<ChenilDocument>;
    findDogsAdoptedOfOneChenil(chenilId: string): Promise<object>;
    findDogsNotAdoptedOfOneChenil(chenilId: string): Promise<object>;
    findChenilWithBreedDog(chenilId: string, breed: string): Promise<any[]>;
    updateChenil(id: string, data: object): Promise<object>;
    getAllChenils(): Promise<ChenilDocument[]>;
    postDogToChenil(chenilId: string, dogId: string): Promise<any>;
    findAllDoggos(): Promise<object>;
    getAdoptionPercentageDogToChenil(chenilId: string): Promise<ChenilDocument>;
}
