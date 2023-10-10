import { ChenilService } from './chenil.service';
import { CreateChenilDto } from './dto/chenil.dto';
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface';
import { DogService } from 'src/dog/dog.service';
export declare class ChenilController {
    private readonly chenilService;
    private readonly dogService;
    constructor(chenilService: ChenilService, dogService: DogService);
    create(body: CreateChenilDto, req: any): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    findPercentDogAdoptedByChenil(chenilId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    getAvailablePlaceCapacity(chenilId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    getChenilWithAtLeastOneDog(): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    findOne(chenilId: string, breed: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    update(chenilId: string, body: object, req: any): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    updateChenil(chenilId: string, body: CreateChenilDto, req: any): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    addDogToChenil(chenilId: string, dogId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
}
