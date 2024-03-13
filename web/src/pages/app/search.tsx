import { HotelCard } from "@/components/cards/hotel-card";
import {
    RegularHotelFragment,
    useGetCitiesQuery,
    useGetCityQuery,
} from "@/generated/graphql";
import { StoreState, useCheckoutStore } from "@/store";
import {
    HotelItemType,
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
} from "@/types";
import { SearchHotelStruct, formatRoomCfg, useSearchHotels } from "@/utils";
import { useIsAuth } from "@/utils/use-is-auth";
import Axios from "axios";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useStore } from "zustand";

interface SearchProps {
    message: string;
}

const Search: React.FC<SearchProps> = ({ message }) => {
    useIsAuth();
    const router = useRouter();
    const [struct, setStruct] = useState<SearchHotelStruct | undefined>(
        undefined
    );

    useEffect(() => {
        if (!router.isReady) return;

        const struct: SearchHotelStruct = {
            city: router.query.city as string,
            in: router.query.in as string,
            out: router.query.out as string,
            cfg: JSON.parse(router.query.cfg as string),
        };
        // console.log(struct);
        setStruct(struct);
    }, [router.isReady]);

    const { data, loading } = useGetCityQuery({
        variables: {
            code: struct?.city || "",
        },
    });

    // console.log(data);
    console.log(
        "hotelcodes :: ",
        data?.getCity.hotels.map((hotel) => hotel.code).join(", ")
    );
    // TODO: show text saying no availabilities found if we get an error
    const { data: hotels, isLoading: hotelsLoading } =
        useSWR<HotelSearchResult>(
            // TODO: pass the config struct instead of hard-coded values
            `/search-hotel?cfg=${JSON.stringify(
                struct?.cfg
            )}&checkinDate=${struct?.in.replaceAll(
                "-",
                ""
            )}&checkoutDate=${struct?.out.replaceAll(
                "-",
                ""
            )}&hotelCodes=${data?.getCity.hotels
                .map((hotel) => hotel.code)
                .join(",")}&city=${struct?.city}`
        );
    // console.log(hotels);

    return (
        <>
            {loading || hotelsLoading ? (
                <p>loading....</p>
            ) : (
                <div>
                    <div className="flex items-start max-w-6xl mx-auto">
                        <div className="bg-red-500 w-3/12 m-2.5 mx-0 p-2.5">
                            <p>hi there</p>
                        </div>
                        {/* https://foto.hrsstatic.com/fotos/0/2/269/213/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F6%2F8%2F6%2F4%2F%2Fteaser_686447.jpg/WYT98yP7mJCpeMkikrasbQ%3D%3D/134%2C106/6/Holiday_Inn_Express_LONDON_-_EXCEL-London-Aussenansicht-3-686447.jpg */}
                        <div className="w-9/12 p-2.5">
                            {hotels?.Hotels.Hotel.map(
                                (hotel: HotelSearchItemType, idx: number) => (
                                    <HotelCard
                                        key={idx}
                                        hotel={hotel}
                                        infoStruct={struct as SearchHotelStruct}
                                        hotelStruct={
                                            data?.getCity.hotels.filter(
                                                (h: RegularHotelFragment) =>
                                                    h.code === hotel.HotelCode
                                            )[0]
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
