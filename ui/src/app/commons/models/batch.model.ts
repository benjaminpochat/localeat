import { Animal } from './animal.model';
import { Product } from './product.model';

export class Batch {
  id: number;
  product: Product;
  quantity: number;
  quantitySold: number;
}
