export enum Shaping {
    Roti = 'ROTI',
    Hachi = 'HACHI',
    SteakHache = 'STEAK_HACHE',
    Tranche = 'TRANCHE',
    GrosMorceaux = 'GROS_MORCEAUX',
    Undefined = 'UNDEFINED'
}
 
  export class ShapingUtils {
    static getShapingLabel(shaping: Shaping) {
      switch (shaping) {

        case Shaping.Roti:
            return 'roti';
        case Shaping.Hachi:
            return 'hachi';
        case Shaping.SteakHache:
            return 'steak haché';
        case Shaping.Tranche:
            return 'tranche (steack ou côte)';
        case Shaping.GrosMorceaux:
            return 'gros morceaux (bourguignon, pot-au-feu)';
        case Shaping.Undefined:
            return 'non défini';
        default:
          return '';
      }
    }

    static getShaping(shapingValue: string): Shaping {
        const matchingShapingKeys = Object.keys(Shaping).filter(shaping => Shaping[shaping] == shapingValue);
        return matchingShapingKeys.length > 0 ? Shaping[matchingShapingKeys[0]] : null;
    }
  
  }
  