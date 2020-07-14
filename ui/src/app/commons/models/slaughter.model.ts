import { Animal } from './animal.model';
import { Delivery } from './delivery.model';

export class Slaughter {
  id: number;
  animal: Animal;
  delivery: Delivery;
  slaughterDate: Date;
  cuttingDate: Date;

  constructor(){
    this.animal = new Animal();
  }
}
