import { PlansModel } from '../models/Plans';


// Create the controller
const PlansController = require('express')();


/**
 * GET /
 * @summary Get a list of all plans
 * @returns code: number, message: string, plans: PlanSchema
 */
PlansController.get('/', async (req, res) => {
    const data = await PlansModel.getAll();
    for(let i = 0; i < data.plans.length; i++) {
        const plan = data.plans[i];
        const planFeatures = await PlansModel.getFeatures(plan.id);
        data.plans[i]['features'] = planFeatures.features;
    }

    res.status(data.code).json(data);
});


/**
 * GET /:id
 * @summary Get a plan by its id
 * @param id The id of the plan
 * @returns code: number, message: string, plan: PlanSchema
 */
PlansController.get('/:id', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id) || id < 1)
        return res.status(400).json({ code: 400, message: "Invalid plan id", plan: null });

    const plan = await PlansModel.getById(id);
    res.status(plan.code).json(plan);
});


/**
 * GET /:id/features
 * @summary Get a plan's features by its id
 * @param id The id of the plan
 * @returns code: number, message: string, features: PlanFeatureSchema
 */
PlansController.get('/:id/features', async (req, res) => {
    const id = req.params.id;
    if(isNaN(id) || id < 1)
        return res.status(400).json({ code: 400, message: "Invalid plan id", features: null });

    const features = await PlansModel.getFeatures(id);
    res.status(features.code).json(features);
});


// Export the controller
export default PlansController;