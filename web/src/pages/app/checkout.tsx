// import { useCheckoutStore } from "@/store";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "@/types";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import { DetailStruct, IS_EMPTY, formatCfg, formatRoomCfg } from "../../utils";
import { useCheckoutStore } from "@/store-provider";
import useSWR from "swr";

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
