import { GetCityQueryResult, RegularHotelFragment } from "@/generated/graphql";
import { HotelDetailType, HotelSearchItemType } from "@/types";
import React from "react";
import { FaStar } from "react-icons/fa6";
import {
    IoIosCheckmark,
    IoIosCheckmarkCircle,
    IoIosCloseCircle,
} from "react-icons/io";
import { MdOutlineFastfood } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { getCheapestRoom } from "@/utils";
import { Pill } from "../ui/pill";

interface HotelCardProps {
    hotel: HotelSearchItemType;
    hotelStruct: RegularHotelFragment | undefined;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, hotelStruct }) => {
    console.log(
        hotel.HotelName,
        hotel.HotelCode,
        hotel,
        (JSON.parse(hotelStruct?.details || "{}") as HotelDetailType).Details[0]
    );
    return (
        <div className="border border-gray-200  mb-5 p-5 flex items-start">
            <img
                className="w-auto h-48 object-cover"
                src={
                    (
                        JSON.parse(
                            hotelStruct?.details || "{}"
                        ) as HotelDetailType
                    ).Details[0].Images.Img[0] ||
                    `https://previews.123rf.com/images/happyvector071/happyvector0711608/happyvector071160800591/62947847-abstract-creative-vector-design-layout-with-text-do-not-exist.jpg`
                }
            />
            <div className="flex flex-col px-5 w-full truncate line-clamp-1 border-r border-gray-200 ">
                <h1 className="libre text-2xl text-blue-main font-medium truncate text-ellipsis">
                    {hotel.HotelName}
                </h1>
                <div className="flex items-center mt-0.5 my-1">
                    <p className="flex items-center text-sm text-gray-500 font-medium">
                        <IoLocationOutline className="mr-1.5" />
                        {(
                            JSON.parse(
                                hotelStruct?.details || "{}"
                            ) as HotelDetailType
                        ).Details[0].HotelAddress.split(",")[0] || hotel.Chain}
                    </p>
                    <span className="mx-2.5 text-gray-500">•</span>
                    {Array(hotel.StarRating)
                        .fill(0)
                        .map((_, idx: number) => (
                            <FaStar
                                key={idx}
                                className="text-sm text-yellow-500"
                            />
                        ))}
                </div>
                {/* TODO – the language here is VERY confusing... fix it */}
                {/* TODO – make pills for the facilites like travala */}
                <div className="mt-3 flex items-center">
                    {hotel.RoomTypeDetails.Rooms.Room[0].NonRefundable ===
                    "N" ? (
                        <div className="flex items-center">
                            <IoIosCloseCircle className="text-md mr-2 text-red-500" />
                            <p className="font-medium text-sm">
                                Non-refundable
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <IoIosCheckmarkCircle className="text-md mr-2 text-green-500" />
                            <p className="font-medium text-sm">Refundable</p>
                        </div>
                    )}
                    <div className="ml-3 flex items-center">
                        <MdOutlineFastfood className="text-md mr-2 text-purple-500" />
                        <p className="font-medium text-sm">
                            {hotel.RoomTypeDetails.Rooms.Room[0].MealPlan}
                        </p>
                    </div>
                </div>
                {/* TODO – use icons like HRS if possible */}
                <div className="mt-3.5 flex flex-wrap items-center">
                    {(
                        JSON.parse(
                            hotelStruct?.details || "{}"
                        ) as HotelDetailType
                    ).Details[0].HotelFacilities.Facility.slice(0, 3).map(
                        (fac: string, idx: number) => (
                            <div key={idx} className="mr-1.5 mb-1.5">
                                <Pill label={fac} />
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="self-end text-right min-w-36 flex flex-col">
                <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                    ${" "}
                    {Math.round(
                        getCheapestRoom(hotel.RoomTypeDetails.Rooms.Room)
                            .RecommendedRetailPrice
                    )}
                </p>
                <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                    ${" "}
                    {Math.round(
                        1.06 *
                            getCheapestRoom(hotel.RoomTypeDetails.Rooms.Room)
                                .TotalRate
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
