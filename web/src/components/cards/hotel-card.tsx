import {
    COMMISSION_RATE,
    HOTEL_FACILITY_FREE_WIFI_KEY,
    HOTEL_FACILITY_FRONT_DESK_KEY,
} from "@/constants";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "@/types";
import {
    FORMAT_GRAMMAR,
    getCheapestRoom,
    nightsBetween,
    parseDate,
} from "@/utils";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { LuBadgeInfo } from "react-icons/lu";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import {
    IoIosArrowUp,
    IoIosCheckmarkCircle,
    IoIosCloseCircle,
} from "react-icons/io";
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
import { FaWifi } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

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
        <div className="border border-gray-200 mb-5">
            <div className="p-[0.875rem] flex items-start">
                <img
                    className="w-48 h-48 object-cover"
                    src={
                        hotel.details.Details[0].Images.Img[0] ||
                        `https://previews.123rf.com/images/happyvector071/happyvector0711608/happyvector071160800591/62947847-abstract-creative-vector-design-layout-with-text-do-not-exist.jpg`
                    }
                />
                <div className="flex flex-col px-5 w-full self-stretch">
                    <h1 className="g-sans mb-1 text-xl text-blue-main font-medium flex items-center flex-wrap">
                        {/* <h1 className="libre text-2xl text-blue-main font-medium truncate text-ellipsis"> */}
                        {/* show full hotel name on hover */}
                        <div className="mr-1.5">{hotel.HotelName}</div>
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
                    <div className="border-l-2 px-2 mt-2.5 border-gray-300 mb-1">
                        {Array(1)
                            .fill(
                                getCheapestRoom(
                                    hotel.RoomTypeDetails.Rooms.Room
                                )
                            )
                            .map((r: RoomDetailType) => (
                                <>
                                    <p className="g-sans font-medium text-sm">
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
                    <div className="mt-auto mb-0 flex items-center">
                        {hotel.details.Details[0].HotelFacilities.Facility.includes(
                            HOTEL_FACILITY_FREE_WIFI_KEY
                        ) && (
                            <div className="p-1.5 flex items-center">
                                <FaWifi
                                    aria-label="Free Wi-Fi"
                                    className="text-xl text-blue-600"
                                />
                                <p className="ml-2 uppercase g-sans text-gray-600 font-semibold text-xs">
                                    Free Wi-Fi
                                </p>
                                <span className="ml-3 mr-1 text-gray-300">
                                    •
                                </span>
                            </div>
                        )}
                        {hotel.details.Details[0].HotelFacilities.Facility.includes(
                            HOTEL_FACILITY_FRONT_DESK_KEY
                        ) && (
                            <div className="p-1.5 pl-0 flex items-center">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-blue-600 h-5 w-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.244 14.156C14.0373 12.5158 13.2359 11.0084 11.9917 9.91981C10.7476 8.8312 9.14714 8.23703 7.494 8.25C5.80092 8.23903 4.1656 8.86501 2.9126 10.0037C1.65961 11.1424 0.880531 12.7106 0.73 14.397C0.712626 14.5949 0.774482 14.7916 0.901994 14.944C1.02951 15.0963 1.21225 15.1918 1.41013 15.2096C1.608 15.2273 1.80483 15.1659 1.95742 15.0386C2.11 14.9114 2.20588 14.7288 2.224 14.531C2.34173 13.218 2.94912 11.9973 3.9255 11.1115C4.90187 10.2257 6.17575 9.73971 7.494 9.75C8.78173 9.73763 10.0291 10.1987 10.9992 11.0457C11.9693 11.8926 12.5945 13.0664 12.756 14.344C12.767 14.4428 12.7975 14.5385 12.8458 14.6254C12.8941 14.7124 12.9592 14.7888 13.0373 14.8504C13.1154 14.9119 13.205 14.9573 13.3008 14.9839C13.3966 15.0105 13.4968 15.0178 13.5954 15.0053C13.6941 14.9928 13.7893 14.9609 13.8755 14.9113C13.9617 14.8617 14.0371 14.7954 14.0975 14.7164C14.1578 14.6374 14.2019 14.5471 14.227 14.4509C14.2522 14.3547 14.258 14.2545 14.244 14.156ZM10.125 4.125C10.125 4.46972 10.0571 4.81106 9.92518 5.12954C9.79327 5.44802 9.59991 5.7374 9.35616 5.98116C9.1124 6.22491 8.82302 6.41827 8.50454 6.55018C8.18606 6.6821 7.84472 6.75 7.5 6.75C7.15528 6.75 6.81394 6.6821 6.49546 6.55018C6.17698 6.41827 5.8876 6.22491 5.64384 5.98116C5.40009 5.7374 5.20673 5.44802 5.07482 5.12954C4.9429 4.81106 4.875 4.46972 4.875 4.125V1.5H10.125V4.125ZM11.625 4.125V1.5C11.625 1.10218 11.467 0.720644 11.1857 0.43934C10.9044 0.158035 10.5228 0 10.125 0L4.875 0C4.47718 0 4.09564 0.158035 3.81434 0.43934C3.53304 0.720644 3.375 1.10218 3.375 1.5V4.125C3.375 5.21902 3.8096 6.26823 4.58318 7.04182C5.35677 7.8154 6.40598 8.25 7.5 8.25C8.59402 8.25 9.64323 7.8154 10.4168 7.04182C11.1904 6.26823 11.625 5.21902 11.625 4.125ZM23.25 22.5H0.75L1.5 23.25V15.75C1.5 15.5511 1.57902 15.3603 1.71967 15.2197C1.86032 15.079 2.05109 15 2.25 15H21.75C21.9489 15 22.1397 15.079 22.2803 15.2197C22.421 15.3603 22.5 15.5511 22.5 15.75V23.25L23.25 22.5ZM23.25 24C23.4489 24 23.6397 23.921 23.7803 23.7803C23.921 23.6397 24 23.4489 24 23.25V15.75C24 15.1533 23.7629 14.581 23.341 14.159C22.919 13.7371 22.3467 13.5 21.75 13.5H2.25C1.65326 13.5 1.08097 13.7371 0.65901 14.159C0.237053 14.581 0 15.1533 0 15.75L0 23.25C0 23.664 0.336 24 0.75 24H23.25ZM4.376 5.017C5.37934 4.6697 6.43427 4.49489 7.496 4.5C8.56221 4.49406 9.62166 4.66957 10.629 5.019C10.817 5.08398 11.0232 5.0716 11.2021 4.98458C11.381 4.89756 11.518 4.74304 11.583 4.555C11.648 4.36696 11.6356 4.16081 11.5486 3.9819C11.4616 3.80299 11.307 3.66598 11.119 3.601C9.95465 3.19742 8.7303 2.99421 7.498 3C6.26912 2.99501 5.04824 3.19787 3.887 3.6C3.70467 3.66922 3.55647 3.80674 3.47384 3.9834C3.3912 4.16006 3.38064 4.36196 3.44437 4.54628C3.50811 4.7306 3.64114 4.88285 3.81525 4.97072C3.98936 5.0586 4.18986 5.0752 4.376 5.017ZM15.75 14.27C15.7712 13.4744 16.1076 12.7197 16.6852 12.1721C17.2629 11.6245 18.0344 11.3288 18.83 11.35C19.6256 11.3712 20.3803 11.7076 20.9279 12.2852C21.4755 12.8629 21.7712 13.6344 21.75 14.43C21.7474 14.5285 21.7642 14.6265 21.7994 14.7185C21.8347 14.8105 21.8877 14.8947 21.9555 14.9662C22.0233 15.0377 22.1045 15.0951 22.1945 15.1353C22.2845 15.1754 22.3815 15.1974 22.48 15.2C22.5785 15.2026 22.6765 15.1858 22.7685 15.1506C22.8605 15.1153 22.9447 15.0623 23.0162 14.9945C23.0877 14.9267 23.1451 14.8455 23.1853 14.7555C23.2254 14.6655 23.2474 14.5685 23.25 14.47C23.2818 13.2765 22.8382 12.1193 22.0168 11.2529C21.6101 10.8239 21.1229 10.4792 20.5829 10.2385C20.043 9.99776 19.4609 9.86576 18.87 9.85C18.2791 9.83424 17.6908 9.93503 17.1388 10.1466C16.5868 10.3582 16.0819 10.6764 15.6529 11.0832C14.7865 11.9046 14.2818 13.0365 14.25 14.23C14.2447 14.4289 14.3186 14.6218 14.4555 14.7662C14.5924 14.9106 14.7811 14.9947 14.98 15C15.1789 15.0053 15.3718 14.9314 15.5162 14.7945C15.6606 14.6576 15.7447 14.4689 15.75 14.27ZM19.5 10.5V8.25C19.5 8.05109 19.421 7.86032 19.2803 7.71967C19.1397 7.57902 18.9489 7.5 18.75 7.5C18.5511 7.5 18.3603 7.57902 18.2197 7.71967C18.079 7.86032 18 8.05109 18 8.25V10.5C18 10.6989 18.079 10.8897 18.2197 11.0303C18.3603 11.171 18.5511 11.25 18.75 11.25C18.9489 11.25 19.1397 11.171 19.2803 11.0303C19.421 10.8897 19.5 10.6989 19.5 10.5ZM17.25 9H20.25C20.4489 9 20.6397 8.92098 20.7803 8.78033C20.921 8.63968 21 8.44891 21 8.25C21 8.05109 20.921 7.86032 20.7803 7.71967C20.6397 7.57902 20.4489 7.5 20.25 7.5H17.25C17.0511 7.5 16.8603 7.57902 16.7197 7.71967C16.579 7.86032 16.5 8.05109 16.5 8.25C16.5 8.44891 16.579 8.63968 16.7197 8.78033C16.8603 8.92098 17.0511 9 17.25 9Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <p className="ml-2 uppercase g-sans text-gray-600 font-semibold text-xs">
                                    24H FRONT DESK
                                </p>
                                <span className="ml-3 mr-1 text-gray-300">
                                    •
                                </span>
                            </div>
                        )}
                        <p className="transition-all cursor-pointer font-medium text-blue-600 text-sm py-1 px-2 rounded-md bg-blue-50">
                            Facilities
                        </p>
                    </div>
                    {/* Show modal with hotel content full message */}
                    {/* show modal with all the pills when hovering on the facilities button */}
                    {/* <div className="mt-3.5 flex flex-wrap items-center">
                        {hotel.details.Details[0].HotelFacilities.Facility.slice(
                            0,
                            2
                        ).map((fac: string, idx: number) => (
                            <div key={idx} className="mr-1.5 mb-1.5">
                                <Pill colored label={fac} />
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="self-stretch text-right min-w-36 w-max flex flex-col">
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
                                            (getCheapestRoom(
                                                hotel.RoomTypeDetails.Rooms.Room
                                            ).TotalRate /
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
                                        (COMMISSION_RATE *
                                            getCheapestRoom(
                                                hotel.RoomTypeDetails.Rooms.Room
                                            ).RecommendedRetailPrice) /
                                            nightsBetween(
                                                parseDate(
                                                    hotel.StartDate.toString()
                                                ),
                                                parseDate(
                                                    hotel.EndDate.toString()
                                                )
                                            )
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
                                            getCheapestRoom(
                                                hotel.RoomTypeDetails.Rooms.Room
                                            ).TotalRate *
                                            cfg.rooms.length
                                    )}
                                </p>
                                <p className="mt-[-2px] text-md mb-0 text-red-500 font-medium line-through">
                                    ${" "}
                                    {Math.ceil(
                                        COMMISSION_RATE *
                                            getCheapestRoom(
                                                hotel.RoomTypeDetails.Rooms.Room
                                            ).RecommendedRetailPrice *
                                            cfg.rooms.length
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                    <p className="g-sans text-xs text-gray-400 font-medium mt-0">
                        Incl. taxes and fees
                    </p>
                    <button
                        onClick={() => setOpen(!open)}
                        className={`mt-auto mb-0 flex g-sans items-center bg-[#3073F0] text-white hover:bg-opacity-[0.98] rounded-md py-2 text-center justify-center whitespace-nowrap font-medium text-md w-full justify-center`}
                    >
                        {open ? "Less" : "More"} rooms
                        {open ? (
                            <IoIosArrowUp className="text-[16px] ml-2" />
                        ) : (
                            <IoIosArrowDown className="text-[16px] ml-2" />
                        )}
                    </button>
                </div>
            </div>
            {open &&
                hotel.RoomTypeDetails.Rooms.Room.map((room, idx: number) => (
                    <div
                        key={idx}
                        className="border border-gray-200 m-[0.875rem] p-3 flex items-start"
                    >
                        <div className="w-full">
                            <p className="g-sans text-lg flex items-center text-blue-main font-medium truncate text-ellipsis">
                                {room.RoomType}
                            </p>
                            {room.MealPlan.toLowerCase() === "breakfast" ? (
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
                                        Meal plan – {room.MealPlan}
                                    </p>
                                </div>
                            )}
                            {room.NonRefundable === "N" ? (
                                <div className="flex items-center mt-0">
                                    <MdOutlineCheck className="text-md mr-2 text-green-600" />
                                    <p className="font-medium text-sm text-green-600">
                                        Free cancellation before{" "}
                                        {moment(
                                            parseDate(
                                                room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
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
                            <div className="mt-3 flex items-center">
                                <p>i – contract message</p>
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
                                                parseDate(
                                                    hotel.StartDate.toString()
                                                ),
                                                parseDate(
                                                    hotel.EndDate.toString()
                                                )
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
                                className={`mt-3 mb-0 flex g-sans items-center bg-black text-white hover:bg-opacity-[0.98] rounded-md py-1.5 text-center whitespace-nowrap font-medium text-md  justify-center`}
                            >
                                Book room
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
                ))}
        </div>
    );
};
