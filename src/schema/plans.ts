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
    features: Array<PlanFeatureSchema>;
}

export interface PlanFeatureSchema {
    id: number;
    description: string;
    tags: string;
    included: boolean;
}

export interface PlansRows extends Array<PlanSchema> {};