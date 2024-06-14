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
import { useIsAuth } from "@/utils/use-is-auth";
import React from "react";
import { RiSuitcaseLine } from "react-icons/ri";

interface BookingsProps {}

const Bookings: React.FC<BookingsProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useGetBookingsQuery();

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
                            <div className="flex items-stretch space-x-5">
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
                                                booking={
                                                    JSON.parse(
                                                        booking.details
                                                    ) as BookingDetailType
                                                }
                                                hotel={
                                                    JSON.parse(
                                                        booking.hotel.details
                                                    ) as HotelDetailType
                                                }
                                            />
                                        )
                                    )}
                                </div>
                                <div className="w-3/12 bg-red-500">
                                    <p>filter your resutls herer......</p>
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
