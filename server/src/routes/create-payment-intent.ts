import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
    apiVersion: "2024-06-20",
});

export const createPaymentIntent = async (req: Request, res: Response) => {
    // TODO: use zod to enforce this schema
    const { amount } = req.body;
    console.log("req.body :: ", req.body);
    try {
        const intent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100, // stripe only works in cents
            currency: "USD",
        });
        return res.status(200).json({
            client_secret: intent.client_secret,
        });
    } catch (error: any) {
        return res.status(400).json({
            error,
        });
    }
};

export const pay = async (req: Request, res: Response) => {
    const { paymentMethodId, amount } = req.body;
    try {
        const intent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method: paymentMethodId,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
            confirm: true, // Confirm the payment immediately
            description: "Export of software services",
            shipping: {
                name: "John Doe",
                address: {
                    line1: "123 Main St",
                    city: "San Francisco",
                    state: "CA",
                    postal_code: "94111",
                    country: "US",
                },
            },
        });

        res.json({ intent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
