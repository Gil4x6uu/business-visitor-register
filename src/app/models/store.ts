import { Visitor } from './visitor';

export class Store {
    
    guid: string;
    storeUid: string;

    storename: string;
    
    visitors: Visitor[];


    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
        
    }
    addVisitor(visitor: Visitor): void {
             this.visitors.push(visitor);
    }
}