export class Visitor {
    visitorId: string;
    first_name: string;
    last_name: string;
    phone_number: string;

    email: string;

    constructor(obj: any = null) {
        if (obj != null) {
            Object.assign(this, obj);
        }
    }
}