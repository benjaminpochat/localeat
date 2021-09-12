export enum PieceCategory {
    Filet = 'FILET',
    FauxFilet = 'FAUX_FILET',
    Cote = 'COTE',
    BasseCote = 'BASSE_COTE',
    Rumsteak = 'RUMSTEAK',
    SteakPremium = 'STEAK_PREMIUM',
    SteakStandard = 'STEAK_STANDARD',
    Bavette = 'BAVETTE',
    Bourguignon = 'BOURGUIGNON',
    Paleron = 'PALERON',
    Jarret = 'JARRET',
    PlatDeCote = 'PLAT_DE_COTE',
    Queue = 'QUEUE'
}
 
  export class PieceCategoryUtils {
    static getPieceCategoryLabel(pieceCategory: PieceCategory) {
      switch (pieceCategory) {
        case PieceCategory.Filet:
            return 'filet';
        case PieceCategory.FauxFilet:
            return 'faux filet';
        case PieceCategory.Cote:
            return 'côtes';
        case PieceCategory.BasseCote:
            return 'basses côtes';
        case PieceCategory.Rumsteak:
            return 'rumsteak';
        case PieceCategory.SteakPremium:
            return 'steaks premium';
        case PieceCategory.SteakStandard:
            return 'steaks standards';
        case PieceCategory.Bavette:
            return 'bavette';
        case PieceCategory.Bourguignon:
            return 'bourguignon';
        case PieceCategory.Paleron:
            return 'paleron';
        case PieceCategory.Jarret:
            return 'jarret';
        case PieceCategory.PlatDeCote:
            return 'plat de côte';
        case PieceCategory.Queue:
            return 'queue';
        default:
          return '';
      }
    }
  
    static getPieceCategory(pieceCategoryValue: string): PieceCategory {
        const matchingPieceCategoryKeys = Object.keys(PieceCategory).filter(pieceCategory => PieceCategory[pieceCategory] == pieceCategoryValue);
        return matchingPieceCategoryKeys.length > 0 ? PieceCategory[matchingPieceCategoryKeys[0]] : null;
    }

  }
  