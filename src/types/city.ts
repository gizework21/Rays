export interface City {
  id: string;
  name: string;
  country: string;
  population: number;
  timezone: string;
  createdAt: Date;
}

export type CityFormData = Omit<City, 'id' | 'createdAt'>;
