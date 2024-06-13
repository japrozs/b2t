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
    FORMAT_GRAMMAR,
    SearchHotelStruct,
    getFacilitiesMap,
    sortAndFilterHotels,
} from "@/utils";
import { useIsAuth } from "@/utils/use-is-auth";
import { GrCheckmark } from "react-icons/gr";
import axios from "axios";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "sonner";
import { RoomCfgModal } from "@/components/modals/room-cfg-modal";
import { Checkbox } from "@headlessui/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface SearchProps {}

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
    const [open, setOpen] = useState(false);
    const [searchRoomCfg, setSearchRoomCfg] = useState<RoomCfgType>({
        rooms: [
            {
                adults: 1,
                children: [
                    {
                        age: 6,
                    },
                ],
            },
        ],
    });
    const [value, setValue] = useState({
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
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
    const [showTotalPrice, setShowTotalPrice] = useState(false);
    const [showPricePerNightPerRoom, setShowPricePerNightPerRoom] =
        useState(true);
    const [filterQuery, setFilterQuery] = useState("");
    const [sortFacilities, setSortFacilities] = useState<string[]>([]);
    const [enabled, setEnabled] = useState(false);

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
        setValue({
            startDate: struct.in,
            endDate: struct.out,
        });
        setSearchRoomCfg(struct.cfg);
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
        console.log(searchRoomCfg, struct.cfg);
        console.log(
            JSON.stringify(searchRoomCfg) === JSON.stringify(struct.cfg)
        );
    }, [searchRoomCfg]);

    useEffect(() => {
        console.log(sortFacilities);
    }, [sortFacilities]);

    const researchHotels = () => {
        const structCpy = { ...struct };
        structCpy.cfg = searchRoomCfg;
        structCpy.city = searchCity.value;
        structCpy.in = value.startDate;
        structCpy.out = value.endDate;
        setStruct(structCpy);
        fetchHotels(structCpy);
    };

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
                                                facilities: sortFacilities,
                                            }
                                        ).length
                                    }{" "}
                                    hotel results for you based on your search.
                                </p>
                                <hr className="bg-gray-900 my-4" />
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
                                        <Checkbox
                                            checked={sortFacilities.includes(
                                                key
                                            )}
                                            onChange={() => {
                                                const cpy = [...sortFacilities];
                                                if (cpy.includes(key)) {
                                                    cpy.splice(
                                                        cpy.indexOf(key),
                                                        1
                                                    );
                                                } else {
                                                    cpy.push(key);
                                                }
                                                setSortFacilities(cpy);
                                            }}
                                            className="mr-3 group size-[1.15rem] flex items-center justify-center rounded-md bg-white border border-gray-300 data-[checked]:border-gray-800 data-[checked]:bg-black"
                                        >
                                            <GrCheckmark className="hidden text-white text-xs self-center group-data-[checked]:block" />
                                        </Checkbox>
                                        <p className="text-md font-medium text-gray-700 break-normal">
                                            {key}
                                        </p>
                                        <p className="mx-1 bg-emerald-100 border border-green-500 text-emerald-700 font-medium text-xs px-[0.45rem] py-0.5 ml-2.5 rounded-full">
                                            {value as string}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-9/12 p-2.5">
                                <div className="flex items-end space-x-4 mb-7">
                                    <div className="w-full">
                                        <CityDropdown
                                            label="City"
                                            city={searchCity}
                                            setCity={setSearchCity}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <p className="text-gray-600 text-sm font-medium">
                                            Dates
                                        </p>
                                        <Datepicker
                                            primaryColor="blue"
                                            value={value}
                                            separator=" – "
                                            placeholder="DD-MM-YYYY to DD-MM-YYYY"
                                            displayFormat="DD-MM-YYYY"
                                            inputClassName={
                                                "outline-nonefocus:ring-1 datepicker-input"
                                            }
                                            toggleClassName={
                                                "absolute right-0 mt-0.5 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                            }
                                            minDate={
                                                // new Date(Date.now() - 24 * 60 * 60 * 1000)
                                                new Date(Date.now())
                                            }
                                            onChange={(val: any) => {
                                                if (
                                                    val.startDate ===
                                                    val.endDate
                                                ) {
                                                    toast.error(
                                                        "A stay of at least 1 night is required"
                                                    );
                                                    return;
                                                }
                                                console.log("val :: ", val);
                                                setValue(val);
                                            }}
                                        />
                                    </div>
                                    <div className="w-max pl-1 pr-5">
                                        <p className="text-gray-600 text-sm font-medium">
                                            Rooms & persons
                                        </p>
                                        <p
                                            onClick={() => setOpen(true)}
                                            className="border border-gray-300 mt-1.5 rounded-lg px-4 py-[0.30rem] text-black whitespace-nowrap g-sans cursor-pointer text-md font-medium"
                                        >
                                            {FORMAT_GRAMMAR(
                                                searchRoomCfg.rooms
                                                    .flatMap(
                                                        (room) =>
                                                            room.adults +
                                                            room.children.length
                                                    )
                                                    .reduce((a, b) => a + b),
                                                "person"
                                            )}{" "}
                                            –{" "}
                                            {FORMAT_GRAMMAR(
                                                searchRoomCfg.rooms.length,
                                                "room"
                                            )}
                                        </p>
                                    </div>
                                    <div className="">
                                        <button
                                            className={`g-sans items-center bg-[#00395D] text-[#00AEEF] hover:bg-opacity-[0.98] rounded-md py-2 px-10 whitespace-nowrap font-medium text-md w-full justify-center`}
                                            onClick={researchHotels}
                                        >
                                            Search
                                        </button>
                                    </div>
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
                                                facilities: sortFacilities,
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
            <RoomCfgModal
                open={open}
                setOpen={setOpen}
                roomConfig={searchRoomCfg}
                setRoomConfig={setSearchRoomCfg}
            />
        </div>
    );
};

export default Search;
