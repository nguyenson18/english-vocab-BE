import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { VocabulariesService } from './vocabularies.service';
import { VocabulariesController } from './vocabularies.controller';
import { TopicsModule } from '../topics/topics.module';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary]), TopicsModule],
  controllers: [VocabulariesController],
  providers: [VocabulariesService, CloudinaryService],
  exports: [VocabulariesService, TypeOrmModule],
})
export class VocabulariesModule {}