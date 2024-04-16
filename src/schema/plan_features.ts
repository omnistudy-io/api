export interface PlanFeatureSchema {
    id: number,
    plan_id: number,
    description: string,
    tag: string,
    included: boolean
}

export interface PlanFeaturesRows extends Array<PlanFeatureSchema> {};