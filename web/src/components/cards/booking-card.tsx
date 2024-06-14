import { BookingDetailType, HotelDetailType } from "@/types";
import { convertStatusToString, parseDate } from "@/utils";
import moment from "moment";
import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";
import {
    MdConfirmationNumber,
    MdOutlineConfirmationNumber,
} from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { CancelBookingModal } from "../modals/cancel-booking-modal";
import { COMMISSION_RATE } from "@/constants";

interface BookingCardProps {
    booking: BookingDetailType;
    hotel: HotelDetailType;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, hotel }) => {
    const [cancelBookingModalOpen, setCancelBookingModalOpen] = useState(false);

    console.log("booking :: ", booking);
    return (
        <div className="border bg-gray-50 border-gray-200 mb-5 p-[0.875rem]">
            {/* <img
                className="w-48 h-48 object-cover"
                src={
                    hotel.Details[0].Images.Img[0] ||
                    `https://previews.123rf.com/images/happyvector071/happyvector0711608/happyvector071160800591/62947847-abstract-creative-vector-design-layout-with-text-do-not-exist.jpg`
                }
            /> */}
            <div className="flex items-stretch">
                <div className="self-start w-full">
                    <div className="flex items-center">
                        {/* <RiHotelLine className="text-gray-300 mr-1.5 text-lg" /> */}
                        <p className="g-sans text-xl text-blue-main font-medium rounded-md">
                            {hotel.Details[0].HotelName}
                        </p>
                        <p className="ml-auto mr-0 text-xl font-medium g-sans text-emerald-500 bg-emerald-50 rounded-md py-0.5 px-1.5">
                            ${" "}
                            {Math.ceil(
                                COMMISSION_RATE * booking.HotelDetails.TotalRate
                            )}
                        </p>
                    </div>
                    <hr className="my-1.5" />
                    <div className="flex items-stretch">
                        <div className="w-full">
                            <div className="mt-1 flex items-center">
                                <RiHotelLine className="text-base mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Booking Status
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p
                                    className={`${
                                        booking.HotelDetails.RoomDetails.every(
                                            (room) => room.RoomStatus === "OK"
                                        ) ||
                                        booking.HotelDetails.RoomDetails.every(
                                            (room) => room.RoomStatus === "TEST"
                                        )
                                            ? "text-emerald-500 bg-emerald-50"
                                            : "text-blue-500 bg-blue-50"
                                    } rounded-md g-sans text-sm py-0.5 font-medium px-1.5`}
                                >
                                    {convertStatusToString(
                                        booking.HotelDetails.RoomDetails[0]
                                            .RoomStatus
                                    )}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <TbLogin2 className="text-xl mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Check-in
                                </p>
                                <span className="g-sans text-gray-400 ml-[1.125rem] mr-2">
                                    ––
                                </span>
                                <p className="text-purple-500 bg-purple-50 rounded-md g-sans text-sm py-0.5 font-medium px-1.5">
                                    {moment(
                                        parseDate(
                                            booking.HotelDetails.StartDate.toString()
                                        )
                                    ).format("D MMMM, YYYY")}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <TbLogout2 className="text-xl mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Check-out
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p className="text-purple-500 g-sans bg-purple-50 rounded-md text-sm py-0.5 font-medium px-1.5">
                                    {moment(
                                        parseDate(
                                            booking.HotelDetails.EndDate.toString()
                                        )
                                    ).format("D MMMM, YYYY")}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <TbLogout2 className="text-xl mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Booked
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p className="text-blue-500 g-sans bg-blue-50 rounded-md text-sm py-0.5 font-medium px-1.5">
                                    {moment(
                                        parseDate(
                                            booking.BookingDetails.BookedDate.toString()
                                        )
                                    ).format("D MMMM, YYYY")}
                                </p>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="mt-1 flex items-center">
                                <IoPerson className="text-base mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Lead Guest
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p
                                    className={`text-gray-700 rounded-md text-sm font-semibold menlo py-0.5 font-medium px-1.5`}
                                >
                                    {booking.BookingDetails.PartyName}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <MdOutlineConfirmationNumber className="text-base mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    ref No
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p
                                    className={`bg-blue-50 py-0.5 px-1 text-blue-600 menlo rounded-md text-sm font-medium`}
                                >
                                    {booking.BookingDetails.AgencyRef}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <MdOutlineConfirmationNumber className="text-base mr-1.5 text-gray-400" />
                                <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                                    Booking No
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p
                                    className={`bg-blue-50 py-0.5 px-1 text-blue-600 menlo rounded-md text-sm font-medium`}
                                >
                                    {booking.BookingDetails.BookingNumber}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center">
                                <MdOutlineConfirmationNumber className="text-base mr-1.5 text-gray-400" />
                                <p className="text-xs whitespace-nowrap uppercase text-gray-700 g-sans font-semibold">
                                    Conf No
                                </p>
                                <span className="g-sans text-gray-400 ml-1.5 mr-2">
                                    ––
                                </span>
                                <p
                                    className={`w-max bg-blue-50 py-0.5 px-1 text-blue-600 menlo rounded-md text-sm font-medium`}
                                >
                                    {
                                        booking.HotelDetails.RoomDetails[0]
                                            .SupplierResNo
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-1 flex items-center">
                    <TbLogout2 className="text-xl mr-1.5 text-gray-400" />
                    <p className="text-xs uppercase text-gray-700 g-sans font-semibold">
                        Last cancellation time
                    </p>
                    <span className="g-sans text-gray-300 ml-1.5 mr-2">––</span>
                    <p className="text-purple-500 g-sans bg-purple-50 rounded-md text-sm py-0.5 font-medium px-1.5">
                        Until 1200 hrs
                    </p>
                </div> */}
                </div>
            </div>
            <hr className="mt-3.5 mb-1.5" />
            <div className="flex items=center">
                <button
                    onClick={() => setCancelBookingModalOpen(true)}
                    className={` ml-auto mr-2 g-sans text-center bg-red-500 text-white hover:bg-opacity-[0.96] rounded-md py-1.5 px-4 whitespace-nowrap font-medium text-md`}
                >
                    Cancel Booking
                </button>
                <button
                    className={`g-sans text-center bg-blue-500 text-white hover:bg-opacity-[0.98] rounded-md py-1.5 px-10 whitespace-nowrap font-medium text-md`}
                >
                    Open
                </button>
            </div>
            <CancelBookingModal
                open={cancelBookingModalOpen}
                setOpen={setCancelBookingModalOpen}
            />
        </div>
    );
};
