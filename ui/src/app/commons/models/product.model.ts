import { Animal } from './animal.model';
import { Farm } from './farm.model';

export class Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: string;
  farm: Farm;
}
