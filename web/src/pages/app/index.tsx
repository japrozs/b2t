import RoomConfig from "@/components/ui/room-cfg";
import { useLogoutMutation } from "@/generated/graphql";
import { RoomCfgType } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface AppHomePageProps {}

const AppHomePage: React.FC<AppHomePageProps> = ({}) => {
    useIsAuth();
    const [city, setCity] = useState("LON");
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    const [checkinDate, setCheckinDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [checkoutDate, setCheckoutDate] = useState(
        new Date().toISOString().split("T")[0]
    );
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
            <RoomConfig roomConfig={roomConfig} setRoomConfig={setRoomConfig} />
        </div>
    );
};

export default AppHomePage;
