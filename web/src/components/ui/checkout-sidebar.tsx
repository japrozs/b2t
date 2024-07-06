import {
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
    RoomDetailType,
} from "@/types";
import {
    parseDate,
    FORMAT_GRAMMAR,
    nightsBetween,
    getPricePerNightPerRoomCheckout,
    getTotalPriceCheckout,
    submitButtonDisabledFn,
} from "@/utils";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";
import { toast } from "sonner";

interface CheckoutSidebarProps {
    latestHotel: HotelSearchResult;
    cfg: RoomCfgType;
    room: RoomDetailType;
    adultsData: any[];
    childrenData: any[];
}

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
    latestHotel,
    cfg,
    room,
    adultsData,
    childrenData,
}) => {
    const [createBookingLoading, setCreateBookingLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const createBooking = async () => {
        setCreateBookingLoading(true);

        // // ******************** STRIPE STUFF INIT ********************
        const cardElement = elements?.getElement("card");
        if (!stripe || !elements) return null;

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement as StripeCardElement,
        });

        if (error) {
            console.log("stripe error :: ", error);
            toast.error(error.message);
            setCreateBookingLoading(false);
            return;
        } else {
            console.log("stripe paymentMethod :: ", paymentMethod);
        }
        // // ******************** STRIPE STUFF END  ********************

        console.log("create.booking.loading – ", createBookingLoading);
        axios
            .post("/create-booking", {
                startDate: latestHotel.Hotels.Hotel[0].StartDate,
                endDate: latestHotel.Hotels.Hotel[0].EndDate,
                hotelCode: latestHotel.Hotels.Hotel[0].HotelCode,
                RoomTypeCode: (room as RoomDetailType).RoomTypeCode,
                MealPlanCode: (room as RoomDetailType).MealPlanCode,
                ContractTokenId: (room as RoomDetailType).ContractTokenId,
                Rate: (room as RoomDetailType).Rate,
                adultsData,
                childrenData,
                roomDetails: JSON.stringify(room as RoomDetailType),
                TotalBookingAmount: getTotalPriceCheckout(
                    latestHotel.Hotels.Hotel[0].RoomTypeDetails.Rooms.Room.filter(
                        (r) =>
                            r.RoomTypeCode ===
                                (room as RoomDetailType).RoomTypeCode &&
                            r.RoomType === (room as RoomDetailType).RoomType
                    )[0],
                    (cfg as RoomCfgType).rooms.length
                ),
                PaymentMethodId: paymentMethod.id,
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
    return (
        <>
            <p className="text-2xl font-semibold">
                {latestHotel.Hotels.Hotel[0].HotelName}
            </p>
            <p className="mt-1.5 flex items-center text-sm text-gray-500 font-medium">
                <IoLocationOutline className="mr-1.5" />
                {latestHotel.Hotels.Hotel[0].details.Details[0].HotelAddress.split(
                    ","
                )
                    .slice(0, 2)
                    .join(", ") || latestHotel.Hotels.Hotel[0].Chain}
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
                    {latestHotel.Hotels.Hotel[0].details.Details[0].CheckInTime}{" "}
                    hrs
                </p>
                <p className="ml-auto mr-0 w-max text-pink-500 text-center bg-pink-50 rounded-md g-sans text-sm py-0.5 font-medium px-1.5">
                    Until{" "}
                    {
                        latestHotel.Hotels.Hotel[0].details.Details[0]
                            .CheckOutTime
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
                                    (room) => room.adults + room.children.length
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
                                        (room as RoomDetailType).RoomTypeCode &&
                                    r.RoomType ===
                                        (room as RoomDetailType).RoomType
                            )[0],
                            latestHotel.Hotels.Hotel[0].StartDate,
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
                                    (room as RoomDetailType).RoomTypeCode &&
                                r.RoomType === (room as RoomDetailType).RoomType
                        )[0],
                        (cfg as RoomCfgType).rooms.length
                    )}
                </p>
            </div>
            <hr className="mb-4" />
            <button
                disabled={
                    submitButtonDisabledFn(childrenData, adultsData) ||
                    createBookingLoading
                }
                className={`flex g-sans items-center ml-auto mr-0 mb-7 ${
                    submitButtonDisabledFn(childrenData, adultsData) ||
                    createBookingLoading
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
        </>
    );
};
