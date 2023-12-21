import { Place } from './place';

export interface Archive {
  authorId: string;
  _id: string;
  title: string;
  places?: Array<Place>;
  placesNumber: number;
}
