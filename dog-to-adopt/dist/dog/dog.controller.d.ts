import { DogService } from './dog.service';
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface';
import { CreateDogDto } from './dto/dogs.dto';
import { AdoptValueDto } from './dto/isAdoptedDto';
import { ChenilService } from 'src/chenil/chenil.service';
export declare class DogController {
    private readonly dogService;
    private readonly chenilService;
    constructor(dogService: DogService, chenilService: ChenilService);
    create(body: CreateDogDto, req: any): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    getDogsByBreed(breed: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    findAllBreedsDog(): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    findDogsNotAdopted(chenilId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    findDogsAdopted(chenilId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
    updateAdoptedDog(id: string, body: AdoptValueDto, req: any): Promise<ResponseSuccessInterface | ResponseErrorInterface>;
}
