import { Injectable } from '@angular/core';
import { AnimalBreedUtils } from 'src/app/commons/models/animal-breed.model';
import { AnimalTypeUtils } from 'src/app/commons/models/animal-type.model';
import { Animal } from 'src/app/commons/models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  getAnimalDescription(animal: Animal) {
    return AnimalTypeUtils.getAnimalTypeLabel(animal.animalType)
      + (AnimalBreedUtils.getAnimalBreedLabel(animal.breed) ? ' race ' + AnimalBreedUtils.getAnimalBreedLabel(animal.breed) : '')
  }
}
