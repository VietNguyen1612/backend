import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { PlaceCategory } from '../../trip/types/trip.type';
import { OpeningHours } from '../types/place.type';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone: string;

  @IsOptional()
  @IsArray()
  opening: OpeningHours;

  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longtitude: number;

  @IsNotEmpty()
  @IsEnum(PlaceCategory)
  category: PlaceCategory;
}
