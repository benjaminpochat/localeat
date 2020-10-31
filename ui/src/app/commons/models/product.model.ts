import { Animal } from './animal.model';
import { Farm } from './farm.model';

export class Product {
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  photo: string;
  farm: Farm;
}
