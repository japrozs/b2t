import { useCheckoutStore } from "@/store";
import React from "react";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
    const hotel = useCheckoutStore((state) => state.hotel);
    const roomID = useCheckoutStore((state) => state.roomId);
    console.log({ hotel, roomID });
    return (
        <div>
            <p>this is the checkout page. like it or not, idc</p>
        </div>
    );
};

export default Checkout;
