import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/common/model/user.model';
import { CreateTripPlanByArchiveIdDto } from './dto/create-trip-plan-by-archive-id.dto';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('own')
  getAllTripByUserId(@Req() req: Request) {
    const user = req.user as User;
    return this.tripService.getAllTripByUserId({
      userId: user._id.toString(),
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllTripByParticipateId(@Req() req: Request) {
    const user = req.user as User;
    return this.tripService.getAllTripByParticipateId({
      userId: user._id.toString(),
    });
  }
  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // createTripPlan(
  //   @Req() req: Request,
  //   @Body() createTripPlanDto: CreateTripPlanDto,
  // ): Observable<CreateTripPlanResponse> {
  //   createTripPlanDto.authorId = (req.user as User)._id.toString();
  //   // console.log(this.grpcService.createTripPlan);
  //   return this.tripService.createTripPlan(createTripPlanDto);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createTripPlanByArchiveId(
    @Query('archiveId') archiveId: string,
    @Req() req: Request,
    @Body() createTripPlanByArchiveIdDto: CreateTripPlanByArchiveIdDto,
  ) {
    const user = req.user as User;
    createTripPlanByArchiveIdDto.author = {
      id: user._id.toString(),
      username: user.username,
      avatarUrl: user.avatarUrl,
    };
    createTripPlanByArchiveIdDto.archiveId = archiveId;

    // console.log(createTripPlanByArchiveIdDto);
    return this.tripService.createTripPlanByArchiveId(
      createTripPlanByArchiveIdDto,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getTripDetailById(@Param('id') tripId: string) {
    return this.tripService.getTripDetailById({ tripId });
  }
}
