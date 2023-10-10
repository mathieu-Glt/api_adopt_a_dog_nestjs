import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chenil, ChenilDocument } from './schema/chenils.chema';
import { CreateChenilDto } from './dto/chenil.dto';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { DogDocument } from 'src/dog/schema/dogs.shema';

@Injectable()
export class ChenilService {
    constructor(
        @InjectModel(Chenil.name)
        private chenilModel: Model<ChenilDocument>
    ){}

    async create(data: CreateChenilDto): Promise<ChenilDocument> {
        console.log("🚀 ~ file: chenil.service.ts:14 ~ ChenilService ~ create ~ data:", data)
        
        const chenil = await this.chenilModel.create(data);

        return chenil;
    }

    async findAllChenilContainAtLeastOneDog(): Promise<any> {

    const chenils = await this.chenilModel.find({ doggos: { $exists: true, $ne: [] } });
    
    console.log("🚀 ~ file: chenil.service.ts:25 ~ ChenilService ~ findAllChenilContentAtLeastOneDog ~ chenils:", chenils)
    
    return chenils;
    }

    async findChenilById(id:string): Promise<ChenilDocument> {
        const chenil = await this.chenilModel.findById(id)
        // console.log("🚀 ~ file: chenil.service.ts:33 ~ ChenilService ~ findChenilById ~ chenil:", chenil)
        return chenil;
    }


    async  findDogsAdoptedOfOneChenil(chenilId: string): Promise<object> {
        
        try {
            const dogsAdopted = await this.chenilModel.aggregate([
                {
                    $match: { _id: new Types.ObjectId(chenilId)}
                },
                {
                    $addFields: {
                        doggosObjectId: {
                            $map: {
                                input: "$doggos",
                                as: "doggo",
                                in: { $toObjectId: "$$doggo" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'dogs',
                        localField: 'doggosObjectId',
                        foreignField: '_id',
                        as: 'dogs'
                    }
                },
                {
                    $unwind: '$dogs'
                },
                {
                    $match: { 'dogs.is_adopted': true }
                }

            ])
            return dogsAdopted;
        
        } catch (error) {
            return error;
        }
        
    }


    async findDogsNotAdoptedOfOneChenil(chenilId: string): Promise<object> {
        
        try {
          
            const dogsNotAdopted = await this.chenilModel.aggregate([
                {
                    $match: { _id: new Types.ObjectId(chenilId)}
                },
                {
                    $addFields: {
                        doggosObjectId: {
                            $map: {
                                input: "$doggos",
                                as: "doggo",
                                in: { $toObjectId: "$$doggo" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'dogs',
                        localField: 'doggosObjectId',
                        foreignField: '_id',
                        as: 'dogs'
                    }
                },
                {
                    $unwind: '$dogs'
                },
                {
                    $match: { 'dogs.is_adopted': false }
                }
            ]) 
            // console.log("🚀 ~ file: chenil.service.ts:68 ~ ChenilService ~ findDogsNotAdoptedOfOneChenil ~ dogsNotAdopted:", dogsNotAdopted);
            return dogsNotAdopted;
        
        } catch (error) {
          return error;
        }
        
    }
    
    

    async findChenilWithBreedDog(chenilId: string, breed: string) {

        const breedDogsInChenilId = await this.chenilModel.aggregate([
            { $match: { _id: new Types.ObjectId(chenilId) } },
            {
                $addFields: {
                    doggosObjectId: {
                        $map: {
                            input: "$doggos",
                            as: "doggo",
                            in: { $toObjectId: "$$doggo" }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'dogs',
                    localField: 'doggosObjectId',
                    foreignField: '_id',
                    as: 'dogs'
                }
            },
            {
                $unwind: '$dogs'
            },
            {
                $match: { 'dogs.breed': breed }
            }
        ])
        console.log("🚀 ~ file: chenil.service.ts:64 ~ ChenilService ~ findChenilWithBreedDog ~ breedDogsInChenilId:", breedDogsInChenilId)

        return breedDogsInChenilId;
    }


    async updateChenil(id: string, data: object): Promise<object> {
        // console.log("🚀 ~ file: chenil.service.ts:81 ~ ChenilService ~ updateChenil ~ id:", id)

        try {
            // const chenil_id = await this.chenilModel.findOne({ _id: id })
            // const chenil_id = await this.chenilModel.findById(id)
            // console.log("🚀 ~ file: chenil.service.ts:85 ~ ChenilService ~ updateChenil ~ chenil_id:", chenil_id)

            const updateChenil = await this.chenilModel.findByIdAndUpdate(id, data, { new: true })

            return updateChenil;
        } catch (error) {
            return error;
            
        }
        
    }


    async getAllChenils(): Promise<ChenilDocument[]> {
        try {
          const chenils = await this.chenilModel.find();
          return chenils;
            } catch (error) {
          return error;                
            }
        }

        async postDogToChenil(chenilId: string, dogId: string) {
            try {
                const postDogToChenil = await this.chenilModel.findByIdAndUpdate(
                    chenilId,
                    {
                        $addToSet: { doggos: dogId },
                    },
                    { new: true },
                )

                return postDogToChenil;
            } catch (error) {
                return error;
            }
        }

        async findAllDoggos(): Promise<object> {
            const chenils = await this.chenilModel.find()
            console.log("🚀 ~ file: chenil.service.ts:210 ~ ChenilService ~ fiindAllDoggos ~ chenils:", chenils)
            return chenils;

            
        }


        async getAdoptionPercentageDogToChenil(chenilId: string): Promise<ChenilDocument> {
            const chenil = await this.chenilModel.findById(chenilId)
            console.log("🚀 ~ file: chenil.service.ts:219 ~ ChenilService ~ getAdoptionPercentageDogToChenil ~ chenil:", chenil)
            return chenil;
            
        }
    




}
