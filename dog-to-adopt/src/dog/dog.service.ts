import { Injectable, Type } from '@nestjs/common';
import { Dog, DogDocument } from './schema/dogs.shema';
import { Model, Types } from 'mongoose';
import { CreateDogDto } from './dto/dogs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { breedsOfDog } from '../data/breed'
import { AdoptValueDto } from './dto/isAdoptedDto';


@Injectable()
export class DogService {

  constructor(
    @InjectModel(Dog.name)
    private dogModel: Model<DogDocument>,
  ) { }

  async createDog(data: CreateDogDto): Promise<DogDocument> {
    console.log(
      '🚀 ~ file: dog.service.ts:15 ~ DogService ~ createDog ~ data:',
      data,
    );
    const dog = await this.dogModel.create(data);

    return dog;
  }

  async findDogsByBreed(breed: string): Promise<DogDocument[]> {
    const dogsByBreed = await this.dogModel.find({ breed: breed })
    console.log("🚀 ~ file: dog.service.ts:163 ~ DogService ~ findDogsByBreed ~ dogsByBreed:", dogsByBreed)
    return dogsByBreed;
  }


  async findDogById(id: string): Promise<DogDocument> {

    try {

      const dog = await this.dogModel.findById(id)

      return dog;
    } catch (error) {
      return error;
      
    }
  }

  async findAllDogs(): Promise<DogDocument[]> {

    try {
      const dogs = await this.dogModel.find();
      return dogs;
      
    } catch (error) {
      return error;
      
    }
  }

  async findAllBreed(): Promise<string[]> {
    const dogs = await this.dogModel.distinct('breed')
    // console.log("🚀 ~ file: dog.service.ts:27 ~ DogService ~ findAllIdsBelongToDog ~ dogs:", dogs)
    return dogs;
  }
  // avec cette méthode(getBreedsOfDog()) on applique un destructuring pour renvoyer seulement l'id le destructuring agit comme un filtre
  // voici mon  tableau export const breedsOfDog = [ { id: 1, breed: 'LABRADOR' }, { id: 2, breed: 'ROTTWEILER'} ...etc ]

  getBreedsOfDog() {
    return breedsOfDog.map(({ id }) =>({
      id
    }))
  }
  // avec cette méthode(getBreedsOfDog()) on applique un destructuring pour renvoyer seulement la race du chien(breed) le destructuring agit comme un filtre
  // voici mon  tableau export const breedsOfDog = [ { id: 1, breed: 'LABRADOR' }, { id: 2, breed: 'ROTTWEILER'} ...etc ]

  getBreedsOfDogBisOne() {
    return breedsOfDog.map(({ breed }) =>({
      breed
    }))
  }

  // maintenant si je souhaite renvoyè tous le contenu de mon array je vais utiliser  cette fonction
  // je n'applique pas de destructuring à cette méthode
  getBreedsOfDogBis() {
    return breedsOfDog
  }

  findAllBreedBis(){
    // const breedsOfDogs = this.getBreedsOfDog();
    // const breedsOfDogs = this.getBreedsOfDogBis();
    const breedsOfDogs = this.getBreedsOfDogBisOne();
    console.log("🚀 ~ file: dog.service.ts:42 ~ DogService ~ findAllBreedBis ~ breedsOfDogs:", breedsOfDogs)
    return breedsOfDogs;

  }

  async findAllIdsDogs(): Promise<{ _id: Types.ObjectId }[]> {
    const dogs = await this.dogModel.find({}, '_id') // renvoie uiquement les ids du documentDog
    console.log("🚀 ~ file: dog.service.ts:33 ~ DogService ~ findAllIdsDogs ~ dogs:", dogs)
    return dogs;

  }

  async updateDogAdoptStatus(dogId: string, data: AdoptValueDto): Promise<string | object> {
    // console.log("🚀 ~ file: dog.service.ts:87 ~ DogService ~ updateDogAdoptStatus ~ data:", data)
    // console.log("🚀 ~ file: dog.service.ts:8887 ~ DogService ~ updateDogAdoptStatus ~ data:", data.is_adopted)
    // const num = !!data.is_adopted;
    const num = Boolean(data.is_adopted)

    console.log("🚀 ~ file: dog.service.ts:90 ~ DogService ~ updateDogAdoptStatus ~ num:", num)
    
    try {
      const updateDog = await this.dogModel.findOneAndUpdate(
        { _id: dogId },
        { $set: { is_adopted: num } },
        {
          new: true,
          runValidators: true,
          upsert: false,
        }
      )
      console.log("🚀 ~ file: dog.service.ts:96 ~ DogService ~ updateDogAdoptStatus ~ updateDog:", updateDog)

      if (updateDog) {
        return "The 'is_adopted' fields  has been updated";
      } else {
        return "The 'is_adopted fields was not updated because it was already true or hte document was not found";
      }
    } catch (error) {
      return error;
    }
  }

  async countAdoptedDogs(dogIds: any): Promise<number> {
    console.log("🚀 ~ file: dog.service.ts:129 ~ DogService ~ countAdoptedDogs ~ dogIds:", dogIds.doggos)
    const dogIsAdopted = await this.dogModel.countDocuments({
      _id: { $in: dogIds.doggos },
      is_adopted: true,
    })
    const dogs = await this.dogModel.countDocuments({
      _id: { $in: dogIds.doggos },

    })
    console.log("🚀 ~ file: dog.service.ts:139 ~ DogService ~ countAdoptedDogs ~ dogs:", dogs)
    console.log("🚀 ~ file: dog.service.ts:134 ~ DogService ~ countAdoptedDogs ~ dogIsAdopted:", dogIsAdopted)
    
    const precentDogAdopted = (dogIsAdopted / dogs) * 100;
    console.log("🚀 ~ file: dog.service.ts:136 ~ DogService ~ countAdoptedDogs ~ precentDogAdopted:", precentDogAdopted)

    return precentDogAdopted;
  }

  async countDog(dogIds: any): Promise<number> {
  console.log("🚀 ~ file: dog.service.ts:148 ~ DogService ~ countDog ~ dogIds:", dogIds)
  const dogs = await this.dogModel.countDocuments({
    _id: { $in: dogIds.doggos },

  })
  console.log("🚀 ~ file: dog.service.ts:153 ~ DogService ~ countDog ~ dogs:", dogs)
  const calculCapacity = dogIds.capacity - dogs; 
  console.log("🚀 ~ file: dog.service.ts:155 ~ DogService ~ countDog ~ calculCapacity:", calculCapacity)
  return calculCapacity;


  }






}
