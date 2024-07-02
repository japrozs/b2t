import { BookingCard } from "@/components/cards/booking-card";
import { CancelBookingModal } from "@/components/modals/cancel-booking-modal";
import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Spinner } from "@/components/shared/spinner";
import {
    RegularBookingFragment,
    useGetBookingsQuery,
} from "@/generated/graphql";
import {
    BookingDetailType,
    HotelDetailType,
    HotelSearchItemType,
} from "@/types";
import { convertStatusToString } from "@/utils";
import { useIsAuth } from "@/utils/use-is-auth";
import { Checkbox } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { GrCheckmark } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import {
    RiProgress2Line,
    RiProgress4Line,
    RiSuitcaseLine,
} from "react-icons/ri";
import Datepicker from "react-tailwindcss-datepicker";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useGetBookingsQuery();
    const [statusSelected, setStatusSelected] = useState<string[]>([]);
    const STATUS_FILTER_MAP: Record<string, string> = {
        OK: "Confirmed",
        RQ: "On Request",
        CX: "Cancelled",
    };
    const [bookingDateFilter, setBookingDateFilter] = useState({
        startDate: null,
        endDate: null,
    });
    const [filterHotelName, setFilterHotelName] = useState("");

    useEffect(() => {
        console.log(statusSelected);
    }, [statusSelected]);

    return (
        <div>
            <Navbar />
            {loading ? (
                <div className="h-screen">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="max-w-[76rem] mx-auto my-10">
                        {data?.getBookings.length === 0 ? (
                            <div>
                                <p className="text-2xl mb-4 font-semibold flex items-center">
                                    <RiSuitcaseLine className="text-gray-300 mr-2" />
                                    No bookings found
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-stretch space-x-10">
                                <div className="w-9/12">
                                    <p className="text-2xl mb-4 font-semibold flex items-center">
                                        <RiSuitcaseLine className="text-gray-300 mr-2" />
                                        My Bookings
                                    </p>
                                    {data?.getBookings.map(
                                        (
                                            booking: RegularBookingFragment,
                                            idx: number
                                        ) => (
                                            <BookingCard
                                                key={idx}
                                                bookingDetails={
                                                    JSON.parse(
                                                        booking.details
                                                    ) as BookingDetailType
                                                }
                                                booking={booking}
                                                hotel={
                                                    JSON.parse(
                                                        booking.hotel.details
                                                    ) as HotelDetailType
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <div className="w-3/12">
                                    <p className="text-2xl font-semibold flex items-center">
                                        <IoFilter className="mr-3 text-lg text-gray-400 " />
                                        Filter results
                                    </p>
                                    <hr className="mt-4 mb-2" />
                                    <p className="font-medium g-sans text-base flex items-center">
                                        {/* <RiProgress4Line className="text-gray-400 text-lg mr-2" /> */}
                                        Status
                                    </p>
                                    {Object.keys(STATUS_FILTER_MAP).map(
                                        (key: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="my-2.5 flex items-center"
                                            >
                                                <Checkbox
                                                    checked={statusSelected.includes(
                                                        key
                                                    )}
                                                    onChange={() => {
                                                        const cpy = [
                                                            ...statusSelected,
                                                        ];
                                                        if (cpy.includes(key)) {
                                                            cpy.splice(
                                                                cpy.indexOf(
                                                                    key
                                                                ),
                                                                1
                                                            );
                                                        } else {
                                                            cpy.push(key);
                                                        }
                                                        setStatusSelected(cpy);
                                                    }}
                                                    className="mr-3 group size-[1rem] flex items-center justify-center rounded-md bg-white border border-gray-300 data-[checked]:border-gray-800 data-[checked]:bg-black"
                                                >
                                                    <GrCheckmark className="hidden text-white text-xs self-center group-data-[checked]:block" />
                                                </Checkbox>
                                                <p className="text-sm font-medium text-gray-700 break-normal">
                                                    {convertStatusToString(key)}
                                                </p>
                                            </div>
                                        )
                                    )}

                                    <hr className="mt-4 mb-2" />
                                    <p className="font-medium g-sans text-base flex items-center">
                                        Filter by Date
                                    </p>
                                    <div className="mt-3.5 mb-3">
                                        <p className="text-sm font-medium text-gray-500">
                                            Hotel Booking Date
                                        </p>
                                        <Datepicker
                                            primaryColor="blue"
                                            value={bookingDateFilter}
                                            asSingle={true}
                                            // separator=" – "
                                            placeholder="DD-MM-YYYY"
                                            displayFormat="DD-MM-YYYY"
                                            inputClassName={
                                                "outline-nonefocus:ring-1 datepicker-input"
                                            }
                                            toggleClassName={
                                                "absolute right-0 mt-0.5 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                            }
                                            onChange={(val: any) => {
                                                setBookingDateFilter(val);
                                            }}
                                        />
                                    </div>
                                    <div className="my-1.5">
                                        <p className="text-sm font-medium text-gray-500">
                                            Check-In Date
                                        </p>
                                        <Datepicker
                                            primaryColor="blue"
                                            value={bookingDateFilter}
                                            asSingle={true}
                                            // separator=" – "
                                            placeholder="DD-MM-YYYY"
                                            displayFormat="DD-MM-YYYY"
                                            inputClassName={
                                                "outline-nonefocus:ring-1 datepicker-input"
                                            }
                                            toggleClassName={
                                                "absolute right-0 mt-0.5 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                                            }
                                            onChange={(val: any) => {
                                                setBookingDateFilter(val);
                                            }}
                                        />
                                    </div>
                                    <hr className="mt-4 mb-2" />
                                    <p className="font-medium g-sans text-base flex items-center">
                                        Hotel Name
                                    </p>
                                    <input
                                        value={filterHotelName}
                                        onChange={(e) =>
                                            setFilterHotelName(e.target.value)
                                        }
                                        className={`font-medium w-full text-gray-700 shadow-sm transition-all text-smol border placeholder-gray-300 py-1 px-3 mt-2 mb-1.5 bg-white rounded-md outline-none focus:ring-2 focus:ring-border-blue-100`}
                                        placeholder={"Waldorf Astoria"}
                                    />
                                    <hr className="mt-4 mb-2" />
                                    <p className="font-medium g-sans text-base flex items-center">
                                        Reference Number
                                    </p>
                                    <input
                                        value={filterHotelName}
                                        onChange={(e) =>
                                            setFilterHotelName(e.target.value)
                                        }
                                        className={`menlo font-medium w-full text-gray-700 shadow-sm transition-all text-smol border placeholder-gray-300 py-1 px-3 mt-2 mb-1.5 bg-white rounded-md outline-none focus:ring-2 focus:ring-border-blue-100`}
                                        placeholder={"Booking reference number"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default Bookings;
