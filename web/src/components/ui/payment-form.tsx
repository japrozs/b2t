import React, { useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useElements,
    useStripe,
    CardElement,
} from "@stripe/react-stripe-js";
import { PaymentIntent, StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "sonner";

interface PaymentFormProps {
    clientSecret: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const cardElement = elements?.getElement("card");
        try {
            if (!stripe || !elements) return null;

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement as StripeCardElement,
            });

            if (error) {
                console.log("stripe error :: ", error);
            } else {
                console.log("stripe paymentMethod :: ", paymentMethod);
            }

            axios
                .post("/pay", {
                    amount: 6999,
                    paymentMethodId: paymentMethod?.id,
                })
                .then((res) => {
                    if (res.data.error) {
                        toast.error(res.data.error);
                        return;
                    }

                    const intent: PaymentIntent = res.data.intent;
                    switch (res.data.intent.status) {
                        case "requires_action":
                            // 3D Secure is required, redirect the customer
                            stripe
                                .confirmCardPayment(
                                    intent.client_secret as string
                                )
                                .then(function (result) {
                                    if (result.error) {
                                        // Handle error
                                        console.error(
                                            "stripe.confirmCardPayment error :: ",
                                            result.error
                                        );
                                    } else {
                                        // Payment succeeded
                                        console.log(
                                            "payment succeeded :: intent -> ",
                                            intent
                                        );
                                    }
                                });
                            break;
                        case "requires_payment_method":
                            // The 3D Secure authentication failed or was incomplete
                            console.log(
                                "requires_payment_method :: The authentication was not completed. Please try again."
                            );
                            // Optionally, allow the user to try a different payment method
                            break;
                        case "succeeded":
                            console.log(
                                "payment succeeded :: intent -> ",
                                intent
                            );
                            break;
                        default:
                            console.log("Unexpected status", intent.status);
                    }
                })
                .catch((e) => {
                    console.error("Error fetching /api/pay :", e);
                });

            // if (
            //     error.type === "card_error" ||
            //     error.type === "validation_error"
            // ) {
            //     console.log("stripe error :: ", error.message);
            // } else {
            //     console.log("stripe error :: An unexpected error occured.");
            // }
        } catch (err) {
            console.log("payment-form error -> ", err);
        }
        setLoading(false);
    };
    return (
        <form id="payment-form" onSubmit={onSubmit}>
            {/* <LinkAuthenticationElement
                id="link-authentication-element"
                // Access the email value like so:
                // onChange={(event) => {
                //  setEmail(event.value.email);
                // }}
                
                // Prefill the email field like so:
                // options={{defaultValues: {email: 'foo@bar.com'}}}
            /> */}
            {/* <PaymentElement id="payment-element" /> */}
            <CardElement />
            <div className="flex items-center mt-5">
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex g-sans items-center ml-auto mr-0 mb-7 ${
                        loading
                            ? "cursor-not-allowed bg-gray-200 text-gray-400"
                            : "bg-[#00395D] text-[#00AEEF] hover:bg-opacity-[0.98]"
                    } rounded-md py-2 px-10 font-medium text-md w-full justify-center`}
                >
                    Pay $170
                </button>
            </div>
            {/* <button type="submit">Submit</button> */}
        </form>
    );
};
