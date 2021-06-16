import { Farm } from './farm.model';
import { Image } from 'src/app/commons/models/image.model';

export class ProductTemplate {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: Image;
  farm: Farm;
}
