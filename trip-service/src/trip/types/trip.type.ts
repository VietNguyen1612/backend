export enum Vehicle {
  CAR = 'car',
  BIKE = 'bike',
  PLANE = 'plane',
}

export enum PlaceCategory {
  COFFEE = 'coffee',
  RESTAURANT = 'restaurant',
  GAS = 'gas',
  ENTERTAIMENT = 'entertaiment',
  UNKOWN = 'unkown',
}

export interface Coordinate {
  latitude: number;
  longtitude: number;
  latitudeDelta?: number;
  longtitudeDelta?: number;
}
export interface Places {
  name: string;
  province: string;
  coordinate: Coordinate;
}
