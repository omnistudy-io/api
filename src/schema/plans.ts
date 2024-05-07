export interface PlanSchema {
    id: number;
    level: number;
    name: string;
    price: number;
    monthly_price: number;
    annual_price: number;
    monthly_price_id: string;
    annual_price_id: string;
    description: string;
}

export interface PlansRows extends Array<PlanSchema> {};