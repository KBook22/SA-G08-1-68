import type { Billableitem } from "./billableitem";
import type { Paymentmethod } from "./paymentmethod";
import type { Paymentreport } from "./paymentreport";
import type { Status } from "./payment_status";

export interface Payment {
    ID: number;
    bill_able_item_id: number;
    bill_able_item?: Billableitem;
    proof_of_payment: string;
    amount: Float64Array;
    datetime: Date;
    payment_method_id: number;
    payment_method?: Paymentmethod;
    status_id: number;
    status?: Status;
    payment_report_id: number;
    payment_report?: Paymentreport;
}