import { Farm } from './farm.model';

export class ProductTemplate {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: string;
  farm: Farm;
}
