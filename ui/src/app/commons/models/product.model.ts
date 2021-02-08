import { Farm } from './farm.model';
import { Image } from './image.model';

export class Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: Image;
  farm: Farm;
}
