import { Visitor } from './visitor';

export class Store {
    
    _id: number;
    id: number;
    name: string;
    visitors: Visitor[];


    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
        
    }
}