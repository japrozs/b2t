import { HOTEL_FACILITY_FREE_WIFI_KEY, COMMISSION_RATE } from "@/constants";
import { parseDate, FORMAT_GRAMMAR, nightsBetween } from "@/utils";
import moment from "moment";
import router from "next/router";
import React from "react";
import { FaWifi } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineCheck } from "react-icons/md";
import { SlQuestion } from "react-icons/sl";
import { Popper } from "../ui/popper";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "@/types";
import { useCheckoutStore } from "@/store/provider";
import { LuBadgeInfo } from "react-icons/lu";

interface RoomCardProps {
    room: RoomDetailType;
    hotel: HotelSearchItemType;
    showPricePerNightPerRoom: boolean | undefined;
    cfg: RoomCfgType;
    rounded?: boolean;
    mini?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
    room,
    hotel,
    cfg,
    showPricePerNightPerRoom,
    rounded,
    mini,
}) => {
    const { setHotel, setRoom, setCfg } = useCheckoutStore((state) => state);
    return (
        <div
            className={`border border-gray-200 p-3 flex items-stretch ${
                rounded && "rounded-lg"
            }`}
        >
            <div className="w-full flex flex-col">
                <p className="g-sans text-lg flex items-center text-blue-main font-medium truncate text-ellipsis mb-1">
                    {room.RoomType}
                </p>
                <div className="flex items-stretch">
                    <div className="w-full pr-0">
                        {room.MealPlan.toLowerCase() === "breakfast" ? (
                            <div className="flex items-center mt-1">
                                <MdOutlineCheck className="text-md mr-2 text-green-700" />
                                <p className="font-medium text-sm text-green-700">
                                    Breakfast included
                                </p>
                            </div>
                        ) : (
                            <div className="flex items-center mt-1">
                                <span className="ml-1 mr-3">•</span>
                                <p className="font-medium text-gray-700 text-sm">
                                    Meal plan – {room.MealPlan}
                                </p>
                            </div>
                        )}
                        {room.NonRefundable === "N" ? (
                            <div className="flex items-center mt-0">
                                <MdOutlineCheck className="text-md mr-2 text-green-700" />
                                <p className="flex items-center font-medium text-sm text-green-700">
                                    Free cancellation before
                                    <span className="font-semibold ml-1">
                                        {moment(
                                            parseDate(
                                                room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                            )
                                        ).format("D MMMM, YYYY")}
                                    </span>
                                    <Popper
                                        panelShadow
                                        button={({ open }) => (
                                            <LuBadgeInfo
                                                className={`text-blue-600 text-md ml-2 mt-1`}
                                            />
                                        )}
                                        panel={() => (
                                            <div className="bg-white w-96 p-4 flex items-start">
                                                <div className="py-1 pr-2">
                                                    <MdOutlineCheck className="text-md text-green-700" />
                                                </div>
                                                <div>
                                                    <p className="flex items-center font-medium text-sm text-green-700">
                                                        Free cancellation before{" "}
                                                        {moment(
                                                            parseDate(
                                                                room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                            )
                                                        ).format(
                                                            "D MMMM, YYYY"
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-700 mt-1">
                                                        You may cancel free of
                                                        charge until{" "}
                                                        <span className="font-medium">
                                                            23:59
                                                        </span>{" "}
                                                        on{" "}
                                                        <span className="font-medium">
                                                            {moment(
                                                                parseDate(
                                                                    room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                                )
                                                            )
                                                                .subtract(
                                                                    1,
                                                                    "days"
                                                                )
                                                                .format(
                                                                    "D MMMM, YYYY"
                                                                )}
                                                        </span>
                                                        . You will be charged{" "}
                                                        {room
                                                            .CancellationPolicyDetails
                                                            .Cancellation[0]
                                                            .NightToCharge
                                                            ? `the cost
                                                                    of ${FORMAT_GRAMMAR(
                                                                        room
                                                                            .CancellationPolicyDetails
                                                                            .Cancellation[0]
                                                                            .NightToCharge,
                                                                        "night"
                                                                    )}`
                                                            : room
                                                                  .CancellationPolicyDetails
                                                                  .Cancellation[0]
                                                                  .PercentOrAmt ===
                                                              "P"
                                                            ? `${Math.round(
                                                                  parseFloat(
                                                                      room
                                                                          .CancellationPolicyDetails
                                                                          .Cancellation[0]
                                                                          .Value ||
                                                                          ""
                                                                  )
                                                              )}% of the booking amount`
                                                            : `\$ ${Math.round(
                                                                  parseFloat(
                                                                      room
                                                                          .CancellationPolicyDetails
                                                                          .Cancellation[0]
                                                                          .Value ||
                                                                          ""
                                                                  )
                                                              )}`}{" "}
                                                        if you cancel on or
                                                        after{" "}
                                                        <span className="font-medium">
                                                            00:00
                                                        </span>{" "}
                                                        on{" "}
                                                        <span className="font-medium">
                                                            {moment(
                                                                parseDate(
                                                                    room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                                )
                                                            ).format(
                                                                "D MMMM, YYYY"
                                                            )}
                                                        </span>
                                                        . If you don't show up,
                                                        the no-show fee will be
                                                        the same as the
                                                        cancellation fee.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    />
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
                        {mini && (
                            <div className="flex items-center mt-0">
                                {hotel.details.Details[0].RoomTypes.RoomType.filter(
                                    (r) =>
                                        r.RoomTypeCode === room.RoomTypeCode &&
                                        r.RoomType === room.RoomType
                                ).map((room) => (
                                    <div className="mb-3">
                                        <p className="mt-1 font-medium flex items-center text-sm text-gray-700">
                                            <span className="ml-1 mr-3">•</span>
                                            {mini
                                                ? "Max"
                                                : "Maximum"} Occupancy{" "}
                                            <span className="mx-2 text-gray-400 g-sans">
                                                ––
                                            </span>
                                            {Array(room.MaxOccPax)
                                                .fill(0)
                                                .map((_, idx) => (
                                                    <IoPerson className="text-md mr-0.5" />
                                                ))}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {!mini && (
                        <div className="pl-4 w-full mt-1">
                            {hotel.details.Details[0].RoomTypes.RoomType.filter(
                                (r) =>
                                    r.RoomTypeCode === room.RoomTypeCode &&
                                    r.RoomType === room.RoomType
                            ).map((room) => (
                                <div>
                                    <p className="mt-1 font-medium flex items-center text-sm text-gray-700">
                                        {mini ? "Max" : "Maximum"} Occupancy{" "}
                                        <span className="mx-2 text-gray-400 g-sans">
                                            ––
                                        </span>
                                        {Array(room.MaxOccPax)
                                            .fill(0)
                                            .map((_, idx) => (
                                                <IoPerson className="text-md mr-0.5" />
                                            ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* <div className="mt-3 flex items-center">
                                <p>i – contract message</p>
                            </div> */}
                <div className="mt-auto mb-0 flex items-center">
                    {hotel.details.Details[0].HotelFacilities.Facility.includes(
                        HOTEL_FACILITY_FREE_WIFI_KEY
                    ) && (
                        <div className="p-1.5 flex items-center">
                            <FaWifi
                                aria-label="Free Wi-Fi"
                                className="text-xl text-blue-600"
                            />
                            <p className="ml-2 uppercase g-sans text-gray-700 font-semibold text-xs">
                                Free Wi-Fi
                            </p>
                            <span className="ml-3 mr-1 text-gray-300">•</span>
                        </div>
                    )}
                    <p className="uppercase g-sans font-semibold text-xs flex items-center text-gray-700">
                        What's Included?{" "}
                        <Popper
                            panelShadow
                            button={({ open }) => (
                                <SlQuestion
                                    className={`text-blue-600 text-md ml-2 mt-1`}
                                />
                            )}
                            panel={() => (
                                <div className="bg-white w-72 p-4">
                                    <p className="text-black g-sans font-medium">
                                        What's included?
                                    </p>
                                    <hr className="mt-1 mb-1.5" />
                                    <p className="text-sm text-gray-700">
                                        {room.ContractLabel}
                                    </p>
                                </div>
                            )}
                        />
                    </p>
                </div>
            </div>
            <div className="self-end text-right min-w-36 flex flex-col">
                {showPricePerNightPerRoom ? (
                    <>
                        <p className="text-sm text-gray-500 font-medium mb-1.5">
                            Price per night/room
                        </p>
                        <div className="">
                            <p className="mb-0 text-3xl text-black font-semibold">
                                ${" "}
                                {/* this is the TotalRate * COMMISSION_RATE */}
                                {Math.ceil(
                                    COMMISSION_RATE *
                                        (room.TotalRate /
                                            nightsBetween(
                                                parseDate(
                                                    hotel.StartDate.toString()
                                                ),
                                                parseDate(
                                                    hotel.EndDate.toString()
                                                )
                                            ))
                                )}
                            </p>
                            <p className="mt-[-2px] text-md mb-0 text-red-500 font-medium line-through">
                                ${" "}
                                {/* This is the recommended price from IOLX */}
                                {Math.ceil(
                                    COMMISSION_RATE *
                                        (room.RecommendedRetailPrice /
                                            nightsBetween(
                                                parseDate(
                                                    hotel.StartDate.toString()
                                                ),
                                                parseDate(
                                                    hotel.EndDate.toString()
                                                )
                                            ))
                                )}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 font-medium mb-1.5">
                            Total for{" "}
                            {FORMAT_GRAMMAR(
                                nightsBetween(
                                    parseDate(hotel.StartDate.toString()),
                                    parseDate(hotel.EndDate.toString())
                                ),
                                "night"
                            )}
                        </p>
                        <div className="">
                            <p className="mb-0 text-3xl text-black font-semibold">
                                ${" "}
                                {Math.ceil(
                                    COMMISSION_RATE *
                                        room.TotalRate *
                                        cfg.rooms.length
                                )}
                            </p>
                            <p className="mt-[-2px] text-md mb-0 text-red-500 font-medium line-through">
                                ${" "}
                                {Math.ceil(
                                    COMMISSION_RATE *
                                        room.RecommendedRetailPrice *
                                        cfg.rooms.length
                                )}
                            </p>
                        </div>
                    </>
                )}
                <button
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
                    // className={`mt-3 mb-0 g-sans bg-black text-white hover:bg-opacity-[0.98] rounded-md py-1.5 text-center whitespace-nowrap font-medium text-md`}
                    className={`mt-3 mb-0 g-sans text-center bg-black text-white hover:bg-opacity-[0.98] rounded-full py-2 px-0 whitespace-nowrap font-medium text-base`}
                >
                    Reserve
                </button>
            </div>
            {/* <div className="ml-5 min-w-32 self-center flex items-center">
                            <button
                                style={{
                                    fontFamily: "blair-itc-medium",
                                }}
                                
                                className="transition mx-auto border border-blue-main p-1.5 mt-2  text-sm text-blue-main hover:bg-blue-main hover:text-white "
                            >
                                book room
                            </button>
                        </div> */}
        </div>
    );
};
