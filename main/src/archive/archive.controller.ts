import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArchiveService } from './archive.service';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/common/model/user.model';
import { CreateArchiveDto } from './dto/create-archive.dto';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllArchiveByUserId(@CurrentUser() { _id }: User) {
    return this.archiveService.getAllArchiveByUserId(_id.toString());
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getArchiveById(@Param('id') archiveId: string) {
    return this.archiveService.getArchiveById(archiveId);
  }
  @Post('add/:id')
  @UseGuards(AuthGuard('jwt'))
  addPlaceToArchive(@Param('id') archiveId: string, @Body() body) {
    return this.archiveService.addPlaceToArchive(archiveId, body.placeId);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  createArchive(@Body() body: CreateArchiveDto, @CurrentUser() author: User) {
    return this.archiveService.createArchive(body, author._id.toString());
  }
}
