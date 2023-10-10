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
exports.ChenilController = void 0;
const common_1 = require("@nestjs/common");
const chenil_service_1 = require("./chenil.service");
const chenil_dto_1 = require("./dto/chenil.dto");
const dog_service_1 = require("../dog/dog.service");
let ChenilController = class ChenilController {
    constructor(chenilService, dogService) {
        this.chenilService = chenilService;
        this.dogService = dogService;
    }
    async create(body, req) {
        console.log("🚀 ~ file: chenil.controller.ts:18 ~ ChenilController ~ body:", body);
        try {
            const chenilCreate = await this.chenilService.create(body);
            return { status: 201, error: false, message: "Chenil has been created", results: chenilCreate };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async findPercentDogAdoptedByChenil(chenilId) {
        try {
            const allDoggosAdoptedByChenil = await this.chenilService.getAdoptionPercentageDogToChenil(chenilId);
            console.log("🚀 ~ file: chenil.controller.ts:69 ~ ChenilController ~ calculateAdoptedPercentage ~ allDoggos:", allDoggosAdoptedByChenil);
            const adoptedCount = await this.dogService.countAdoptedDogs(allDoggosAdoptedByChenil);
            console.log("🚀 ~ file: chenil.controller.ts:70 ~ ChenilController ~ calculateAdoptedPercentage ~ adoptedCount:", adoptedCount);
            return { status: 200, error: false, message: "Pourcentage of dogs adopted for the chenil ", results: adoptedCount + ' %' };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async getAvailablePlaceCapacity(chenilId) {
        try {
            const chenil = await this.chenilService.getAdoptionPercentageDogToChenil(chenilId);
            console.log("🚀 ~ file: chenil.controller.ts:40 ~ ChenilController ~ capacity:", chenil);
            const capacityChenil = await this.dogService.countDog(chenil);
            return { status: 200, error: false, message: "Capacity place dogs for the chenil ", results: capacityChenil + ' place(s)' };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async getChenilWithAtLeastOneDog() {
        try {
            const chenils = await this.chenilService.findAllChenilContainAtLeastOneDog();
            console.log("🚀 ~ file: chenil.controller.ts:33 ~ ChenilController ~ chenils:", chenils);
            return { status: 200, error: false, message: "The request was successful", results: chenils };
        }
        catch (error) {
            console.log("🚀 ~ file: chenil.controller.ts:35 ~ ChenilController ~ error:", error);
            return { status: 500, error: true, message: error };
        }
    }
    async findOne(chenilId, breed) {
        try {
            const breedDogsInChenilId = await this.chenilService.findChenilWithBreedDog(chenilId, breed);
            console.log("🚀 ~ file: chenil.controller.ts:56 ~ ChenilController ~ findOne ~ breedDogsInChenilId:", breedDogsInChenilId);
            return { status: 200, error: false, message: 'The request was successful', results: breedDogsInChenilId };
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async update(chenilId, body, req) {
        try {
            const chenilIdExists = await this.chenilService.findChenilById(chenilId);
            if (chenilIdExists) {
                const chenil = await this.chenilService.updateChenil(chenilId, body);
                return { status: 201, error: false, message: "Chenil has been updated", results: chenil };
            }
            else {
                return { status: 404, error: true, message: "Chenil not found", results: [] };
            }
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async updateChenil(chenilId, body, req) {
        try {
            const chenilIdExists = await this.chenilService.findChenilById(chenilId);
            console.log("🚀 ~ file: chenil.controller.ts:98 ~ ChenilController ~ chenilIdExists:", chenilIdExists);
            if (chenilIdExists) {
                const chenil = await this.chenilService.updateChenil(chenilId, body);
                return { status: 201, error: false, message: "Chenil has been updated", results: chenil };
            }
            else {
                return { status: 404, error: true, message: "Chenil not found", results: [] };
            }
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
    async addDogToChenil(chenilId, dogId) {
        try {
            const chenils = await this.chenilService.getAllChenils();
            console.log('🚀 ~ file: chenil.controller.ts:124 ~ ChenilController ~ chenils:', chenils);
            const dogs = await this.dogService.findAllDogs();
            console.log('🚀 ~ file: chenil.controller.ts:127 ~ ChenilController ~ dogs:', dogs);
            const chenilExists = chenils.some(chenil => chenil._id.toString() === chenilId);
            const dogExists = dogs.some(dog => dog._id.toString() === dogId);
            console.log("🚀 ~ file: chenil.controller.ts:131 ~ ChenilController ~ chenilExists:", chenilExists);
            console.log("🚀 ~ file: chenil.controller.ts:146 ~ ChenilController ~ dogExists:", dogExists);
            if (!chenilExists) {
                return { status: 404, error: true, message: "Chenil does not exists", results: [] };
            }
            else if (!dogExists) {
                return { status: 404, error: true, message: "Dog does not exists", results: [] };
            }
            else {
                console.log('ok ok');
                const addDogToChenil = await this.chenilService.postDogToChenil(chenilId, dogId);
                return { status: 201, error: false, message: "Chenil has been updated", results: addDogToChenil };
            }
        }
        catch (error) {
            return { status: 500, error: true, message: error };
        }
    }
};
exports.ChenilController = ChenilController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chenil_dto_1.CreateChenilDto, Object]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/percentDogAdopted/:chenilId'),
    __param(0, (0, common_1.Param)('chenilId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "findPercentDogAdoptedByChenil", null);
__decorate([
    (0, common_1.Get)('/capacityChenil/:chenilId'),
    __param(0, (0, common_1.Param)('chenilId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "getAvailablePlaceCapacity", null);
__decorate([
    (0, common_1.Get)('/least-a-dog'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "getChenilWithAtLeastOneDog", null);
__decorate([
    (0, common_1.Get)('/:id_chenil/:breed_of_dog'),
    __param(0, (0, common_1.Param)('id_chenil')),
    __param(1, (0, common_1.Param)('breed_of_dog')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chenil_dto_1.CreateChenilDto, Object]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "updateChenil", null);
__decorate([
    (0, common_1.Post)('/:chenilId/addDog/:dogId'),
    __param(0, (0, common_1.Param)('chenilId')),
    __param(1, (0, common_1.Param)('dogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChenilController.prototype, "addDogToChenil", null);
exports.ChenilController = ChenilController = __decorate([
    (0, common_1.Controller)('chenils'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => dog_service_1.DogService))),
    __metadata("design:paramtypes", [chenil_service_1.ChenilService,
        dog_service_1.DogService])
], ChenilController);
//# sourceMappingURL=chenil.controller.js.map