import { Farm } from './farm.model';
import { Image } from './image.model';
import { PieceCategory, PieceCategoryUtils } from './piece-category.model';
import { Shaping, ShapingUtils } from './shaping.model';

export class Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: Image;
  farm: Farm;
  elements: Map<PieceCategory, Shaping>;
}
