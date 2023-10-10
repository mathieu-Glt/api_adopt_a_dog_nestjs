import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DogModule } from './dog/dog.module';
import { ChenilModule } from './chenil/chenil.module';

@Module({
  imports: [
    DogModule,
    ChenilModule,
    MongooseModule.forRoot(
      'mongodb+srv://mathieugillet:wvEKMfn0kc3w34jr@cluster0.kz7jamo.mongodb.net/dogsToAdopt',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
