import { Module } from '@nestjs/common'
import { FileService } from './file.service';
import { FileContainer } from './file.controller';

@Module({
  imports: [],
  controllers: [FileContainer],
  providers: [FileService]
})

export class FileModule { } 