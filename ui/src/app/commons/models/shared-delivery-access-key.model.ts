export class SharedDeliveryAccessKey{
    constructor (key: string) {
        this.key = key;
    }
    
    id: number;
    key: string;
    type = 'Shared';
}