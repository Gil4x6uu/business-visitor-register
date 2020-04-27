import { Visitor } from './visitor';

export class Store {
    
    id: number;
    name: string;
    //visitors: Visitor[];


    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
        
    }
}