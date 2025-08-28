export interface Discount {
    ID: number;
    discount_name: string;
    discount_value: Float32Array;
    discount_type: string;
    validfrom: Date;
    validUntil: Date;
}