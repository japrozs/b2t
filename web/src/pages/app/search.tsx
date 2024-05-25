import { HotelCard } from "@/components/cards/hotel-card";
import { Spinner } from "@/components/shared/spinner";
import {
    HotelDetailType,
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
} from "@/types";
import { SearchHotelStruct } from "@/utils";
import { useIsAuth } from "@/utils/use-is-auth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface SearchProps {}

// TODo: allow not to pick dates before today
const Search: React.FC<SearchProps> = ({}) => {
    useIsAuth();
    const router = useRouter();
    const [struct, setStruct] = useState<SearchHotelStruct | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hotels, setHotels] = useState<HotelSearchResult>({
        Hotels: {
            Hotel: [],
        },
    });
    useEffect(() => {
        setIsLoading(true);
        if (!router.isReady) return;

        const struct: SearchHotelStruct = {
            city: router.query.city as string,
            in: router.query.in as string,
            out: router.query.out as string,
            cfg: JSON.parse(router.query.cfg as string),
        };
        setStruct(struct);
    }, [router.isReady]);

    useEffect(() => {
        if (!struct) {
            return;
        }

        axios
            .post("/search-hotel", {
                city: struct.city,
                startDate: struct.in,
                endDate: struct.out,
                cfg: JSON.stringify(struct.cfg),
            })
            .then((response) => {
                if (JSON.stringify(response.data) !== JSON.stringify(hotels)) {
                    setHotels(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setIsLoading(false);
    }, [struct]);
    return (
        <div>
            {/* TODO: stop spinner and show error when there is a search error */}
            {isLoading || hotels.Hotels.Hotel.length === 0 ? (
                <div className="h-screen">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <div className="flex items-start max-w-6xl mx-auto">
                        <div className="bg-red-500 w-3/12 m-2.5 mx-0 p-2.5">
                            <p>hi there</p>
                        </div>
                        {/* https://foto.hrsstatic.com/fotos/0/2/269/213/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F6%2F8%2F6%2F4%2F%2Fteaser_686447.jpg/WYT98yP7mJCpeMkikrasbQ%3D%3D/134%2C106/6/Holiday_Inn_Express_LONDON_-_EXCEL-London-Aussenansicht-3-686447.jpg */}
                        <div className="w-9/12 p-2.5">
                            {hotels.Hotels.Hotel.map(
                                (hotel: HotelSearchItemType, idx: number) => (
                                    <HotelCard
                                        key={idx}
                                        hotel={hotel}
                                        cfg={struct?.cfg as RoomCfgType}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
