import { AnimalBreed } from './animal-breed.model';
import { AnimalType } from './animal-type.model';
import { Farm } from './farm.model';

export class Animal {
  id: number;
  liveWeight: number;
  meatWeight: number;
  finalFarm: Farm;
  identificationNumber: string;
  breed: AnimalBreed;
  animalType: AnimalType;
}
