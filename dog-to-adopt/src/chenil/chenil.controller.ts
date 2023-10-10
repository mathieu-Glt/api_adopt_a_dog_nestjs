import { Body, Controller, Get, Inject, Param, Patch, Post, Put, Req, ValidationPipe, forwardRef } from '@nestjs/common';
import { ChenilService } from './chenil.service';
import { CreateChenilDto } from './dto/chenil.dto';
import { ResponseErrorInterface, ResponseSuccessInterface } from './interface/response.interface';
import { DogService } from 'src/dog/dog.service';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { log } from 'console';

@Controller('chenils')
export class ChenilController {
    constructor(
    private readonly chenilService: ChenilService,
    @Inject(forwardRef(() => DogService))
    private readonly dogService: DogService,
    ){}


    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateChenilDto,
        @Req() req,
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        console.log("🚀 ~ file: chenil.controller.ts:18 ~ ChenilController ~ body:", body)
        try {
            const chenilCreate = await this.chenilService.create(body)

            return { status: 201, error: false, message: "Chenil has been created", results: chenilCreate }
        } catch (error) {
            return { status: 500, error: true, message: error };
        }
    }


    
  @Get('/percentDogAdopted/:chenilId')
  async findPercentDogAdoptedByChenil(
    @Param('chenilId') chenilId: string,
  ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {

    try {
        const allDoggosAdoptedByChenil =
        await this.chenilService.getAdoptionPercentageDogToChenil(chenilId);
          console.log("🚀 ~ file: chenil.controller.ts:69 ~ ChenilController ~ calculateAdoptedPercentage ~ allDoggos:", allDoggosAdoptedByChenil)
          const adoptedCount = await this.dogService.countAdoptedDogs(allDoggosAdoptedByChenil)
          console.log("🚀 ~ file: chenil.controller.ts:70 ~ ChenilController ~ calculateAdoptedPercentage ~ adoptedCount:", adoptedCount)
          return { status: 200, error: false, message: "Pourcentage of dogs adopted for the chenil ", results: adoptedCount + ' %' }

  
    } catch (error) {
        return { status: 500, error: true, message: error };

    }
    
    }

    @Get('/capacityChenil/:chenilId')
    async getAvailablePlaceCapacity(
        @Param('chenilId') chenilId: string,
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            const chenil = await this.chenilService.getAdoptionPercentageDogToChenil(chenilId)
            console.log("🚀 ~ file: chenil.controller.ts:40 ~ ChenilController ~ capacity:", chenil)
            const capacityChenil = await this.dogService.countDog(chenil)
            return { status: 200, error: false, message: "Capacity place dogs for the chenil ", results: capacityChenil + ' place(s)' }

        } catch (error) {
            return { status: 500, error: true, message: error };

        }
    }



    @Get('/least-a-dog')
    async getChenilWithAtLeastOneDog(): Promise<
    ResponseSuccessInterface | ResponseErrorInterface
  > {
        try {
            const chenils = await this.chenilService.findAllChenilContainAtLeastOneDog();
            console.log("🚀 ~ file: chenil.controller.ts:33 ~ ChenilController ~ chenils:", chenils)

            return { status: 200, error: false, message: "The request was successful", results: chenils };
        } catch (error) {
            console.log("🚀 ~ file: chenil.controller.ts:35 ~ ChenilController ~ error:", error)
            return { status: 500, error: true, message: error };
            
        }
    }

    @Get('/:id_chenil/:breed_of_dog')
    async findOne(@Param('id_chenil') chenilId: string, @Param('breed_of_dog') breed: string): Promise<ResponseSuccessInterface | ResponseErrorInterface> {

        try {
            const breedDogsInChenilId = await this.chenilService.findChenilWithBreedDog(chenilId, breed)
            console.log("🚀 ~ file: chenil.controller.ts:56 ~ ChenilController ~ findOne ~ breedDogsInChenilId:", breedDogsInChenilId)

            return { status: 200, error: false, message: 'The request was successful', results: breedDogsInChenilId }
        } catch (error) {
            return { status: 500, error: true, message: error };

            
        }
        
    }

    @Patch('/:id')
    async update(
        @Param('id') chenilId: string,
        @Body(new ValidationPipe()) body: object,
        @Req() req
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {

            const chenilIdExists = await this.chenilService.findChenilById(chenilId)
            // console.log("🚀 ~ file: chenil.controller.ts:74 ~ ChenilController ~ chenilIdExists:", chenilIdExists)
            if (chenilIdExists) {
                const chenil = await this.chenilService.updateChenil(chenilId, body)

                return { status: 201, error: false, message: "Chenil has been updated", results: chenil }

                
            } else {
                return { status: 404, error: true, message: "Chenil not found", results: [] };
            }
        } catch (error) {
            return { status: 500, error: true, message: error };

        }
    }

    @Put('/:id')
    async updateChenil(
        @Param('id') chenilId: string,
        @Body(new ValidationPipe()) body: CreateChenilDto,
        @Req() req
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            const chenilIdExists = await this.chenilService.findChenilById(chenilId)
            console.log("🚀 ~ file: chenil.controller.ts:98 ~ ChenilController ~ chenilIdExists:", chenilIdExists)

            if (chenilIdExists) {
                const chenil = await this.chenilService.updateChenil(chenilId, body)

                return { status: 201, error: false, message: "Chenil has been updated", results: chenil }

                
            } else {
                return { status: 404, error: true, message: "Chenil not found", results: [] };
            }


        } catch (error) {
            return { status: 500, error: true, message: error };

        }
    }

  @Post('/:chenilId/addDog/:dogId')
  async addDogToChenil(
    @Param('chenilId') chenilId: string,
    @Param('dogId') dogId: string,
    ): Promise<ResponseSuccessInterface | ResponseErrorInterface> {
        try {
            const chenils = await this.chenilService.getAllChenils();
      console.log(
        '🚀 ~ file: chenil.controller.ts:124 ~ ChenilController ~ chenils:',
        chenils,
      )

      
      const dogs = await this.dogService.findAllDogs();
      console.log(
        '🚀 ~ file: chenil.controller.ts:127 ~ ChenilController ~ dogs:',
        dogs,
      )


      const chenilExists = chenils.some(chenil => chenil._id.toString() === chenilId)
      const dogExists = dogs.some(dog => dog._id.toString() === dogId)

      console.log("🚀 ~ file: chenil.controller.ts:131 ~ ChenilController ~ chenilExists:", chenilExists)
      console.log("🚀 ~ file: chenil.controller.ts:146 ~ ChenilController ~ dogExists:", dogExists)

      if (!chenilExists) {
        return { status: 404, error: true, message: "Chenil does not exists", results: [] };
         
      } else if(!dogExists) {
        return { status: 404, error: true, message: "Dog does not exists", results: [] };

      } else {
        console.log('ok ok');

        const addDogToChenil = await this.chenilService.postDogToChenil(chenilId, dogId)
        return { status: 201, error: false, message: "Chenil has been updated", results: addDogToChenil }
    }


        } catch (error) {
            return { status: 500, error: true, message: error };
            
        }
    }

    



}
