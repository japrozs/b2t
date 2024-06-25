// import { useCheckoutStore } from "@/store";
import { useCheckoutStore } from "../../store/provider";
import {
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
    RoomDetailType,
} from "@/types";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import useSWR from "swr";
import {
    FORMAT_GRAMMAR,
    IS_EMPTY,
    formatCfg,
    getPricePerNightPerRoom,
    getPricePerNightPerRoomCheckout,
    getRRPPricePerNightPerRoom,
    getRRPTotalPrice,
    getTotalPrice,
    getTotalPriceCheckout,
    nightsBetween,
    parseDate,
    submitButtonDisabledFn,
} from "../../utils";
import Select from "react-select";
import { useIsAuth } from "@/utils/use-is-auth";
import axios from "axios";
import { PersonDetailsCfg } from "@/components/ui/person-details-cfg";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";
import { IoLocationOutline } from "react-icons/io5";
import { COMMISSION_RATE } from "@/constants";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCheck } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { Spinner } from "@/components/shared/spinner";
import { Checkbox } from "@headlessui/react";
import { GrCheckmark } from "react-icons/gr";
import { Hotel } from "@/generated/graphql";
import moment from "moment";

interface CheckoutProps {}
const Checkout: React.FC<CheckoutProps> = ({}) => {
    useIsAuth();
    const { hotel, room, cfg } = useCheckoutStore((state) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [createBookingLoading, setCreateBookingLoading] = useState(false);
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
        console.log(childrenData, adultsData);
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
        console.log(childrenData, adultsData);
    };

    const createBooking = () => {
        setCreateBookingLoading(true);
        console.log("create.booking.loading – ", createBookingLoading);
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
                    router.push("/app/bookings");
                } else {
                    if (response.data.error.Errors.Error.length === 0) {
                        toast.error("An error occured with your booking.");
                    } else {
                        toast.error(
                            `An error occured with your booking (${response.data.error.Errors.Error[0].Msg})`
                        );
                    }
                }
                setCreateBookingLoading(false);
            })
            .catch((error) => {
                console.error("Error creating booking:", error);
                setCreateBookingLoading(false);
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
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching latest hotel price:", error);
                setIsLoading(false);
            });
    }, [hotel, room, cfg]);

    return (
        <div>
            <Navbar />
            {isLoading ||
            (latestHotel.ErrorMessage?.Error.Messages.length as any) > 0 ||
            latestHotel.Hotels.Hotel.length === 0 ? (
                <div className="h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className="mt-3 mb-10">
                    <div className="flex items-start max-w-[76rem] mx-auto space-x-10">
                        <div className="w-9/12 p-2.5">
                            {/* <p className="text-2xl font-semibold my-3">
                                {latestHotel.Hotels.Hotel[0].HotelName}
                            </p>
                            <hr className="mt-1.5 mb-4" /> */}
                            <p className="text-2xl font-semibold mb-0">
                                Room details
                            </p>
                            {(cfg as RoomCfgType).rooms.map(
                                (cfgRoom, roomIndex) => (
                                    <div
                                        key={roomIndex}
                                        className="bg-gray-50 border border-gray-200 p-5 rounded-lg mt-3  mb-5"
                                    >
                                        <p className="text-lg font-medium g-sans">
                                            {(room as RoomDetailType).RoomType}{" "}
                                            –{" "}
                                            <span className="text-gray-500 font-normal text-md">
                                                {FORMAT_GRAMMAR(
                                                    cfgRoom.adults,
                                                    "adult"
                                                )}{" "}
                                                &{" "}
                                                {FORMAT_GRAMMAR(
                                                    cfgRoom.adults,
                                                    "child",
                                                    "children"
                                                )}
                                            </span>
                                        </p>
                                        <hr className="mt-2 mb-3" />
                                        <div className="bg-blue-50 border border-blue-400 rounded-lg py-2 px-3 mb-2">
                                            <div className="flex items-center mb-1">
                                                {(
                                                    room as RoomDetailType
                                                ).MealPlan.toLowerCase() ===
                                                "breakfast" ? (
                                                    <>
                                                        <MdOutlineCheck className="text-lg text-emerald-600 mr-1.5" />
                                                        <p className="text-sm text-gray-800 font-medium">
                                                            Breakfast included
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <RxCross2 className="text-lg text-red-500 mr-1.5" />
                                                        <p className="text-sm text-gray-800 font-medium">
                                                            Breakfast not
                                                            included (Room only)
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            {(room as RoomDetailType)
                                                .NonRefundable === "N" ? (
                                                <div className="flex items-center mt-0">
                                                    <MdOutlineCheck className="text-md mr-2 text-emerald-600" />
                                                    <p className="flex items-center font-medium text-sm text-emerald-600">
                                                        Free cancellation before{" "}
                                                        {moment(
                                                            parseDate(
                                                                (
                                                                    room as RoomDetailType
                                                                ).CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                            )
                                                        ).format(
                                                            "D MMMM, YYYY"
                                                        )}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex items-center mt-0">
                                                    <span className="ml-1 mr-3">
                                                        •
                                                    </span>
                                                    <p className="font-medium text-gray-700 text-sm">
                                                        Non-refundable
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {Array(cfgRoom.adults)
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
                                        {cfgRoom.children.map(
                                            (child, childIndex) => (
                                                <PersonDetailsCfg
                                                    key={`child-${roomIndex}-${childIndex}`}
                                                    personType="Child"
                                                    personIndex={childIndex}
                                                    childAge={child.age}
                                                    onDataChange={(data) =>
                                                        handleChildDataChange(
                                                            data,
                                                            roomIndex,
                                                            childIndex
                                                        )
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                )
                            )}
                            <hr className="my-3" />
                            <p className="text-2xl font-semibold mb-4">
                                Credit card
                            </p>
                            <p className="text-sm text-gray-400 menlo">
                                {"<-- PUT THE STRIPE STUFF HERE -->"}
                            </p>
                            {/* <div className="flex items-start">
                                <Checkbox
                                    checked={TandC}
                                    onChange={() => setTandC(!TandC)}
                                    className="mr-3 group size-[1.15rem] flex items-center justify-center rounded-md bg-white border border-gray-300 data-[checked]:border-gray-800 data-[checked]:bg-black"
                                >
                                    <GrCheckmark className="hidden text-white text-xs self-center group-data-[checked]:block" />
                                </Checkbox>
                                <p className="text-sm font-medium text-gray-700">

                                </p>
                            </div> */}
                        </div>
                        <div className="w-3/12 m-2.5 mx-0 py-2.5 sticky top-0">
                            <p className="text-2xl font-semibold">
                                {latestHotel.Hotels.Hotel[0].HotelName}
                            </p>
                            <p className="mt-1.5 flex items-center text-sm text-gray-500 font-medium">
                                <IoLocationOutline className="mr-1.5" />
                                {latestHotel.Hotels.Hotel[0].details.Details[0].HotelAddress.split(
                                    ","
                                )
                                    .slice(0, 2)
                                    .join(", ") ||
                                    latestHotel.Hotels.Hotel[0].Chain}
                            </p>
                            <hr className="pb-0 my-2" />
                            <div className="mt-3 mb-1 flex items-center">
                                <div className="w-full">
                                    <p className="text-sm font-medium text-gray-500">
                                        Check-in
                                    </p>
                                    <p className="text-base text-gray-800 font-semibold">
                                        {parseDate(
                                            latestHotel.Hotels.Hotel[0].StartDate.toString()
                                        ).toLocaleDateString("en-us", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="w-full mx-auto">
                                    <LuMoon className="text-gray-800 mx-auto text-lg" />
                                    <p className="text-center text-xs font-semibold text-gray-600 mt-1">
                                        {FORMAT_GRAMMAR(
                                            nightsBetween(
                                                parseDate(
                                                    latestHotel.Hotels.Hotel[0].StartDate.toString()
                                                ),
                                                parseDate(
                                                    latestHotel.Hotels.Hotel[0].EndDate.toString()
                                                )
                                            ),
                                            "night"
                                        )}
                                    </p>
                                </div>
                                <div className="w-full ml-auto mr-0">
                                    <p className="text-sm font-medium text-gray-500 text-right">
                                        Check-out
                                    </p>
                                    <p className="text-right ml-auto mr-0 text-base text-gray-800 font-semibold">
                                        {parseDate(
                                            latestHotel.Hotels.Hotel[0].EndDate.toString()
                                        ).toLocaleDateString("en-us", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-1 flex items-center ">
                                <p className="w-max text-pink-500 text-center bg-pink-50 rounded-md g-sans text-sm py-0.5 font-medium px-1.5">
                                    From{" "}
                                    {
                                        latestHotel.Hotels.Hotel[0].details
                                            .Details[0].CheckInTime
                                    }{" "}
                                    hrs
                                </p>
                                <p className="ml-auto mr-0 w-max text-pink-500 text-center bg-pink-50 rounded-md g-sans text-sm py-0.5 font-medium px-1.5">
                                    Until{" "}
                                    {
                                        latestHotel.Hotels.Hotel[0].details
                                            .Details[0].CheckOutTime
                                    }{" "}
                                    hrs
                                </p>
                            </div>
                            <hr className="pb-0 mt-4 mb-3" />
                            <div className="my-2 flex items-center">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Room & persons
                                    </p>
                                    <p className="text-base text-gray-800 font-semibold">
                                        {FORMAT_GRAMMAR(
                                            (cfg as RoomCfgType).rooms
                                                .flatMap(
                                                    (room) =>
                                                        room.adults +
                                                        room.children.length
                                                )
                                                .reduce((a, b) => a + b),
                                            "person"
                                        )}{" "}
                                        (
                                        {FORMAT_GRAMMAR(
                                            (cfg as RoomCfgType).rooms.length,
                                            "room"
                                        )}
                                        )
                                    </p>
                                </div>
                                <div className="ml-auto mr-0 text-right">
                                    <p className="text-sm text-gray-500 font-medium">
                                        Price per night/room
                                    </p>
                                    <p className="text-base font-semibold">
                                        $
                                        {getPricePerNightPerRoomCheckout(
                                            latestHotel.Hotels.Hotel[0].RoomTypeDetails.Rooms.Room.filter(
                                                (r) =>
                                                    r.RoomTypeCode ===
                                                        (room as RoomDetailType)
                                                            .RoomTypeCode &&
                                                    r.RoomType ===
                                                        (room as RoomDetailType)
                                                            .RoomType
                                            )[0],
                                            latestHotel.Hotels.Hotel[0]
                                                .StartDate,
                                            latestHotel.Hotels.Hotel[0].EndDate
                                        )}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div>
                                <div className="flex items-center">
                                    <p className="text-md font-semibold menlo text-gray-700">
                                        VAT:
                                    </p>
                                    <p className="ml-auto mr-0 menlo text-sm text-gray-500">
                                        INCLUDED
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-md font-semibold menlo text-gray-700">
                                        SERVICE TAX:
                                    </p>
                                    <p className="ml-auto mr-0 menlo text-sm text-gray-500">
                                        INCLUDED
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-md font-semibold menlo text-gray-700">
                                        OTHER TAXES:
                                    </p>
                                    <p className="ml-auto mr-0 menlo text-sm text-gray-500">
                                        INCLUDED
                                    </p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-right text-gray-500 font-medium text-sm">
                                    Total price
                                </p>
                                <p className="text-right text-3xl g-sans font-medium mb-1.5 pb-1.5">
                                    $
                                    {getTotalPriceCheckout(
                                        latestHotel.Hotels.Hotel[0].RoomTypeDetails.Rooms.Room.filter(
                                            (r) =>
                                                r.RoomTypeCode ===
                                                    (room as RoomDetailType)
                                                        .RoomTypeCode &&
                                                r.RoomType ===
                                                    (room as RoomDetailType)
                                                        .RoomType
                                        )[0],
                                        (cfg as RoomCfgType).rooms.length
                                    )}
                                </p>
                            </div>
                            <hr className="mb-4" />
                            <button
                                disabled={
                                    submitButtonDisabledFn(
                                        childrenData,
                                        adultsData
                                    ) || createBookingLoading
                                }
                                className={`flex g-sans items-center ml-auto mr-0 mb-7 ${
                                    submitButtonDisabledFn(
                                        childrenData,
                                        adultsData
                                    ) || createBookingLoading
                                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                                        : "bg-[#00395D] text-[#00AEEF] hover:bg-opacity-[0.98]"
                                } rounded-md py-2 px-10 font-medium text-md w-full justify-center`}
                                onClick={createBooking}
                            >
                                Book now
                            </button>
                            <p className="text-center text-xs px-2 text-gray-500 font-medium">
                                By making your booking you agree to the{" "}
                                <span className="underline font-semibold text-gray-700">
                                    Noble Travels General Terms And Conditions
                                </span>{" "}
                                as well as the{" "}
                                <span className="underline font-semibold text-gray-700">
                                    Noble Travels data protection policy
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
            <Footer />
        </div>
    );
};

export default Checkout;
