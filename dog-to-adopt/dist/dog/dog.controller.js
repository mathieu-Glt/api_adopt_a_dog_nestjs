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
exports.DogController = void 0;
const common_1 = require("@nestjs/common");
const dog_service_1 = require("./dog.service");
const dogs_dto_1 = require("./dto/dogs.dto");
const isAdoptedDto_1 = require("./dto/isAdoptedDto");
const chenil_service_1 = require("../chenil/chenil.service");
let DogController = class DogController {
    constructor(dogService, chenilService) {
        this.dogService = dogService;
        this.chenilService = chenilService;
    }
    async create(body, req) {
        console.log("🚀 ~ file: dog.controller.ts:16 ~ DogController ~ body:", body);
        try {
            const dogCreate = await this.dogService.createDog(body);
            return { status: 201, error: false, message: 'Dog has been created', results: dogCreate };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async getDogsByBreed(breed) {
        try {
            const dogsByBreed = await this.dogService.findDogsByBreed(breed);
            return { status: 200, error: false, message: 'The request was succesfull', results: dogsByBreed };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async findAllBreedsDog() {
        try {
            const breedsOfDog = this.dogService.findAllBreedBis();
            console.log("🚀 ~ file: dog.controller.ts:35 ~ DogController ~ findAllBreedsDog ~ breedsOfDog:", breedsOfDog);
            return { status: 200, error: false, message: 'The request was succesfully', results: breedsOfDog };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async findDogsNotAdopted(chenilId) {
        try {
            const dogIsNotAdopted = await this.chenilService.findDogsNotAdoptedOfOneChenil(chenilId);
            console.log("🚀 ~ file: dog.controller.ts:58 ~ DogController ~ dogIsNotAdopted:", dogIsNotAdopted);
            return { status: 200, error: false, message: 'The request was succesfully', results: dogIsNotAdopted };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async findDogsAdopted(chenilId) {
        try {
            const dogIsAdopted = await this.chenilService.findDogsAdoptedOfOneChenil(chenilId);
            console.log("🚀 ~ file: dog.controller.ts:75 ~ DogController ~ dogIsAdopted:", dogIsAdopted);
            return { status: 200, error: false, message: 'The request was succesfully', results: dogIsAdopted };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async updateAdoptedDog(id, body, req) {
        try {
            console.log("🚀 ~ file: dog.controller.ts:56 ~ DogController ~ body:", body.is_adopted);
            const dogExists = await this.dogService.findDogById(id);
            console.log("🚀 ~ file: chenil.controller.ts:98 ~ ChenilController ~ chenilIdExists:", dogExists.is_adopted);
            if (dogExists.is_adopted === Boolean(body.is_adopted)) {
                return { status: 400, error: true, message: "Bad request" };
            }
            else {
                const updateIsAdoptDogValue = await this.dogService.updateDogAdoptStatus(id, body);
                console.log("🚀 ~ file: dog.controller.ts:61 ~ DogController ~ updateIsAdoptDogValue:", updateIsAdoptDogValue);
                return { status: 201, error: false, message: 'The value is_adopted has been updated', results: updateIsAdoptDogValue };
            }
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
};
exports.DogController = DogController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dogs_dto_1.CreateDogDto, Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/by-breed/:breed'),
    __param(0, (0, common_1.Param)('breed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "getDogsByBreed", null);
__decorate([
    (0, common_1.Get)('/breeds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DogController.prototype, "findAllBreedsDog", null);
__decorate([
    (0, common_1.Get)('/:id_chenil/dog_not_adopted'),
    __param(0, (0, common_1.Param)('id_chenil')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "findDogsNotAdopted", null);
__decorate([
    (0, common_1.Get)('/:id_chenil/dog_adopted'),
    __param(0, (0, common_1.Param)('id_chenil')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "findDogsAdopted", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, isAdoptedDto_1.AdoptValueDto, Object]),
    __metadata("design:returntype", Promise)
], DogController.prototype, "updateAdoptedDog", null);
exports.DogController = DogController = __decorate([
    (0, common_1.Controller)('dogs'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => chenil_service_1.ChenilService))),
    __metadata("design:paramtypes", [dog_service_1.DogService,
        chenil_service_1.ChenilService])
], DogController);
//# sourceMappingURL=dog.controller.js.map