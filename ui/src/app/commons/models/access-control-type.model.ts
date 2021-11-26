import { PublicDeliveryAccessControl } from "./public-delivery-access-control.model";
import { SharedKeyDeliveryAccessControl } from "./shared-key-access-control.model";

export enum AccessControlType {
    Public = 'PUBLIC',
    SharedKey = 'SHARED_KEY'
  }
  
  export class AccessControlTypeUtils {
    static getAccessControlTypeLabel(accessControlType: AccessControlType): string {
      switch (accessControlType) {
        case AccessControlType.Public:
          return 'Accès libre';
        case AccessControlType.SharedKey:
          return 'Code d\'accès partagé';
        default:
          return '';
      }
    }
  
    static getAccessControlTypeDetails(accessControlType: AccessControlType): string {
        switch (accessControlType) {
          case AccessControlType.Public:
            return 'Tout internaute peut commander.';
          case AccessControlType.SharedKey:
            return 'Seuls les internautes qui connaissent le code d\'accès peuvent commander.';
          default:
            return '';
        }
      }
    
    static getAccessControlBuilder(accessControlType: AccessControlType) {
        switch (accessControlType) {
            case AccessControlType.Public: 
                return () => new PublicDeliveryAccessControl();
            case AccessControlType.SharedKey:
                return (key: string) => new SharedKeyDeliveryAccessControl(key);
            default:
                return () => null;
        }
    }

  }
  