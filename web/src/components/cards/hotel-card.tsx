import { COMMISSION_RATE } from "@/constants";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "@/types";
import {
    FORMAT_GRAMMAR,
    getCheapestRoom,
    nightsBetween,
    parseDate,
} from "@/utils";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import {
    MdOutlineAttachMoney,
    MdOutlineCheck,
    MdOutlineFastfood,
} from "react-icons/md";
import { useCheckoutStore } from "../../store/provider";
import { Pill } from "../ui/pill";
import { MdAlternateEmail } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

interface HotelCardProps {
    hotel: HotelSearchItemType;
    cfg: RoomCfgType;
    showPricePerNightPerRoom?: boolean;
}

// TODO: find a way to incorporate two prices (online rate and our rates) into hotel card
// TODO: display search query at the top and modification

export const HotelCard: React.FC<HotelCardProps> = ({
    hotel,
    cfg,
    showPricePerNightPerRoom,
}) => {
    const [open, setOpen] = useState(false);
    const { setHotel, setRoom, setCfg } = useCheckoutStore((state) => state);
    const router = useRouter();
    // console.log(
    //     hotel.HotelName,
    //     hotel.HotelCode,
    //     hotel,
    //     hotel.details.Details[0]
    // );
    return (
        <div className="border border-gray-200 mb-5 ">
            <div className="p-5 flex items-start">
                <img
                    className="w-48 h-48 object-cover"
                    src={
                        hotel.details.Details[0].Images.Img[0] ||
                        `https://previews.123rf.com/images/happyvector071/happyvector0711608/happyvector071160800591/62947847-abstract-creative-vector-design-layout-with-text-do-not-exist.jpg`
                    }
                />
                <div className="flex flex-col px-5 w-full">
                    <h1 className="g-sans mb-1 text-xl text-blue-main font-medium flex items-center flex-wrap">
                        {/* <h1 className="libre text-2xl text-blue-main font-medium truncate text-ellipsis"> */}
                        {/* show full hotel name on hover */}
                        {hotel.HotelName}
                        <div className="mr-1.5"></div>
                        <span className="flex items-center">
                            {Array(hotel.StarRating)
                                .fill(0)
                                .map((_, idx: number) => (
                                    <FaStar
                                        key={idx}
                                        className="text-sm text-yellow-500 mr-0.5"
                                    />
                                ))}
                        </span>
                    </h1>
                    <div className="flex items-center my-1">
                        <p className="flex items-center text-sm text-gray-500 font-medium">
                            <IoLocationOutline className="mr-1.5" />
                            {hotel.details.Details[0].HotelAddress.split(",")
                                .slice(0, 2)
                                .join(", ") || hotel.Chain}
                        </p>
                        {/* <span className="mx-2.5 text-gray-500">•</span> */}
                    </div>
                    {/* {hotel.details.Details[0].HotelEmail && (
                        <div className="flex items-center">
                            <MdAlternateEmail className="text-gray-400 mr-2" />
                            <p className="transition-all text-sm text-blue-500 menlo hover:underline">
                                {hotel.details.Details[0].HotelEmail}
                            </p>
                        </div>
                    )} */}
                    {/* TODO – the language here is VERY confusing... fix it */}
                    {/* TODO – make pills for the facilites like travala */}
                    <div className="border-l-2 px-2 mt-4 border-gray-300">
                        {Array(1)
                            .fill(
                                getCheapestRoom(
                                    hotel.RoomTypeDetails.Rooms.Room
                                )
                            )
                            .map((r: RoomDetailType) => (
                                <>
                                    <p className="font-medium text-sm">
                                        {r.RoomType}
                                    </p>
                                    {r.MealPlan.toLowerCase() ===
                                    "breakfast" ? (
                                        <div className="flex items-center mt-1">
                                            <MdOutlineCheck className="text-md mr-2 text-green-600" />
                                            <p className="font-medium text-sm text-green-600">
                                                Breakfast included
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center mt-1">
                                            <span className="ml-1 mr-3">•</span>
                                            <p className="font-medium text-gray-700 text-sm">
                                                Meal plan – {r.MealPlan}
                                            </p>
                                        </div>
                                    )}
                                    {r.NonRefundable === "N" ? (
                                        <div className="flex items-center mt-0">
                                            <MdOutlineCheck className="text-md mr-2 text-green-600" />
                                            <p className="font-medium text-sm text-green-600">
                                                Free cancellation before{" "}
                                                {moment(
                                                    parseDate(
                                                        r.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                    )
                                                ).format("D MMMM, YYYY")}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center mt-0">
                                            <span className="ml-1 mr-3">•</span>
                                            <p className="font-medium text-gray-700 text-sm">
                                                Non-refundable
                                            </p>
                                        </div>
                                    )}
                                </>
                            ))}
                    </div>
                    {/* <div className="mt-3 flex items-center">
                        {hotel.RoomTypeDetails.Rooms.Room[0].NonRefundable ===
                        "Y" ? (
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
                    </div> */}
                    {/* TODO – use icons like HRS if possible */}
                    {/* Show modal with hotel content full message */}
                    {/* show modal with all the pills when hovering on the facilities button */}
                    <div className="mt-3.5 flex flex-wrap items-center">
                        {hotel.details.Details[0].HotelFacilities.Facility.slice(
                            0,
                            3
                        ).map((fac: string, idx: number) => (
                            <div key={idx} className="mr-1.5 mb-1.5">
                                <Pill colored label={fac} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="self-stretch text-right min-w-36 w-max flex flex-col">
                    {showPricePerNightPerRoom ? (
                        <>
                            <p className="text-sm text-gray-400 font-medium">
                                Price per night/room
                            </p>
                            <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                                ${" "}
                                {/* this is the TotalRate * COMMISSION_RATE */}
                                {Math.round(
                                    (COMMISSION_RATE *
                                        getCheapestRoom(
                                            hotel.RoomTypeDetails.Rooms.Room
                                        ).TotalRate) /
                                        (nightsBetween(
                                            new Date(hotel.StartDate),
                                            new Date(hotel.EndDate)
                                        ) *
                                            cfg.rooms.length)
                                )}
                            </p>
                            <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                                ${" "}
                                {/* This is the recommended price from IOLX */}
                                {Math.round(
                                    getCheapestRoom(
                                        hotel.RoomTypeDetails.Rooms.Room
                                    ).RecommendedRetailPrice /
                                        (nightsBetween(
                                            new Date(hotel.StartDate),
                                            new Date(hotel.EndDate)
                                        ) *
                                            cfg.rooms.length)
                                )}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-gray-500 font-medium mb-1.5">
                                Total for{" "}
                                {FORMAT_GRAMMAR(
                                    nightsBetween(
                                        new Date(hotel.StartDate),
                                        new Date(hotel.EndDate)
                                    ),
                                    "night"
                                )}
                            </p>
                            <div className="">
                                <p className="ml-2 mb-0 text-3xl text-black font-semibold">
                                    ${" "}
                                    {Math.round(
                                        COMMISSION_RATE *
                                            getCheapestRoom(
                                                hotel.RoomTypeDetails.Rooms.Room
                                            ).TotalRate
                                    )}
                                </p>
                                <p className="ml-auto mt-[-2px] text-md mr-0 mb-0 text-red-500 font-medium line-through">
                                    ${" "}
                                    {Math.round(
                                        getCheapestRoom(
                                            hotel.RoomTypeDetails.Rooms.Room
                                        ).RecommendedRetailPrice
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                    <p className="g-sans text-xs text-gray-400 font-medium mt-0">
                        Incl. taxes and fees
                    </p>
                    {/* <button
                        style={{
                            fontFamily: "blair-itc-medium",
                            // fontFamily: "google-sans",
                        }}
                        onClick={() => setOpen(!open)}
                        className="transition mx-auto border border-blue-main p-1.5 mt-2  text-sm text-blue-main hover:bg-blue-main hover:text-white "
                    >
                    </button> */}
                    <button
                        onClick={() => setOpen(!open)}
                        className={`mt-auto mb-0 flex g-sans items-center bg-[#3073F0] text-white hover:bg-opacity-[0.98] rounded-md py-2 text-center justify-center whitespace-nowrap font-medium text-md w-full justify-center`}
                    >
                        {open ? "Less" : "More"} rooms
                        <IoIosArrowDown className="text-[16px] ml-2" />
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
                            {showPricePerNightPerRoom ? (
                                <>
                                    <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                                        ${" "}
                                        {Math.round(
                                            (COMMISSION_RATE * room.TotalRate) /
                                                (nightsBetween(
                                                    new Date(hotel.StartDate),
                                                    new Date(hotel.EndDate)
                                                ) *
                                                    cfg.rooms.length)
                                        )}
                                    </p>
                                    <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                                        ${" "}
                                        {Math.round(
                                            room.RecommendedRetailPrice /
                                                (nightsBetween(
                                                    new Date(hotel.StartDate),
                                                    new Date(hotel.EndDate)
                                                ) *
                                                    cfg.rooms.length)
                                        )}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="mt-2.5 mb-0 text-3xl text-blue-main font-semibold quat">
                                        ${" "}
                                        {Math.round(
                                            COMMISSION_RATE * room.TotalRate
                                        )}
                                    </p>
                                    <p className="mt-auto mb-0 text-3xl text-red-500 font-semibold quat">
                                        ${" "}
                                        {Math.round(
                                            room.RecommendedRetailPrice
                                        )}
                                    </p>
                                </>
                            )}
                            <p className="text-xs text-gray-400 font-medium">
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
