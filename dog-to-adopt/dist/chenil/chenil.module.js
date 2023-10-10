"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChenilModule = void 0;
const common_1 = require("@nestjs/common");
const chenil_controller_1 = require("./chenil.controller");
const chenil_service_1 = require("./chenil.service");
const mongoose_1 = require("@nestjs/mongoose");
const chenils_chema_1 = require("./schema/chenils.chema");
const dog_module_1 = require("../dog/dog.module");
let ChenilModule = class ChenilModule {
};
exports.ChenilModule = ChenilModule;
exports.ChenilModule = ChenilModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: chenils_chema_1.Chenil.name, schema: chenils_chema_1.ChenilSchema }]),
            (0, common_1.forwardRef)(() => dog_module_1.DogModule)
        ],
        controllers: [chenil_controller_1.ChenilController],
        providers: [chenil_service_1.ChenilService],
        exports: [chenil_service_1.ChenilService]
    })
], ChenilModule);
//# sourceMappingURL=chenil.module.js.map