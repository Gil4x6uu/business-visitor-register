export class Visitor {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    time: string;

    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}