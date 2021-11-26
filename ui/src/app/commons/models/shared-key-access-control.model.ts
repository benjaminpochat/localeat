import { SharedDeliveryAccessKey } from "./shared-delivery-access-key.model";

export class SharedKeyDeliveryAccessControl {
    constructor(key: string) {
        this.sharedKey = new SharedDeliveryAccessKey(key);
    }

    id: number;
    sharedKey: SharedDeliveryAccessKey;
    type = 'SharedKey';
}