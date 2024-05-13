import { COMMISSION_RATE } from "@/constants";
import { RegularHotelFragment } from "@/generated/graphql";
import { useCheckoutStore } from "../../store/provider";
import { HotelDetailType, HotelSearchItemType, RoomCfgType } from "@/types";
import { SearchHotelStruct, getCheapestRoom, nightsBetween } from "@/utils";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney, MdOutlineFastfood } from "react-icons/md";
import { Pill } from "../ui/pill";

interface HotelCardProps {
    hotel: HotelSearchItemType;
    cfg: RoomCfgType;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, cfg }) => {
    const [open, setOpen] = useState(false);
    const { setHotel, setRoom, setCfg } = useCheckoutStore((state) => state);
    const router = useRouter();
    console.log(
        hotel.HotelName,
        hotel.HotelCode,
        hotel,
        hotel.details.Details[0]
    );
    return (
        <div className="border border-gray-200 mb-5 ">
            <div className="p-5 flex items-start">
                <img
                    className="w-auto h-48 object-cover"
                    src={
                        hotel.details.Details[0].Images.Img[0] ||
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
                            {hotel.details.Details[0].HotelAddress.split(",")
                                .slice(0, 2)
                                .join(", ") || hotel.Chain}
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
                                <IoIosCheckmarkCircle className="text-md mr-2 text-green-600" />
                                <p className="font-medium text-sm">
                                    Refundable
                                </p>
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
                    {/* Show modal with hotel content full message */}
                    {/* show modal with all the pills when hovering on the facilities button */}
                    <div className="mt-3.5 flex flex-wrap items-center">
                        {hotel.details.Details[0].HotelFacilities.Facility.slice(
                            0,
                            3
                        ).map((fac: string, idx: number) => (
                            <div key={idx} className="mr-1.5 mb-1.5">
                                <Pill label={fac} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="self-end text-right min-w-36 flex flex-col">
                    <p className="text-sm text-gray-400 font-medium">
                        Total for{" "}
                        {nightsBetween(
                            new Date(hotel.StartDate),
                            new Date(hotel.EndDate)
                        )}{" "}
                        nights
                    </p>
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
                            COMMISSION_RATE *
                                getCheapestRoom(
                                    hotel.RoomTypeDetails.Rooms.Room
                                ).TotalRate
                        )}
                    </p>
                    <p className="text-sm text-gray-400 font-medium">
                        Including taxes and fees
                    </p>
                    <button
                        style={{
                            fontFamily: "blair-itc-medium",
                        }}
                        onClick={() => setOpen(!open)}
                        className="transition mx-auto border border-blue-main p-1.5 mt-2  text-sm text-blue-main hover:bg-blue-main hover:text-white "
                    >
                        {open ? "less" : "more"} rooms
                    </button>
                </div>
            </div>
            {open &&
                hotel.RoomTypeDetails.Rooms.Room.map((room, idx: number) => (
                    <div
                        key={idx}
                        className="border border-gray-200 m-1 my-2.5 p-3 flex items-start"
                    >
                        <div className="w-full">
                            <p className="libre text-xl text-blue-main font-medium truncate text-ellipsis">
                                {room.RoomType}
                            </p>
                            <div className="mt-3 flex items-center">
                                {room.NonRefundable === "N" ? (
                                    <div className="flex items-center">
                                        <IoIosCloseCircle className="text-md mr-2 text-red-500" />
                                        <p className="font-medium text-sm">
                                            Non-refundable
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <IoIosCheckmarkCircle className="text-md mr-2 text-green-600" />
                                        <p className="font-medium text-sm">
                                            Refundable
                                        </p>
                                    </div>
                                )}
                                <div className="ml-3 flex items-center">
                                    {room.MealPlan.toLowerCase() ===
                                    "breakfast" ? (
                                        <>
                                            <IoIosCheckmarkCircle className="text-md mr-2 text-green-600" />
                                            <p className="font-medium text-sm">
                                                {room.MealPlan}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <MdOutlineFastfood className="text-md mr-2 text-purple-500" />
                                            <p className="font-medium text-sm">
                                                {room.MealPlan}
                                            </p>
                                        </>
                                    )}
                                    <p>i – contract message</p>
                                </div>
                            </div>
                            {room.CancellationPolicyDetails.Cancellation
                                .length > 0 ? (
                                <div className="flex items-center my-2.5">
                                    <MdOutlineAttachMoney className="text-md mr-2 text-green-600" />
                                    <p className="font-medium text-sm text-green-600">
                                        Free cancellation before{" "}
                                        {moment(
                                            room.CancellationPolicyDetails.Cancellation[0].FromDate.toString(),
                                            "YYYYMMDD"
                                        ).format("DD MMMM")}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center my-2.5">
                                    <MdOutlineFastfood className="text-md mr-2 text-purple-500" />
                                    <p className="font-medium text-sm">
                                        No cancellation policy
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="self-end text-right min-w-36 flex flex-col">
                            <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                                $ {Math.round(room.RecommendedRetailPrice)}
                            </p>
                            <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                                $ {Math.round(COMMISSION_RATE * room.TotalRate)}
                            </p>
                            <p className="text-sm text-gray-400 font-medium">
                                Including taxes and fees
                            </p>
                        </div>
                        <div className="ml-5 min-w-32 self-center flex items-center">
                            <button
                                style={{
                                    fontFamily: "blair-itc-medium",
                                }}
                                onClick={() => {
                                    console.log(
                                        "hotel :: ",
                                        hotel,
                                        "roomId : ",
                                        room.RoomTypeCode
                                    );
                                    setHotel(hotel);
                                    setRoom(room);
                                    setCfg(cfg);
                                    router.push("/app/checkout");
                                }}
                                className="transition mx-auto border border-blue-main p-1.5 mt-2  text-sm text-blue-main hover:bg-blue-main hover:text-white "
                            >
                                book room
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};
