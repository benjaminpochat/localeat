export enum Shaping {
    Roti = 'ROTI',
    Hachi = 'HACHI',
    SteakHache = 'STEAK_HACHE',
    Tranche = 'TRANCHE',            // steak ou côtes
    GrosMorceaux = 'GROS_MORCEAUX', //bourguignon ou pot-au-feu
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
            return 'tranche'; 
        case Shaping.GrosMorceaux:
            return 'gros morceaux';
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
  