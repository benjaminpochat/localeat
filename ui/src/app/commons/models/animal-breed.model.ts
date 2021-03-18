export enum AnimalBreed {
  BeefLimousine = 'BEEF_LIMOUSIN',
  BeefCharollais = 'BEEF_CHAROLLAIS'
}

export class AnimalBreedUtils {
  public static getAnimalBreedLabel(breed: AnimalBreed): string {
    switch (breed) {
      case AnimalBreed.BeefCharollais:
        return 'Charollaise';
      case AnimalBreed.BeefLimousine:
        return 'Limousine';
      default:
        return '';
    }
  }
}
