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
            {roomConfig.rooms.map(
                (room: RoomCfgType["rooms"][0], idx: number) => (
                    <div
                        key={idx}
                        className="border border-gray-200 p-1.5 m-4 max-w-sm"
                    >
                        <p className="text-lg font-semibold mb-2.5">
                            Room {idx + 1}
                        </p>
                        <div className="flex items-center">
                            <div>
                                <p className="text-md font-medium">Adult</p>
                                <p className="text-xs text-gray-400">Age 12+</p>
                            </div>
                            <div className="mx-auto rounded-md px-2 py-1.5 mr-0 flex items-center space-x-4">
                                <FaMinus
                                    onClick={() => {
                                        if (
                                            room.adults != 0 &&
                                            !(
                                                room.children.length == 0 &&
                                                room.adults == 1
                                            )
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            roomCpy[idx].adults -= 1;
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.adults === 0 ||
                                        (room.children.length === 0 &&
                                            room.adults === 1)
                                            ? "cursor-not-allowed text-gray-500"
                                            : "text-blue-600 cursor-pointer"
                                    }`}
                                />
                                <p className=" text-xl font-semibold">
                                    {room.adults}
                                </p>
                                <FaPlus
                                    onClick={() => {
                                        if (
                                            room.adults +
                                                room.children.length +
                                                1 <=
                                            4
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            roomCpy[idx].adults += 1;
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.adults +
                                            room.children.length +
                                            1 <=
                                        4
                                            ? "text-blue-600 cursor-pointer"
                                            : "cursor-not-allowed text-gray-500"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <div>
                                <p className=" text-md font-medium">Children</p>
                                <p className=" text-xs text-gray-400">
                                    Age 2 - 12
                                </p>
                            </div>
                            <div className="mx-auto rounded-md px-2 py-1.5 mr-0 flex items-center space-x-4">
                                <FaMinus
                                    onClick={() => {
                                        if (
                                            room.children.length != 0 &&
                                            !(
                                                room.children.length == 1 &&
                                                room.adults == 0
                                            )
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            // roomCpy[idx].children -= 1;
                                            roomCpy[idx].children.pop();
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.children.length === 0 ||
                                        (room.children.length === 1 &&
                                            room.adults === 0)
                                            ? "cursor-not-allowed text-gray-500"
                                            : "text-blue-600 cursor-pointer"
                                    }`}
                                />
                                <p className=" text-xl font-semibold">
                                    {room.children.length}
                                </p>
                                <FaPlus
                                    onClick={() => {
                                        if (
                                            room.adults +
                                                room.children.length +
                                                1 <=
                                            4
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            // roomCpy[idx].children += 1;
                                            roomCpy[idx].children.push({
                                                age: 6,
                                            });
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.adults +
                                            room.children.length +
                                            1 <=
                                        4
                                            ? "text-blue-600 cursor-pointer"
                                            : "cursor-not-allowed text-gray-500"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="my-5">
                            {room.children.map(
                                (child: { age: number }, i: number) => (
                                    <div
                                        key={i}
                                        className="my-1 flex items-center"
                                    >
                                        <p className=" text-md font-medium">
                                            Child {i + 1} age
                                        </p>
                                        <input
                                            className="ml-auto my-0.5 border border-gray-200 w-20 rounded-md text-sm py-1 px-2"
                                            value={child.age}
                                            type="number"
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) <
                                                        1 ||
                                                    parseInt(e.target.value) >
                                                        12
                                                ) {
                                                    return;
                                                }
                                                console.log(
                                                    "old roomConfig :: ",
                                                    roomConfig
                                                );
                                                const roomCpy = [
                                                    ...roomConfig.rooms,
                                                ];
                                                roomCpy[idx].children[i].age =
                                                    parseInt(e.target.value);
                                                setRoomConfig({
                                                    rooms: roomCpy,
                                                });
                                                console.log(
                                                    "new roomConfig :: ",
                                                    roomConfig
                                                );
                                            }}
                                            placeholder={`child ${i + 1} age`}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        {idx != 0 && (
                            <button
                                className="bg-red-500 flex self-center ml-auto mr-0 mt-4 rounded-md py-2 px-3 text-white font-medium text-xs"
                                onClick={() => {
                                    const roomCpy = [...roomConfig.rooms];
                                    roomCpy.splice(1, idx);
                                    setRoomConfig({ rooms: roomCpy });
                                }}
                            >
                                Remove room
                            </button>
                        )}
                    </div>
                )
            )}
            <button
                className="bg-purple-500 ml-4 rounded-md py-2 px-3 text-white font-medium text-xs"
                onClick={() => {
                    const roomCpy = [...roomConfig.rooms];
                    roomCpy.push({
                        adults: 1,
                        children: [{ age: 5 }],
                    });
                    setRoomConfig({ rooms: roomCpy });
                }}
            >
                Add room
            </button>
        </div>
    );
};

export default AppHomePage;
