export enum AnimalBreed {
  BeefLimousin = 'BEEF_LIMOUSIN',
  BeefCharollais = 'BEEF_CHAROLAIS'
}

export class AnimalBreedUtils {
  public static getAnimalBreedLabel(breed: AnimalBreed): string {
    switch (breed) {
      case AnimalBreed.BeefCharollais:
        return 'Charollaise';
      case AnimalBreed.BeefLimousin:
        return 'Limousine';
      default:
        return '';
    }
  }
}
