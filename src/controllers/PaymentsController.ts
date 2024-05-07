import { PlanSchema } from "../schema";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

// Create a controller
const express = require('express');
const PaymentsController = express();

// Add middleware to parse JSON
PaymentsController.use(express.json());


// -- Might not use this
PaymentsController.post("/charge", async (req, res) => {
    const { amount, token } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: 'Test Charge'
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});


/**
 * POST /intent
 * @summary Create a payment intent
 * @returns code: number, message: string | object, clientSecret: string
 */
PaymentsController.post("/intent", async (req, res) => {
    // Parse body
    const { amount, currency } = req.body;

    // Validate amount
    if(!amount) 
        return res.status(400).json({ code: 400, message: 'Amount is required', clientSecret: null });
    if(isNaN(amount) || amount < 50)
        return res.status(400).json({ code: 400, message: 'Invalid amount provided', clientSecret: null });

    // Validate currency
    if(!currency) 
        return res.status(400).json({ code: 400, message: 'Currency is required', clientSecret: null });
    if(currency !== 'usd')
        return res.status(400).json({ code: 400, message: 'Invalid currency provided', clientSecret: null });

    // Create payment intent
    try {
        const intent = await stripe.paymentIntents.create({
            amount: 149,
            currency: 'usd'
        });
        res.status(200).json({ code: 200, message: 'Payment intent created', clientSecret: intent.client_secret });
    } 
    // Handle errors
    catch(err) {
        console.error(err);
        res.status(500).json({ code: 500, message: err, clientSecret: null });
    }
});


PaymentsController.post("/subscription", async (req, res) => {
    const user = req.user;
    const plan: PlanSchema = req.body.plan;

    const customer = await stripe.customers.create({
        name: user.name,
        email: "info@omnistudy.io",
        payment_method: req.body.paymentMethod,
        invoice_settings: {
            default_payment_method: req.body.paymentMethod
        }
    });

    const priceType = req.body.type;
    const priceId = priceType === 'monthly' ? plan.monthly_price_id : plan.annual_price_id;
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_settings: {
            payment_method_options: {
                card: {
                    request_three_d_secure: 'any'
                }
            },
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent']
    });

    res.status(200).json({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id
    });
});


/**
 * POST /webhook
 * @summary Handle stripe webhooks
 * @returns code: number, message: string | object, received: boolean
 */
PaymentsController.post("/webhook", async (req, res) => {
    // Parse and validate stripe signature
    const sig = req.headers['stripe-signature'];
    if(!sig)
        return res.status(400).json({ code: 400, message: 'No signature provided', received: false });

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_KEY);
    }
    catch(err) {
        return res.status(500).json({ code: 500, message: err.raw.message, received: false });
    }

    switch(event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful');
            break;
        default:
            console.log('Unhandled event type');
    }

    res.status(200).json({ code: 200, message: 'Webhook received', received: true })
});


// Export the controller
export default PaymentsController;