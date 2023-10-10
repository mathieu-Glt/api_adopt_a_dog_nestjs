import { Body, Controller, Get, Inject, Param, Post, Put, Req, ValidationPipe, forwardRef } from '@nestjs/common';
import { DogService } from './dog.service';
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface';
import { CreateDogDto } from './dto/dogs.dto';
import { AdoptValueDto } from './dto/isAdoptedDto';
import { ChenilService } from 'src/chenil/chenil.service';
import { Chenil } from 'src/chenil/schema/chenils.chema';


@Controller('dogs')
export class DogController {
    constructor(
        private readonly dogService: DogService,
        @Inject(forwardRef(() => ChenilService))
        private readonly chenilService: ChenilService
    ){}

    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateDogDto,
        @Req() req
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        console.log("🚀 ~ file: dog.controller.ts:16 ~ DogController ~ body:", body)

        try {
      const dogCreate = await this.dogService.createDog(body);

            return { status: 201, error: false, message: 'Dog has been created', results: dogCreate }

        } catch (error) {
            
            return { status: 500, error: true, message: error };
        }
    }

    @Get('/by-breed/:breed')
    async getDogsByBreed(@Param('breed') breed: string): Promise <ResponseSuccessInterface | ResponseErrorInterface> {
        try {
        const dogsByBreed = await this.dogService.findDogsByBreed(breed);
        return { status: 200, error: false, message: 'The request was succesfull', results: dogsByBreed }

        
    } catch (error) {
        return { status: 500, error: true, message: error };

    }
    }


    @Get('/breeds')
    async findAllBreedsDog(): Promise<ResponseSuccessInterface | ResponseErrorInterface> {

        try {
            // const breedsOfDog = await this.dogService.findAllBreed();
            const breedsOfDog =  this.dogService.findAllBreedBis();
            console.log("🚀 ~ file: dog.controller.ts:35 ~ DogController ~ findAllBreedsDog ~ breedsOfDog:", breedsOfDog)
            
            return { status: 200, error: false, message: 'The request was succesfully', results: breedsOfDog }


        } catch (error) {
            return { status: 500, error: true, message: error };
            
        }
    }

    @Get('/:id_chenil/dog_not_adopted')
    async findDogsNotAdopted(
        @Param('id_chenil') chenilId: string
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            const dogIsNotAdopted = await this.chenilService.findDogsNotAdoptedOfOneChenil(chenilId)
            console.log("🚀 ~ file: dog.controller.ts:58 ~ DogController ~ dogIsNotAdopted:", dogIsNotAdopted)

            return { status: 200, error: false, message: 'The request was succesfully', results: dogIsNotAdopted }

        } catch (error) {
            return { status: 500, error: true, message: error };

        }
    }

    @Get('/:id_chenil/dog_adopted')
    async findDogsAdopted(@Param('id_chenil') chenilId: string): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            const dogIsAdopted = await this.chenilService.findDogsAdoptedOfOneChenil(chenilId)
            console.log("🚀 ~ file: dog.controller.ts:75 ~ DogController ~ dogIsAdopted:", dogIsAdopted)

            return { status: 200, error: false, message: 'The request was succesfully', results: dogIsAdopted }

        } catch (error) {
            return { status: 500, error: true, message: error };
            
        }
    }




    @Put('/:id')
    async updateAdoptedDog(
        @Param('id') id: string,
        @Body(new ValidationPipe()) body: AdoptValueDto,
        @Req() req
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            console.log("🚀 ~ file: dog.controller.ts:56 ~ DogController ~ body:", body.is_adopted)

            const dogExists = await this.dogService.findDogById(id)
            console.log("🚀 ~ file: chenil.controller.ts:98 ~ ChenilController ~ chenilIdExists:", dogExists.is_adopted)

            if (dogExists.is_adopted === Boolean(body.is_adopted)) {
                
                return { status: 400, error: true, message: "Bad request" }
            
            } else {
                const updateIsAdoptDogValue = await this.dogService.updateDogAdoptStatus(id, body)
                console.log("🚀 ~ file: dog.controller.ts:61 ~ DogController ~ updateIsAdoptDogValue:", updateIsAdoptDogValue)
                
                return { status: 201, error: false, message: 'The value is_adopted has been updated', results: updateIsAdoptDogValue }
            }

        } catch (error) {
            return { status: 500, error: true, message: error };
        }
    }

}
