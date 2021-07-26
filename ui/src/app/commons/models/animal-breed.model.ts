export enum AnimalBreed {
  BeefLimousin = 'BEEF_LIMOUSIN',
  BeefCharolais = 'BEEF_CHAROLAIS'
}

export class AnimalBreedUtils {
  public static getAnimalBreedLabel(breed: AnimalBreed): string {
    switch (breed) {
      case AnimalBreed.BeefCharolais:
        return 'Charolaise';
      case AnimalBreed.BeefLimousin:
        return 'Limousine';
      default:
        return '';
    }
  }
}
