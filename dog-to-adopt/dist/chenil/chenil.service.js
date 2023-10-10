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
exports.ChenilService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const chenils_chema_1 = require("./schema/chenils.chema");
const mongoose_2 = require("mongoose");
let ChenilService = class ChenilService {
    constructor(chenilModel) {
        this.chenilModel = chenilModel;
    }
    async create(data) {
        console.log("🚀 ~ file: chenil.service.ts:14 ~ ChenilService ~ create ~ data:", data);
        const chenil = await this.chenilModel.create(data);
        return chenil;
    }
    async findAllChenilContainAtLeastOneDog() {
        const chenils = await this.chenilModel.find({ doggos: { $exists: true, $ne: [] } });
        console.log("🚀 ~ file: chenil.service.ts:25 ~ ChenilService ~ findAllChenilContentAtLeastOneDog ~ chenils:", chenils);
        return chenils;
    }
    async findChenilById(id) {
        const chenil = await this.chenilModel.findById(id);
        return chenil;
    }
    async findDogsAdoptedOfOneChenil(chenilId) {
        try {
            const dogsAdopted = await this.chenilModel.aggregate([
                {
                    $match: { _id: new mongoose_2.Types.ObjectId(chenilId) }
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
            ]);
            return dogsAdopted;
        }
        catch (error) {
            return error;
        }
    }
    async findDogsNotAdoptedOfOneChenil(chenilId) {
        try {
            const dogsNotAdopted = await this.chenilModel.aggregate([
                {
                    $match: { _id: new mongoose_2.Types.ObjectId(chenilId) }
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
            ]);
            return dogsNotAdopted;
        }
        catch (error) {
            return error;
        }
    }
    async findChenilWithBreedDog(chenilId, breed) {
        const breedDogsInChenilId = await this.chenilModel.aggregate([
            { $match: { _id: new mongoose_2.Types.ObjectId(chenilId) } },
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
        ]);
        console.log("🚀 ~ file: chenil.service.ts:64 ~ ChenilService ~ findChenilWithBreedDog ~ breedDogsInChenilId:", breedDogsInChenilId);
        return breedDogsInChenilId;
    }
    async updateChenil(id, data) {
        try {
            const updateChenil = await this.chenilModel.findByIdAndUpdate(id, data, { new: true });
            return updateChenil;
        }
        catch (error) {
            return error;
        }
    }
    async getAllChenils() {
        try {
            const chenils = await this.chenilModel.find();
            return chenils;
        }
        catch (error) {
            return error;
        }
    }
    async postDogToChenil(chenilId, dogId) {
        try {
            const postDogToChenil = await this.chenilModel.findByIdAndUpdate(chenilId, {
                $addToSet: { doggos: dogId },
            }, { new: true });
            return postDogToChenil;
        }
        catch (error) {
            return error;
        }
    }
    async findAllDoggos() {
        const chenils = await this.chenilModel.find();
        console.log("🚀 ~ file: chenil.service.ts:210 ~ ChenilService ~ fiindAllDoggos ~ chenils:", chenils);
        return chenils;
    }
    async getAdoptionPercentageDogToChenil(chenilId) {
        const chenil = await this.chenilModel.findById(chenilId);
        console.log("🚀 ~ file: chenil.service.ts:219 ~ ChenilService ~ getAdoptionPercentageDogToChenil ~ chenil:", chenil);
        return chenil;
    }
};
exports.ChenilService = ChenilService;
exports.ChenilService = ChenilService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chenils_chema_1.Chenil.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChenilService);
//# sourceMappingURL=chenil.service.js.map