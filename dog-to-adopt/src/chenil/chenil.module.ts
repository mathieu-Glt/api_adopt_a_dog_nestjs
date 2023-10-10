import { Module, forwardRef } from '@nestjs/common';
import { ChenilController } from './chenil.controller';
import { ChenilService } from './chenil.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chenil, ChenilSchema } from './schema/chenils.chema';
import { DogService } from 'src/dog/dog.service';
import { DogModule } from 'src/dog/dog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chenil.name, schema: ChenilSchema }]),
    forwardRef(() => DogModule)
  ],
  controllers: [ChenilController],
  providers: [ChenilService],
  exports: [ChenilService]

})
export class ChenilModule {}
