import { Visitor } from './visitor';

export class StoreOwner {
    _id: number;
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    store_name: string;
    visitors: Visitor[];
}