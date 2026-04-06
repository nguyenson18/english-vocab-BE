import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsModule } from '../topics/topics.module';
import { Passage } from './entities/passage.entity';
import { PassagesController } from './passages.controller';
import { PassagesService } from './passages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Passage]), TopicsModule],
  controllers: [PassagesController],
  providers: [PassagesService],
  exports: [PassagesService, TypeOrmModule],
})
export class PassagesModule {}
