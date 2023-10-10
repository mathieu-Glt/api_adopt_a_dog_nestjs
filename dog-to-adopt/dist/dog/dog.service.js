"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogService = void 0;
const common_1 = require("@nestjs/common");
const dogs_shema_1 = require("./schema/dogs.shema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const breed_1 = require("../data/breed");
let DogService = class DogService {
    constructor(dogModel) {
        this.dogModel = dogModel;
    }
    async createDog(data) {
        console.log('🚀 ~ file: dog.service.ts:15 ~ DogService ~ createDog ~ data:', data);
        const dog = await this.dogModel.create(data);
        return dog;
    }
    async findDogsByBreed(breed) {
        const dogsByBreed = await this.dogModel.find({ breed: breed });
        console.log("🚀 ~ file: dog.service.ts:163 ~ DogService ~ findDogsByBreed ~ dogsByBreed:", dogsByBreed);
        return dogsByBreed;
    }
    async findDogById(id) {
        try {
            const dog = await this.dogModel.findById(id);
            return dog;
        }
        catch (error) {
            return error;
        }
    }
    async findAllDogs() {
        try {
            const dogs = await this.dogModel.find();
            return dogs;
        }
        catch (error) {
            return error;
        }
    }
    async findAllBreed() {
        const dogs = await this.dogModel.distinct('breed');
        return dogs;
    }
    getBreedsOfDog() {
        return breed_1.breedsOfDog.map(({ id }) => ({
            id
        }));
    }
    getBreedsOfDogBisOne() {
        return breed_1.breedsOfDog.map(({ breed }) => ({
            breed
        }));
    }
    getBreedsOfDogBis() {
        return breed_1.breedsOfDog;
    }
    findAllBreedBis() {
        const breedsOfDogs = this.getBreedsOfDogBisOne();
        console.log("🚀 ~ file: dog.service.ts:42 ~ DogService ~ findAllBreedBis ~ breedsOfDogs:", breedsOfDogs);
        return breedsOfDogs;
    }
    async findAllIdsDogs() {
        const dogs = await this.dogModel.find({}, '_id');
        console.log("🚀 ~ file: dog.service.ts:33 ~ DogService ~ findAllIdsDogs ~ dogs:", dogs);
        return dogs;
    }
    async updateDogAdoptStatus(dogId, data) {
        const num = Boolean(data.is_adopted);
        console.log("🚀 ~ file: dog.service.ts:90 ~ DogService ~ updateDogAdoptStatus ~ num:", num);
        try {
            const updateDog = await this.dogModel.findOneAndUpdate({ _id: dogId }, { $set: { is_adopted: num } }, {
                new: true,
                runValidators: true,
                upsert: false,
            });
            console.log("🚀 ~ file: dog.service.ts:96 ~ DogService ~ updateDogAdoptStatus ~ updateDog:", updateDog);
            if (updateDog) {
                return "The 'is_adopted' fields  has been updated";
            }
            else {
                return "The 'is_adopted fields was not updated because it was already true or hte document was not found";
            }
        }
        catch (error) {
            return error;
        }
    }
    async countAdoptedDogs(dogIds) {
        console.log("🚀 ~ file: dog.service.ts:129 ~ DogService ~ countAdoptedDogs ~ dogIds:", dogIds.doggos);
        const dogIsAdopted = await this.dogModel.countDocuments({
            _id: { $in: dogIds.doggos },
            is_adopted: true,
        });
        const dogs = await this.dogModel.countDocuments({
            _id: { $in: dogIds.doggos },
        });
        console.log("🚀 ~ file: dog.service.ts:139 ~ DogService ~ countAdoptedDogs ~ dogs:", dogs);
        console.log("🚀 ~ file: dog.service.ts:134 ~ DogService ~ countAdoptedDogs ~ dogIsAdopted:", dogIsAdopted);
        const precentDogAdopted = (dogIsAdopted / dogs) * 100;
        console.log("🚀 ~ file: dog.service.ts:136 ~ DogService ~ countAdoptedDogs ~ precentDogAdopted:", precentDogAdopted);
        return precentDogAdopted;
    }
    async countDog(dogIds) {
        console.log("🚀 ~ file: dog.service.ts:148 ~ DogService ~ countDog ~ dogIds:", dogIds);
        const dogs = await this.dogModel.countDocuments({
            _id: { $in: dogIds.doggos },
        });
        console.log("🚀 ~ file: dog.service.ts:153 ~ DogService ~ countDog ~ dogs:", dogs);
        const calculCapacity = dogIds.capacity - dogs;
        console.log("🚀 ~ file: dog.service.ts:155 ~ DogService ~ countDog ~ calculCapacity:", calculCapacity);
        return calculCapacity;
    }
};
exports.DogService = DogService;
exports.DogService = DogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(dogs_shema_1.Dog.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DogService);
//# sourceMappingURL=dog.service.js.map