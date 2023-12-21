import { Place } from './place';

export interface Trip {
  authorId: string;
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  vehicle: string;
  provinces: Array<string>;
  places: Array<Place>;
  viewCount: number;
  isDraft: boolean;
  isPublish: boolean;
}

export interface Participates {
  id: string;
  username: string;
  avatarUrl: string;
}
