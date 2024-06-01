import { HotelCard } from "@/components/cards/hotel-card";
import { Spinner } from "@/components/shared/spinner";
import { CityDropdown } from "@/components/ui/city-dropdown";
import { Navbar } from "@/components/shared/navbar";
import { Pill } from "@/components/ui/pill";
import { SearchPill } from "@/components/ui/search-pill";
import {
    HotelDetailType,
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
} from "@/types";
import {
    SearchHotelStruct,
    getFacilitiesMap,
    sortAndFilterHotels,
} from "@/utils";
import { useIsAuth } from "@/utils/use-is-auth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

interface SearchProps {}

// TODo: allow not to pick dates before today
const Search: React.FC<SearchProps> = ({}) => {
    useIsAuth();
    const router = useRouter();
    const [searchCity, setSearchCity] = useState<{
        value: string;
        label: string;
    }>({
        value: "",
        label: "",
    });
    const [struct, setStruct] = useState<SearchHotelStruct>({
        city: "",
        in: "",
        out: "",
        cfg: {
            rooms: [],
        },
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hotels, setHotels] = useState<HotelSearchResult>({
        Hotels: {
            Hotel: [],
        },
    });
    const [sortByPrice, setSortByPrice] = useState(true);
    const [sortByPriceOrder, setSortByPriceOrder] = useState("L2H");
    const [sortByRating, setSortByRating] = useState(false);
    const [sortByRatingOrder, setSortByRatingOrder] = useState("H2L");
    const [showTotalPrice, setShowTotalPrice] = useState(true);
    const [showPricePerNightPerRoom, setShowPricePerNightPerRoom] =
        useState(false);
    const [filterQuery, setFilterQuery] = useState("");

    useEffect(() => {
        if (!router.isReady) return;

        const query = router.query;
        const struct: SearchHotelStruct = {
            city: (query.city as string) || "",
            in: (query.in as string) || "",
            out: (query.out as string) || "",
            cfg: JSON.parse((query.cfg as string) || "[]"),
        };

        setSearchCity({
            value: struct.city,
            label: (query.name as string) || "",
        });
        setStruct(struct);
        fetchHotels(struct);
    }, [router.isReady]);

    const fetchHotels = async (struct: SearchHotelStruct) => {
        setIsLoading(true);
        try {
            const response = await axios.post("/search-hotel", {
                city: struct.city,
                startDate: struct.in,
                endDate: struct.out,
                cfg: JSON.stringify(struct.cfg),
            });
            setHotels(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchCity.value === struct?.city) {
            return;
        }
        const structCpy = { ...struct };
        structCpy.city = searchCity.value;
        setStruct(structCpy);
        fetchHotels(structCpy);
    }, [searchCity]);

    console.log(getFacilitiesMap(hotels.Hotels.Hotel));
    return (
        <div>
            {/* STICKY OR NOT? – <Navbar sticky /> */}
            <Navbar />
            {isLoading ||
            (hotels.Hotels.Hotel.length === 0 &&
                hotels.ErrorMessage?.Error.Messages.length === 0) ? (
                <div className="h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div>
                        {/* TODO: stop spinner and show error when there is a search error */}
                        <div className="mt-5 space-x-5 flex items-start max-w-[76rem] mx-auto">
                            {/* Rest of the component... */}
                            {/* <div className="w-3/12 m-2.5 mx-0 py-3 px-4 bg-gray-50 rounded"> */}
                            <div className="w-3/12 m-2.5 mx-0 ">
                                <p className="text-2xl font-semibold">
                                    Filter results
                                </p>
                                <p className="mt-1 mb-3 text-sm font-medium text-gray-500">
                                    We have found{" "}
                                    {
                                        sortAndFilterHotels(
                                            hotels.Hotels.Hotel,
                                            {
                                                price: sortByPrice,
                                                priceSortOrder:
                                                    sortByPriceOrder,
                                                ratings: sortByRating,
                                                ratingSortOrder:
                                                    sortByRatingOrder,
                                                query: filterQuery,
                                            }
                                        ).length
                                    }{" "}
                                    hotel results for you based on your search.
                                </p>
                                <hr className="bg-gray-900 my-4" />
                                {/* <p className="font-semibold text-md">
                                    Price display
                                </p>
                                <div className="mt-2 flex flex-wrap space-x-2.5 items-center">
                                    <Pill
                                        colored={showPricePerNightPerRoom}
                                        className="cursor-pointer"
                                        bgAndBorderColor="border-pink-500 bg-pink-200"
                                        textColor="text-pink-700"
                                        label="Price per night/room"
                                        onClick={() => {
                                            setShowPricePerNightPerRoom(true);
                                            setShowTotalPrice(false);
                                        }}
                                    />
                                    <Pill
                                        colored={showTotalPrice}
                                        className="cursor-pointer"
                                        bgAndBorderColor="border-pink-500 bg-pink-200"
                                        textColor="text-pink-700"
                                        label="Total price"
                                        onClick={() => {
                                            setShowPricePerNightPerRoom(false);
                                            setShowTotalPrice(true);
                                        }}
                                    />
                                </div> 
                                <hr className="bg-gray-900 my-4" />
                                */}
                                <p className="font-semibold text-base">
                                    Filter by hotel/chain
                                </p>
                                <input
                                    value={filterQuery}
                                    onChange={(e) =>
                                        setFilterQuery(e.target.value)
                                    }
                                    className={`font-medium w-full text-gray-700 shadow-sm transition-all text-smol border placeholder-gray-300 py-1 px-3 mt-2 mb-1.5 bg-white rounded-md outline-none focus:ring-2 focus:ring-border-blue-100`}
                                    placeholder={"Schrute Farms"}
                                />
                                <hr className="bg-gray-900 my-4" />
                                <p className="font-semibold text-base mb-2">
                                    Popular filters
                                </p>
                                {Object.entries(
                                    getFacilitiesMap(hotels.Hotels.Hotel)
                                ).map(([key, value], idx: number) => (
                                    <div
                                        key={idx}
                                        className="my-4 flex items-center"
                                    >
                                        <p className="text-md font-medium text-gray-700 break-normal">
                                            {key}
                                        </p>
                                        <p className="mx-1 bg-green-100 border border-green-500 text-green-700 font-medium text-xs px-[0.45rem] py-0.5 ml-2.5 rounded-full">
                                            {value as string}
                                        </p>
                                        <input
                                            className="ml-auto mr-0 fill-purple-500"
                                            type="checkbox"
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* https://foto.hrsstatic.com/fotos/0/2/269/213/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F6%2F8%2F6%2F4%2F%2Fteaser_686447.jpg/WYT98yP7mJCpeMkikrasbQ%3D%3D/134%2C106/6/Holiday_Inn_Express_LONDON_-_EXCEL-London-Aussenansicht-3-686447.jpg */}
                            <div className="w-9/12 p-2.5">
                                <div className="flex items-center space-x-4">
                                    <input
                                        className="border border-gray-200 rounded-md text-sm py-1 px-2"
                                        value={struct?.in}
                                        type="date"
                                        onChange={(e) => {
                                            const structCpy = { ...struct };
                                            structCpy.in = e.target
                                                .value as string;
                                            setStruct(
                                                structCpy as SearchHotelStruct
                                            );
                                        }}
                                        placeholder="check-in date"
                                    />
                                    <input
                                        className="border border-gray-200 rounded-md text-sm py-0.5 px-1"
                                        value={struct?.out}
                                        type="date"
                                        onChange={(e) => {
                                            const structCpy = { ...struct };
                                            structCpy.out = e.target
                                                .value as string;
                                            setStruct(
                                                structCpy as SearchHotelStruct
                                            );
                                        }}
                                        placeholder="check-out date"
                                    />
                                    <CityDropdown
                                        city={searchCity}
                                        setCity={setSearchCity}
                                    />
                                </div>
                                <div className="my-4 flex items-center">
                                    <div className="flex items-center space-x-3">
                                        <p className="font-medium text-sm">
                                            Sort by:{" "}
                                        </p>
                                        <SearchPill
                                            label="Price"
                                            options={{
                                                H2L: "(High to Low)",
                                                L2H: "(Low to High)",
                                            }}
                                            optionState={sortByPriceOrder}
                                            optionSetState={setSortByPriceOrder}
                                            state={sortByPrice}
                                            setState={setSortByPrice}
                                        />
                                        <SearchPill
                                            options={{
                                                H2L: "(High to Low)",
                                                L2H: "(Low to High)",
                                            }}
                                            label="Rating"
                                            optionState={sortByRatingOrder}
                                            optionSetState={
                                                setSortByRatingOrder
                                            }
                                            state={sortByRating}
                                            setState={setSortByRating}
                                        />
                                    </div>
                                    <div className="ml-auto mr-0 flex flex-wrap space-x-2.5 items-center">
                                        <Pill
                                            colored={showPricePerNightPerRoom}
                                            className="cursor-pointer"
                                            bgAndBorderColor="border-pink-500 bg-pink-200"
                                            textColor="text-pink-700"
                                            label="Price per night/room"
                                            onClick={() => {
                                                setShowPricePerNightPerRoom(
                                                    true
                                                );
                                                setShowTotalPrice(false);
                                            }}
                                        />
                                        <Pill
                                            colored={showTotalPrice}
                                            className="cursor-pointer"
                                            bgAndBorderColor="border-pink-500 bg-pink-200"
                                            textColor="text-pink-700"
                                            label="Total price"
                                            onClick={() => {
                                                setShowPricePerNightPerRoom(
                                                    false
                                                );
                                                setShowTotalPrice(true);
                                            }}
                                        />
                                    </div>
                                </div>
                                {!hotels.ErrorMessage ? (
                                    <>
                                        {sortAndFilterHotels(
                                            hotels.Hotels.Hotel,
                                            {
                                                price: sortByPrice,
                                                priceSortOrder:
                                                    sortByPriceOrder,
                                                ratings: sortByRating,
                                                ratingSortOrder:
                                                    sortByRatingOrder,
                                                query: filterQuery,
                                            }
                                        ).map(
                                            (
                                                hotel: HotelSearchItemType,
                                                idx: number
                                            ) => (
                                                <HotelCard
                                                    key={idx}
                                                    hotel={hotel}
                                                    cfg={
                                                        struct?.cfg as RoomCfgType
                                                    }
                                                    showPricePerNightPerRoom={
                                                        showPricePerNightPerRoom
                                                    }
                                                />
                                            )
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            an error occured –{" "}
                                            {
                                                hotels.ErrorMessage?.Error
                                                    .Messages[0]
                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
