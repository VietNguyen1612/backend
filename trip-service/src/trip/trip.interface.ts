import { Metadata } from '@grpc/grpc-js';
import { Trip } from './model/trip.model';
import { Place } from 'src/place/model/place.model';

export default interface TripInterface {
  getAllTripByUserId(
    data: GetAllTripByUserIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetAllTripByUserIdResponse>;
  createTripPlan(
    data: CreateTripPlanRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<CreateTripPlanResponse>;
  createTripPlanByArchiveId(
    data: CreateTripPlanByArchiveIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<CreateTripPlanResponse>;
}

export interface Coordinate {
  latitude: string;
  longtitude: string;
  latitudeDelta?: string | undefined;
  longtitudeDelta?: string | undefined;
}

export interface Places {
  name: string;
  province: string;
  coodinate?: Coordinate | undefined;
}

export interface TripPlan {
  authorId: string;
  title: string;
  startDate: string;
  endDate: string;
  vehicle: string;
  provinces: string[];
  places: Array<Place>;
}

// tslint:disable-next-line:no-empty-interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllTripByUserIdRequest {
  userId: string;
}
export interface GetAllTripByUserIdResponse {
  data: Trip[];
}

export interface CreateTripPlanRequest {
  authorId: string;
  title: string;
}

export interface CreateTripPlanResponse {
  data: Trip;
}

export interface CreateTripPlanByArchiveIdRequest {
  authorId: string;
  title: string;
  archiveId: string
}
