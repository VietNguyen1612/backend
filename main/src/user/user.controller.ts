import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/model/user.model';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('friend-list')
  @UseGuards(AuthGuard('jwt'))
  async getFriendList(@CurrentUser() user: User) {
    return await this.usersService.getFriendList(user._id.toString());
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('token')
  async findByToken(@Body('token') token: string) {
    return await this.usersService.findUserByRefreshToken(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async findOne(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
    console.log(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'))
  async searchByPhone(
    @Query('q') phoneNumber: string,
    @CurrentUser() currentUser: User,
  ) {
    const searchRes = await this.usersService.findByPhone(phoneNumber);
    let data = null;
    if (searchRes) {
      if (
        currentUser._id.toString() === searchRes._id.toString() ||
        searchRes.friends.find(
          (item) => item.toString() === currentUser._id.toString(),
        )
      ) {
        data = { ...searchRes, isFriend: true };
      } else {
        data = { ...searchRes, isFriend: false };
      }
    }

    return data;
  }
}
