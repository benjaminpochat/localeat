import { Animal } from './animal.model';
import { Product } from './product.model';

export class Batch {
  product: Product;
  unitPrice: number;
  animal: Animal;
  quantity: number;
}
