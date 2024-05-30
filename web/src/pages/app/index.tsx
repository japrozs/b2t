import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { CityDropdown } from "@/components/ui/city-dropdown";
import RoomConfig from "@/components/ui/room-cfg";
import Datepicker from "react-tailwindcss-datepicker";
import { useLogoutMutation } from "@/generated/graphql";
import { RoomCfgType } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FORMAT_GRAMMAR, nightsBetween } from "@/utils";
import { RoomCfgModal } from "@/components/modals/room-cfg-modal";
import { toast } from "sonner";

interface AppHomePageProps {}

const AppHomePage: React.FC<AppHomePageProps> = ({}) => {
    useIsAuth();
    const [city, setCity] = useState("LON");
    const [logout] = useLogoutMutation();
    const [value, setValue] = useState({
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
    });
    const client = useApolloClient();
    const [checkinDate, setCheckinDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [checkoutDate, setCheckoutDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [open, setOpen] = useState(false);
    const [roomConfig, setRoomConfig] = useState<RoomCfgType>({
        rooms: [
            {
                adults: 1,
                children: [
                    {
                        age: 6,
                    },
                ],
            },
        ],
    });
    const router = useRouter();

    useEffect(() => {
        console.log("roomCfg :: ", roomConfig);
    }, [roomConfig]);

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };

    return (
        <div>
            <Navbar />
            <main
                className="bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("/img/tokyo.jpg")`,
                    height: "550px",
                }}
            >
                <div className="h-full flex items-center max-w-[76rem] p-5 mx-auto">
                    <div className="w-full">
                        <p className="text-4xl font-semibold text-white drop-shadow-md mb-5">
                            Find hotels for your next trip
                        </p>
                        <div className="bg-white rounded-xl p-4 max-w-sm">
                            <CityDropdown
                                fullWidth
                                label="City"
                                city={city}
                                setCity={setCity}
                            />
                            <hr className="border-gray-200 mt-5 mb-2" />
                            <p className="text-gray-800 text-md font-semibold">
                                Dates
                            </p>
                            <div className="flex items-center">
                                <Datepicker
                                    primaryColor="blue"
                                    value={value}
                                    separator=" – "
                                    placeholder="DD-MM-YYYY to DD-MM-YYYY"
                                    displayFormat="DD-MM-YYYY"
                                    // disabledDates={[
                                    //     {
                                    //         startDate: "2024-05-30",
                                    //         endDate: "2024-05-30",
                                    //     },
                                    // ]}
                                    // asSingle={true}
                                    inputClassName={
                                        "outline-nonefocus:ring-2  datepicker-input"
                                    }
                                    minDate={
                                        // new Date(Date.now() - 24 * 60 * 60 * 1000)
                                        new Date(Date.now())
                                    }
                                    onChange={(val: any) => {
                                        if (val.startDate === val.endDate) {
                                            toast.error(
                                                "A stay of at least 1 night is required"
                                            );
                                            return;
                                        }
                                        console.log("val :: ", val);
                                        setValue(val);
                                    }}
                                />
                                <div className="w-max px-4 text-center">
                                    <p className="text-blue-500 text-lg font-semibold">
                                        {nightsBetween(
                                            new Date(value.startDate),
                                            new Date(value.endDate)
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {nightsBetween(
                                            new Date(value.startDate),
                                            new Date(value.endDate)
                                        ) === 1
                                            ? "night"
                                            : "nights"}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-200 mt-5 mb-2" />
                            <p className="text-gray-800 text-md font-semibold">
                                Rooms & persons
                            </p>
                            <p
                                onClick={() => setOpen(true)}
                                className="text-black cursor-pointer py-1.5 text-lg font-semibold"
                            >
                                {FORMAT_GRAMMAR(
                                    roomConfig.rooms
                                        .flatMap(
                                            (room) =>
                                                room.adults +
                                                room.children.length
                                        )
                                        .reduce((a, b) => a + b),
                                    "person"
                                )}{" "}
                                –{" "}
                                {FORMAT_GRAMMAR(
                                    roomConfig.rooms.length,
                                    "room"
                                )}
                            </p>
                            <button
                                onClick={() => {
                                    router.push(
                                        `/app/search?city=${city}&in=${
                                            value.startDate
                                        }&out=${
                                            value.endDate
                                        }&cfg=${JSON.stringify(roomConfig)}`
                                    );
                                }}
                                className="transition-all mt-2.5 bg-blue-600 w-full text-center py-2 rounded-lg text-white font-medium drop-shadow-sm hover:bg-opacity-95"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="items-start w-full">{/* <p>b</p> */}</div>
                </div>
            </main>
            <div className="max-w-[76rem] mx-auto mb-10">
                <div className="flex items-center w-full p-2">
                    <button
                        className="ml-auto mr-0 bg-red-500 rounded-md py-2 px-3 text-white font-medium text-xs"
                        onClick={logUserOut}
                    >
                        Logout
                    </button>
                </div>
                <input
                    className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="search country"
                />
                <input
                    className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={checkinDate}
                    type="date"
                    onChange={(e) => setCheckinDate(e.target.value)}
                    placeholder="check-in date"
                />
                <input
                    className="m-4 border border-gray-200 rounded-md text-sm py-1 px-2"
                    value={checkoutDate}
                    type="date"
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    placeholder="check-out date"
                />
                <button
                    className="bg-purple-500 rounded-md py-2 px-3 text-white font-medium text-xs"
                    onClick={() =>
                        router.push(
                            `/app/search?city=${city}&in=${checkinDate}&out=${checkoutDate}&cfg=${JSON.stringify(
                                roomConfig
                            )}`
                        )
                    }
                >
                    Search
                </button>
                <RoomConfig
                    roomConfig={roomConfig}
                    setRoomConfig={setRoomConfig}
                />
            </div>
            <RoomCfgModal
                open={open}
                setOpen={setOpen}
                roomConfig={roomConfig}
                setRoomConfig={setRoomConfig}
            />
            <Footer />
        </div>
    );
};

export default AppHomePage;
