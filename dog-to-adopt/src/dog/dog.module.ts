import { Module, forwardRef } from '@nestjs/common';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './schema/dogs.shema';
import { ChenilService } from 'src/chenil/chenil.service';
import { ChenilModule } from 'src/chenil/chenil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
    forwardRef(() => ChenilModule)
  ],
  controllers: [DogController],
  providers: [DogService],
  exports: [DogService]
})
export class DogModule {}
