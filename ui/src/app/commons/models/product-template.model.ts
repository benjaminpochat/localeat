import { Farm } from './farm.model';
import { Image } from 'src/app/commons/models/image.model';
import { PieceCategory, PieceCategoryUtils } from './piece-category.model';
import { Shaping, ShapingUtils } from './shaping.model';

export class ProductTemplate {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  netWeight: number;
  photo: Image;
  farm: Farm;
  elements: Map<PieceCategory, Shaping>;

}

export class ProductTemplateUtils {
  static setShaping(productTemplate: ProductTemplate, pieceCategory: string, shaping: string): void {
    productTemplate.elements.set(
      PieceCategoryUtils.getPieceCategory(pieceCategory), 
      ShapingUtils.getShaping(shaping)
    );
  }
}