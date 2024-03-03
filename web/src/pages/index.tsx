import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RoomCfgType } from "@/types";

export default function Home() {
    const [city, setCity] = useState("LON");
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
                children: 1,
            },
        ],
    });
    const router = useRouter();

    return (
        <div>
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
                        `search?city=${city}&in=${checkinDate}&out=${checkoutDate}&cfg=${JSON.stringify(
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
                                                room.children == 0 &&
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
                                        (room.children === 0 &&
                                            room.adults === 1)
                                            ? "cursor-not-allowed text-gray-500"
                                            : "text-blue-600"
                                    } cursor-pointer`}
                                />
                                <p className="select-none text-xl font-semibold">
                                    {room.adults}
                                </p>
                                <FaPlus
                                    onClick={() => {
                                        if (
                                            room.adults + room.children + 1 <=
                                            9
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            roomCpy[idx].adults += 1;
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.adults + room.children + 1 <= 9
                                            ? "text-blue-600"
                                            : "cursor-not-allowed text-gray-500"
                                    } cursor-pointer`}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <div>
                                <p className="select-none text-md font-medium">
                                    Children
                                </p>
                                <p className="select-none text-xs text-gray-400">
                                    Age 2 - 12
                                </p>
                            </div>
                            <div className="mx-auto rounded-md px-2 py-1.5 mr-0 flex items-center space-x-4">
                                <FaMinus
                                    onClick={() => {
                                        if (
                                            room.children != 0 &&
                                            !(
                                                room.children == 1 &&
                                                room.adults == 0
                                            )
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            roomCpy[idx].children -= 1;
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.children === 0 ||
                                        (room.children === 1 &&
                                            room.adults === 0)
                                            ? "cursor-not-allowed text-gray-500"
                                            : "text-blue-600"
                                    } cursor-pointer`}
                                />
                                <p className="select-none text-xl font-semibold">
                                    {room.children}
                                </p>
                                <FaPlus
                                    onClick={() => {
                                        if (
                                            room.adults + room.children + 1 <=
                                            9
                                        ) {
                                            const roomCpy = [
                                                ...roomConfig.rooms,
                                            ];
                                            roomCpy[idx].children += 1;
                                            setRoomConfig({ rooms: roomCpy });
                                        }
                                    }}
                                    className={`${
                                        room.adults + room.children + 1 <= 9
                                            ? "text-blue-600"
                                            : "cursor-not-allowed text-gray-500"
                                    } cursor-pointer`}
                                />
                            </div>
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
                        children: 0,
                    });
                    setRoomConfig({ rooms: roomCpy });
                }}
            >
                Add room
            </button>
        </div>
    );
}
