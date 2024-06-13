import { BookingDetailType } from "@/types";
import React from "react";

interface BookingCardProps {
    booking: BookingDetailType;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    return (
        <div className="border border-gray-200 mb-5 p-[0.875rem]">
            <p>{booking.HotelDetails.HotelName}</p>
        </div>
    );
};
