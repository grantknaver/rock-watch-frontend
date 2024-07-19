interface Links {
  next: string;
  previous: string;
  self: string;
}
export interface AsteroidData {
  elementCount: number;
  links: Links;
  near_earth_objects: any;
}
