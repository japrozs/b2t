import { HotelSearchItemType } from "@/types";
import React from "react";
import { FaStar } from "react-icons/fa6";
import {
    IoIosCheckmark,
    IoIosCheckmarkCircle,
    IoIosCloseCircle,
} from "react-icons/io";
import { MdOutlineFastfood } from "react-icons/md";

interface HotelCardProps {
    hotel: HotelSearchItemType;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    return (
        <div className="border border-gray-200  mb-5 p-5 flex items-start">
            <img
                className="h-48"
                src="https://foto.hrsstatic.com/fotos/0/2/269/213/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F6%2F8%2F6%2F4%2F%2Fteaser_686447.jpg/WYT98yP7mJCpeMkikrasbQ%3D%3D/134%2C106/6/Holiday_Inn_Express_LONDON_-_EXCEL-London-Aussenansicht-3-686447.jpg"
            />
            <div className="px-5 w-full truncate line-clamp-1">
                <h1 className="libre text-2xl text-blue-main font-medium truncate text-ellipsis">
                    {hotel.HotelName}
                </h1>
                <div className="flex items-center mt-0.5 my-1">
                    {Array(hotel.StarRating)
                        .fill(0)
                        .map((_, idx: number) => (
                            <FaStar
                                key={idx}
                                className="text-sm text-yellow-500"
                            />
                        ))}
                    <span className="mx-2.5 text-gray-500">•</span>
                    <p className="text-sm text-gray-500 font-medium">
                        {hotel.Chain}
                    </p>
                </div>
                {/* TODO – the language here is VERY confusing... fix it */}
                <div className="mt-2.5">
                    {hotel.RoomTypeDetails.Rooms.Room[0].NonRefundable ===
                    "N" ? (
                        <div className="flex items-center">
                            <IoIosCheckmarkCircle className="text-md mr-2 text-green-500" />
                            <p className="font-medium text-sm">
                                Non-refundable
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <IoIosCloseCircle className="text-md mr-2 text-red-500" />
                            <p className="font-medium text-sm">Refundable</p>
                        </div>
                    )}
                    <div className="mt-1.5 flex items-center">
                        <MdOutlineFastfood className="text-md mr-2 text-purple-500" />
                        <p className="font-medium text-sm">
                            {hotel.RoomTypeDetails.Rooms.Room[0].MealPlan}
                        </p>
                    </div>
                </div>
            </div>
            <div className="self-end text-right min-w-36 flex flex-col">
                <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                    ${" "}
                    {Math.round(
                        hotel.RoomTypeDetails.Rooms.Room[0]
                            .RecommendedRetailPrice
                    )}
                </p>
                <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                    ${" "}
                    {Math.round(
                        1.06 * hotel.RoomTypeDetails.Rooms.Room[0].TotalRate
                    )}
                </p>
                <p className="text-sm text-gray-400 font-medium">
                    Including taxes and fees
                </p>
                <button className="transition border border-blue-main p-1.5 mt-2 libre text-sm text-blue-main hover:bg-blue-main hover:text-white ">
                    Choose room
                </button>
            </div>
            {/* {hotel.RoomTypeDetails.Rooms.Room.map((room, idx: number) => (
                    <div
                        key={idx}
                        className="border border-gray-200 m-1 my-2.5 p-3"
                    >
                        <p>room type - {room.RoomType}</p>
                        <p>room type code - {room.RoomTypeCode}</p>
                        <p>
                            room status -{" "}
                            {room.RoomStatusDetails.Status.join(", ")}
                        </p>
                        <p>meal plan - {room.MealPlan}</p>
                        <p>
                            {room.NonRefundable === "N"
                                ? "not non-refundable"
                                : "non-refundable"}
                        </p>
                        {room.CancellationPolicyDetails.Cancellation.map(
                            (cancellation, i: number) => (
                                <div key={i}>
                                    <p>CANCELLATION POLICY</p>
                                    <p>from - {cancellation.FromDate}</p>
                                    <p>to - {cancellation.ToDate}</p>
                                    <p>
                                        from time (military hours) -{" "}
                                        {cancellation.FromTime}
                                    </p>
                                    <p>
                                        night to charge -{" "}
                                        {cancellation.NightToCharge}
                                    </p>
                                    <p>
                                        package yn – 
                                        {room.PackageYN === "N" ? "no" : "yes"}
                                    </p>
                                    <p>
                                        rate before tax - {room.RateBeforeTax}
                                    </p>
                                    <p>total discount - {room.TotalDiscount}</p>
                                    <p>total rate - {room.TotalRate}</p>
                                    <p>
                                        bar rate - {room.RecommendedRetailPrice}
                                    </p>
                                    <button className="mt-2 bg-blue-500 px-2 py-1 font-semibold text-white rounded-md ">
                                        book room now
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                ))} */}
        </div>
    );
};
