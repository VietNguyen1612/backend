import { Metadata } from '@grpc/grpc-js';
import { Archive } from './model/archive.model';
import { Place } from 'src/place/model/place.model';

export default interface ArchiveInterface {
  createArchive(
    data: CreateArchiveRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<CreateArchiveResponse>;
  addPlaceToArchive(
    data: AddPlaceToArchiveRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<AddPlaceToArchiveResponse>;
  getArchiveById(
    data: GetArchiveByIdRequest,
    metadata?: Metadata,
    ...res: any[]
  ): Promise<GetArchiveByIdResponse>;
  getAllArchiveByUserId(
    data: GetAllArchiveByUserIdRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetAllArchiveByUserIdResponse>;
  deletePlaceFromArchive(
    data: DeletePlaceFromArchiveRequest,
    metadata?: Metadata,
    ...rest: any[]
  ): Promise<GetAllArchiveByUserIdResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Place {}

export interface CreateArchiveRequest {
  authorId: string;
  title: string;
  places: Place[];
  placeNumber: number;
}

export interface CreateArchiveResponse {
  data: Archive;
}

export interface AddPlaceToArchiveRequest {
  placeId: string;
}

export interface AddPlaceToArchiveResponse {
  message: string;
}

export interface GetArchiveByIdRequest {
  archiveId: string;
}

export interface GetArchiveByIdResponse {
  data: Archive;
}

export interface GetAllArchiveByUserIdRequest {
  userId: string;
}

export interface GetAllArchiveByUserIdResponse {
  data: Archive[];
}

export interface DeletePlaceFromArchiveRequest {
  placeId: string;
  archiveId: string;
}

export interface DeletePlaceFromArchiveResponse {
  message: string;
}
