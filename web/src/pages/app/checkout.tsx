// import { useCheckoutStore } from "@/store";
import { useCheckoutStore } from "../../store/provider";
import {
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
    RoomDetailType,
} from "@/types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { IS_EMPTY, formatCfg, parseDate } from "../../utils";
import { useIsAuth } from "@/utils/use-is-auth";
import axios from "axios";
import { PersonDetailsCfg } from "@/components/ui/person-details-cfg";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";
import { IoLocationOutline } from "react-icons/io5";
import { COMMISSION_RATE } from "@/constants";

interface CheckoutProps {}
const Checkout: React.FC<CheckoutProps> = ({}) => {
    useIsAuth();
    // TODO: find a way to persist these between page refreshes
    const { hotel, room, cfg } = useCheckoutStore((state) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [latestHotel, setLatestHotel] = useState<HotelSearchResult>({
        Hotels: {
            Hotel: [],
        },
    });
    const [adultsData, setAdultsData] = useState<any[]>([]);
    const [childrenData, setChildrenData] = useState<any[]>([]);
    const router = useRouter();

    console.log("zustand.hotel :: ", hotel);
    console.log("zustand.room :: ", room);
    console.log("zustand.cfg :: ", cfg);

    const handleAdultDataChange = (
        data: any,
        roomIndex: number,
        adultIndex: number
    ) => {
        const updatedAdultsData = [...adultsData];
        if (!updatedAdultsData[roomIndex]) {
            updatedAdultsData[roomIndex] = [];
        }
        updatedAdultsData[roomIndex][adultIndex] = data;
        setAdultsData(updatedAdultsData);
    };

    const handleChildDataChange = (
        data: any,
        roomIndex: number,
        childIndex: number
    ) => {
        const updatedChildrenData = [...childrenData];
        if (!updatedChildrenData[roomIndex]) {
            updatedChildrenData[roomIndex] = [];
        }
        updatedChildrenData[roomIndex][childIndex] = data;
        setChildrenData(updatedChildrenData);
    };

    const createBooking = async () => {
        axios
            .post("/create-booking", {
                startDate: (hotel as HotelSearchItemType).StartDate,
                endDate: (hotel as HotelSearchItemType).EndDate,
                hotelCode: (hotel as HotelSearchItemType).HotelCode,
                RoomTypeCode: (room as RoomDetailType).RoomTypeCode,
                MealPlanCode: (room as RoomDetailType).MealPlanCode,
                ContractTokenId: (room as RoomDetailType).ContractTokenId,
                Rate: (room as RoomDetailType).Rate,
                adultsData,
                childrenData,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "OK") {
                    toast.success("Booking created successfully.");
                    router.push("/app/");
                } else {
                    toast.error("An error occured with your booking.");
                }
            })
            .catch((error) => {
                console.error("Error creating booking:", error);
            });
    };

    useEffect(() => {
        if (
            Object.keys(hotel).length === 0 ||
            Object.keys(room).length === 0 ||
            Object.keys(cfg).length === 0
        ) {
            return;
        }
        setIsLoading(true);
        axios
            .post("/check-availability", {
                city: (hotel as HotelSearchItemType).City,
                startDate: (hotel as HotelSearchItemType).StartDate,
                endDate: (hotel as HotelSearchItemType).EndDate,
                hotelCode: (hotel as HotelSearchItemType).HotelCode,
                RoomTypeCode: (room as RoomDetailType).RoomTypeCode,
                MealPlanCode: (room as RoomDetailType).MealPlanCode,
                ContractTokenId: (room as RoomDetailType).ContractTokenId,
                cfg: JSON.stringify(cfg),
            })
            .then((response) => {
                if (
                    JSON.stringify(response.data) !==
                    JSON.stringify(latestHotel)
                ) {
                    setLatestHotel(response.data);
                }
                console.log("check-avaiability response :: ", response);
            })
            .catch((error) => {
                console.error("Error fetching latest hotel price:", error);
            });
        setIsLoading(false);
    }, [hotel, room, cfg]);
    return (
        <div>
            {isLoading ||
            latestHotel.Hotels.Hotel.length === 0 ||
            latestHotel.ErrorMessage?.Error.Messages.length === 0 ? (
                <p>loading...</p>
            ) : (
                <div>
                    <div className="flex items-start max-w-7xl mx-auto space-x-10">
                        <div className="w-9/12 p-2.5">
                            <p className="text-2xl font-semibold my-3">
                                {latestHotel.Hotels.Hotel[0].HotelName}
                            </p>
                            <hr className="mt-1.5 mb-4" />
                            <p className="text-xl font-semibold mb-2.5">
                                Room details
                            </p>
                            {(cfg as RoomCfgType).rooms.map(
                                (room, roomIndex) => (
                                    <div key={roomIndex}>
                                        <p className="text-lg font-semibold">
                                            🏠 Room {roomIndex + 1}
                                        </p>
                                        {Array(room.adults)
                                            .fill(0)
                                            .map((_, adultIndex) => (
                                                <PersonDetailsCfg
                                                    key={`adult-${roomIndex}-${adultIndex}`}
                                                    personType="Adult"
                                                    personIndex={adultIndex}
                                                    onDataChange={(data) =>
                                                        handleAdultDataChange(
                                                            data,
                                                            roomIndex,
                                                            adultIndex
                                                        )
                                                    }
                                                />
                                            ))}
                                        {room.children.map((_, childIndex) => (
                                            <PersonDetailsCfg
                                                key={`child-${roomIndex}-${childIndex}`}
                                                personType="Child"
                                                personIndex={childIndex}
                                                onDataChange={(data) =>
                                                    handleChildDataChange(
                                                        data,
                                                        roomIndex,
                                                        childIndex
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                )
                            )}
                            <button
                                className="bg-purple-500 rounded-md py-2 px-3 text-white font-medium text-xs menlo"
                                onClick={createBooking}
                            >
                                submit
                            </button>
                        </div>
                        <div className="w-3/12 m-2.5 mx-0 p-2.5">
                            <p className="text-2xl font-semibold">
                                {latestHotel.Hotels.Hotel[0].HotelName}
                            </p>
                            <p className="flex items-center text-sm text-gray-500 font-medium">
                                <IoLocationOutline className="mr-1.5" />
                                {(
                                    hotel as HotelSearchItemType
                                ).details.Details[0].HotelAddress.split(",")
                                    .slice(0, 2)
                                    .join(", ") ||
                                    (hotel as HotelSearchItemType).Chain}
                            </p>
                            <div className="my-2 flex items-center">
                                <p className="text-sm text-blue-500 font-semibold">
                                    {
                                        parseDate(
                                            (
                                                hotel as HotelSearchItemType
                                            ).StartDate.toString()
                                        )
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </p>
                                <p className="ml-auto mr-0 text-sm text-blue-500 font-semibold">
                                    {
                                        parseDate(
                                            (
                                                hotel as HotelSearchItemType
                                            ).EndDate.toString()
                                        )
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                </p>
                            </div>
                            <div className="my-2 flex items-center">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Room & persons
                                    </p>
                                    <p className="text-sm text-purple-500 font-semibold">
                                        {(cfg as RoomCfgType).rooms.flatMap(
                                            (room) =>
                                                room.adults +
                                                room.children.length
                                        )}{" "}
                                        persons (
                                        {(cfg as RoomCfgType).rooms.length}{" "}
                                        rooms)
                                    </p>
                                </div>
                                <div className="ml-auto mr-0 text-right">
                                    <p className="text-sm text-gray-500 font-medium">
                                        Total price
                                    </p>
                                    <p className="text-sm text-purple-500 font-semibold">
                                        $
                                        {Math.round(
                                            (room as RoomDetailType).TotalRate *
                                                COMMISSION_RATE
                                        )}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <p className="text-right  text-2xl font-semibold my-1.5 py-1.5">
                                $
                                {Math.round(
                                    (room as RoomDetailType).TotalRate *
                                        COMMISSION_RATE
                                )}
                            </p>
                            {/* TODO: change this  */}
                            <p className="text-center text-xs px-2 text-gray-500 font-medium">
                                By making your booking you agree to the{" "}
                                <span className="underline font-semibold text-gray-700">
                                    HRS General Terms And Conditions
                                </span>{" "}
                                as well as the{" "}
                                <span className="underline font-semibold text-gray-700">
                                    HRS data protection policy
                                </span>
                                . With this click your booking becomes binding.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* {latestHotel.ErrorMessage?.Error.Messages.length != 0 && (
                <p>
                    errors – 
                    {latestHotel.ErrorMessage?.Error.Messages.join(", ")}
                </p>
            )} */}
        </div>
    );
};

export default Checkout;
