import { Metadata } from '@grpc/grpc-js';
import { Place } from '../common/types/place';

export default interface PlaceInterface {
  getPlaceByPlaceId(
    data: GetPlaceByPlaceIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetPlaceByPlaceIdResponse>;

  getAllPlaces(
    data: GetAllPlacesRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetAllPlacesResponse>;
}

export interface GetPlaceByPlaceIdRequest {
  placeId: string;
}
export interface GetPlaceByPlaceIdResponse {
  data: Place;
}

export interface GetAllPlacesRequest {
  pageSize: number;
  lastId: string;
}

export interface GetAllPlacesResponse {
  data: Place[];
  lastId: string;
}
