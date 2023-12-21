import { Metadata } from '@grpc/grpc-js';
import { Archive, Place } from 'src/common/types';

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
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Place {}

export interface CreateArchiveRequest {
  authorId: string;
  title: string;
  places: string[];
  // placeNumber: number;
}

export interface CreateArchiveResponse {
  data: Archive;
}

export interface AddPlaceToArchiveRequest {
  placeId: string;
  archiveId: string;
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
