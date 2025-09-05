import type { Addonservice } from "./addonservice";
import type { Billableitem } from "./billableitem";
import type { Employer } from "./employer";

export interface Order {
    ID: number;
    order_name: string;
    description: string;
    order_date: string;
    amount: Float32Array;
    service_start_date: Date;
    service_end_date: Date;
    add_on_service_id: number;
    add_on_service?: Addonservice;
    employer_id: number;
    employer?: Employer;
    bill_able_item_id: number;
    bill_able_item?: Billableitem;
}