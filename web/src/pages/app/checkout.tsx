// import { useCheckoutStore } from "@/store";
import { useCheckoutStore } from "../../store/provider";
import {
    HotelSearchItemType,
    HotelSearchResult,
    RoomCfgType,
    RoomDetailType,
} from "@/types";
import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import useSWR from "swr";
import {
    FORMAT_GRAMMAR,
    IS_EMPTY,
    formatCfg,
    getPricePerNightPerRoom,
    getPricePerNightPerRoomCheckout,
    getRRPPricePerNightPerRoom,
    getRRPTotalPrice,
    getTotalPrice,
    getTotalPriceCheckout,
    nightsBetween,
    parseDate,
    submitButtonDisabledFn,
} from "../../utils";
import Select from "react-select";
import { useIsAuth } from "@/utils/use-is-auth";
import axios from "axios";
import { PersonDetailsCfg } from "@/components/ui/person-details-cfg";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";
import { IoLocationOutline } from "react-icons/io5";
import { COMMISSION_RATE } from "@/constants";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCheck } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { Spinner } from "@/components/shared/spinner";
import { Checkbox } from "@headlessui/react";
import { GrCheckmark } from "react-icons/gr";
import { Hotel } from "@/generated/graphql";
import moment from "moment";
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardElement, loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "@/components/ui/payment-form";
import { CheckoutSidebar } from "@/components/ui/checkout-sidebar";

interface CheckoutProps {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Checkout: React.FC<CheckoutProps> = ({}) => {
    useIsAuth();
    const { hotel, room, cfg } = useCheckoutStore((state) => state);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [latestHotel, setLatestHotel] = useState<HotelSearchResult>({
        Hotels: {
            Hotel: [],
        },
    });
    const [adultsData, setAdultsData] = useState<any[]>([]);
    const [childrenData, setChildrenData] = useState<any[]>([]);
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();

    console.log("zustand.hotel :: ", hotel);
    console.log("zustand.room :: ", room);
    console.log("zustand.cfg :: ", cfg);

    const handleAdultDataChange = (
        data: any,
        roomIndex: number,
        adultIndex: number
    ) => {
        const updatedAdultsData = [...adultsData];
        if (!updatedAdultsData[roomIndex]) {
            updatedAdultsData[roomIndex] = [];
        }
        updatedAdultsData[roomIndex][adultIndex] = data;
        setAdultsData(updatedAdultsData);
        console.log(childrenData, adultsData);
    };

    const handleChildDataChange = (
        data: any,
        roomIndex: number,
        childIndex: number
    ) => {
        const updatedChildrenData = [...childrenData];
        if (!updatedChildrenData[roomIndex]) {
            updatedChildrenData[roomIndex] = [];
        }
        updatedChildrenData[roomIndex][childIndex] = data;
        setChildrenData(updatedChildrenData);
        console.log(childrenData, adultsData);
    };

    useEffect(() => {
        if (
            Object.keys(hotel).length === 0 ||
            Object.keys(room).length === 0 ||
            Object.keys(cfg).length === 0
        ) {
            return;
        }
        setIsLoading(true);
        axios
            .post("/check-availability", {
                city: (hotel as HotelSearchItemType).City,
                startDate: (hotel as HotelSearchItemType).StartDate,
                endDate: (hotel as HotelSearchItemType).EndDate,
                hotelCode: (hotel as HotelSearchItemType).HotelCode,
                RoomTypeCode: (room as RoomDetailType).RoomTypeCode,
                MealPlanCode: (room as RoomDetailType).MealPlanCode,
                ContractTokenId: (room as RoomDetailType).ContractTokenId,
                cfg: JSON.stringify(cfg),
            })
            .then((response) => {
                if (
                    JSON.stringify(response.data) !==
                    JSON.stringify(latestHotel)
                ) {
                    setLatestHotel(response.data);
                    console.log("room.Rate : ", (room as RoomDetailType).Rate);
                    // setRoom(
                    //     (response.data as HotelSearchResult).Hotels.Hotel[0]
                    //         .RoomTypeDetails.Rooms.Room[0]
                    // );
                    console.log("room.Rate : ", (room as RoomDetailType).Rate);
                }
                console.log("check-avaiability response :: ", response);
                console.log("here . response :: ", response.data);
                if (
                    response.data.Hotels.Hotel.length === 0 &&
                    response.data.ErrorMessage?.Error.Messages.length !== 0
                ) {
                    toast.error(
                        `An error occured – ${response.data.ErrorMessage?.Error.Messages.join(
                            ", "
                        )}`
                    );
                    router.back();
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching latest hotel price:", error);
                setIsLoading(false);
            });

        axios
            .post("/create-payment-intent", {
                amount: 6999,
            })
            .then((response) => {
                if (response.data.client_secret) {
                    console.log("clientSecret before :: ", clientSecret);
                    setClientSecret(response.data.client_secret);
                    console.log("clientSecret after :: ", clientSecret);
                }
            })
            .catch((err) => {
                console.log("error fetching client secret for stripe -> ", err);
            });
        console.log("STRIPE :: ", stripePromise, clientSecret);
    }, [hotel, room, cfg]);

    return (
        <div>
            <Navbar />
            {isLoading || !clientSecret || !stripePromise ? (
                // {isLoading ||
                // (latestHotel.ErrorMessage?.Error.Messages.length as any) > 0 ||
                // latestHotel.Hotels.Hotel.length === 0 ? (
                <div className="h-screen">
                    <Spinner />
                </div>
            ) : (
                <div>
                    <Elements
                        stripe={stripePromise}
                        // options={{ clientSecret }}
                    >
                        {latestHotel.Hotels.Hotel.length !== 0 ? (
                            <div className="mt-3 mb-10">
                                <div className="flex items-start max-w-[76rem] mx-auto space-x-10">
                                    <div className="w-9/12 p-2.5">
                                        {/* <p className="text-2xl font-semibold my-3">
                                {latestHotel.Hotels.Hotel[0].HotelName}
                            </p>
                            <hr className="mt-1.5 mb-4" /> */}
                                        <p className="text-2xl font-semibold mb-0">
                                            Room details
                                        </p>
                                        {(cfg as RoomCfgType).rooms.map(
                                            (cfgRoom, roomIndex) => (
                                                <div
                                                    key={roomIndex}
                                                    className="bg-gray-50 border border-gray-200 p-5 rounded-lg mt-3  mb-5"
                                                >
                                                    <p className="text-lg font-medium g-sans">
                                                        {
                                                            (
                                                                room as RoomDetailType
                                                            ).RoomType
                                                        }{" "}
                                                        –{" "}
                                                        <span className="text-gray-500 font-normal text-md">
                                                            {FORMAT_GRAMMAR(
                                                                cfgRoom.adults,
                                                                "adult"
                                                            )}{" "}
                                                            &{" "}
                                                            {FORMAT_GRAMMAR(
                                                                cfgRoom.adults,
                                                                "child",
                                                                "children"
                                                            )}
                                                        </span>
                                                    </p>
                                                    <hr className="mt-2 mb-3" />
                                                    <div className="bg-blue-50 border border-blue-400 rounded-lg py-2 px-3 mb-2">
                                                        <div className="flex items-center mb-1">
                                                            {(
                                                                room as RoomDetailType
                                                            ).MealPlan.toLowerCase() ===
                                                            "breakfast" ? (
                                                                <>
                                                                    <MdOutlineCheck className="text-lg text-emerald-600 mr-1.5" />
                                                                    <p className="text-sm text-gray-800 font-medium">
                                                                        Breakfast
                                                                        included
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <RxCross2 className="text-lg text-red-500 mr-1.5" />
                                                                    <p className="text-sm text-gray-800 font-medium">
                                                                        Breakfast
                                                                        not
                                                                        included
                                                                        (Room
                                                                        only)
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                        {(
                                                            room as RoomDetailType
                                                        ).NonRefundable ===
                                                        "N" ? (
                                                            <div className="flex items-center mt-0">
                                                                <MdOutlineCheck className="text-md mr-2 text-emerald-600" />
                                                                <p className="flex items-center font-medium text-sm text-emerald-600">
                                                                    Free
                                                                    cancellation
                                                                    before{" "}
                                                                    {moment(
                                                                        parseDate(
                                                                            (
                                                                                room as RoomDetailType
                                                                            ).CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                                                        )
                                                                    ).format(
                                                                        "D MMMM, YYYY"
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center mt-0">
                                                                <span className="ml-1 mr-3">
                                                                    •
                                                                </span>
                                                                <p className="font-medium text-gray-700 text-sm">
                                                                    Non-refundable
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {Array(cfgRoom.adults)
                                                        .fill(0)
                                                        .map(
                                                            (_, adultIndex) => (
                                                                <PersonDetailsCfg
                                                                    key={`adult-${roomIndex}-${adultIndex}`}
                                                                    personType="Adult"
                                                                    personIndex={
                                                                        adultIndex
                                                                    }
                                                                    onDataChange={(
                                                                        data
                                                                    ) =>
                                                                        handleAdultDataChange(
                                                                            data,
                                                                            roomIndex,
                                                                            adultIndex
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    {cfgRoom.children.map(
                                                        (child, childIndex) => (
                                                            <PersonDetailsCfg
                                                                key={`child-${roomIndex}-${childIndex}`}
                                                                personType="Child"
                                                                personIndex={
                                                                    childIndex
                                                                }
                                                                childAge={
                                                                    child.age
                                                                }
                                                                onDataChange={(
                                                                    data
                                                                ) =>
                                                                    handleChildDataChange(
                                                                        data,
                                                                        roomIndex,
                                                                        childIndex
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )
                                        )}
                                        <hr className="my-3" />
                                        <p className="text-2xl font-semibold mb-4">
                                            Payment details
                                        </p>
                                        <CardElement />
                                        {/* {clientSecret && stripePromise && (
                                        <div>
                                            <Elements
                                                stripe={stripePromise}
                                                // options={{ clientSecret }}
                                            >
                                                <PaymentForm
                                                    clientSecret={clientSecret}
                                                />
                                            </Elements>
                                        </div>
                                    )} */}
                                        {/* <div className="flex items-start">
                                <Checkbox
                                    checked={TandC}
                                    onChange={() => setTandC(!TandC)}
                                    className="mr-3 group size-[1.15rem] flex items-center justify-center rounded-md bg-white border border-gray-300 data-[checked]:border-gray-800 data-[checked]:bg-black"
                                >
                                    <GrCheckmark className="hidden text-white text-xs self-center group-data-[checked]:block" />
                                </Checkbox>
                                <p className="text-sm font-medium text-gray-700">

                                </p>
                            </div> */}
                                    </div>
                                    <div className="w-3/12 m-2.5 mx-0 py-2.5 sticky top-0">
                                        <CheckoutSidebar
                                            latestHotel={latestHotel}
                                            cfg={cfg as RoomCfgType}
                                            room={
                                                latestHotel.Hotels.Hotel[0].RoomTypeDetails.Rooms.Room.filter(
                                                    (r) =>
                                                        r.RoomTypeCode ===
                                                            (
                                                                room as RoomDetailType
                                                            ).RoomTypeCode &&
                                                        r.RoomType ===
                                                            (
                                                                room as RoomDetailType
                                                            ).RoomType
                                                )[0]
                                            }
                                            // room={room as RoomDetailType}
                                            adultsData={adultsData}
                                            childrenData={childrenData}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <img
                                    src="/img/404.png"
                                    className="my-[20vh] flex m-auto"
                                />
                                {/* <p>
                                    errors –
                                    {latestHotel.ErrorMessage?.Error.Messages.join(
                                        ", "
                                    )}
                                </p> */}
                            </div>
                        )}
                    </Elements>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Checkout;
