// import { useCheckoutStore } from "@/store";
import { useCheckoutStore } from "@/store-provider";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "@/types";
import React from "react";
import useSWR from "swr";
import { IS_EMPTY, formatCfg } from "../../utils";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = ({}) => {
    const { hotel, room, cfg } = useCheckoutStore((state) => state);
    if (!IS_EMPTY(hotel, room, cfg)) {
        // FIXIT: do something here
    }

    // validateAvailability(
    //     hotel as HotelSearchItemType,
    //     room as RoomDetailType,
    //     cfg as RoomCfgType
    // );

    console.log("zustand.hotel :: ", hotel);
    console.log("zustand.room :: ", room);
    console.log("zustand.cfg :: ", cfg);
    const { data, isLoading } = useSWR(
        `/get-latest-price?cfg=${JSON.stringify(
            formatCfg(cfg as RoomCfgType, room as RoomDetailType)
        )}&startDate=${(hotel as HotelSearchItemType).StartDate}&endDate=${
            (hotel as HotelSearchItemType).EndDate
        }&hotelCode=${(hotel as HotelSearchItemType).HotelCode}`
    );
    console.log(data, isLoading);
    return (
        <div>
            <p>this is the checkout page. like it or not, idc</p>
        </div>
    );
};

export default Checkout;
