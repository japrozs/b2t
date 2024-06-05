import { RoomCfgType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";

interface RoomConfigProps {
    roomConfig: RoomCfgType;
    setRoomConfig: React.Dispatch<React.SetStateAction<RoomCfgType>>;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

const RoomConfig: React.FC<RoomConfigProps> = ({
    roomConfig,
    setRoomConfig,
    setOpen,
}) => {
    return (
        <div className="m-4">
            {/* TODO – make this look better please */}
            {/* confirm if there should be a minimum of one adult in a room */}
            {roomConfig.rooms.map(
                (room: RoomCfgType["rooms"][0], idx: number) => (
                    <div
                        key={idx}
                        className="border border-gray-200 p-4 mb-5 rounded-lg"
                    >
                        <p className="text-lg g-sans flex items-center font-medium mb-2.5">
                            <IoBedOutline className="text-gray-400 mr-2" />
                            Room {idx + 1}
                            {idx != 0 && (
                                <RiDeleteBin6Line
                                    onClick={() => {
                                        // TODO: this removes all rooms
                                        const roomCpy = [...roomConfig.rooms];
                                        console.log(roomCpy, idx);
                                        roomCpy.splice(idx, 1);
                                        setRoomConfig({ rooms: roomCpy });
                                    }}
                                    className="transition-all ml-auto mr-0 text-xl text-gray-400 hover:text-red-500 cursor-pointer"
                                />
                            )}
                        </p>
                        <hr className="mb-5" />
                        <div className="flex items-center divide-x-2 bg-gray-50 py-2 px-4 rounded-md">
                            <div className="w-full flex items-center pr-2.5">
                                <div>
                                    <p className="text-md font-medium">Adult</p>
                                    <p className="text-xs text-gray-400">
                                        Age 18+
                                    </p>
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
                                                setRoomConfig({
                                                    rooms: roomCpy,
                                                });
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
                                                setRoomConfig({
                                                    rooms: roomCpy,
                                                });
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
                            <div className="pl-5 w-full flex items-center">
                                <div>
                                    <p className=" text-md font-medium">
                                        Children
                                    </p>
                                    <p className=" text-xs text-gray-400">
                                        17 and below
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
                                                setRoomConfig({
                                                    rooms: roomCpy,
                                                });
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
                                                setRoomConfig({
                                                    rooms: roomCpy,
                                                });
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
                                            className="ml-5 my-0.5 border border-gray-200 w-20 rounded-md text-sm py-1 px-2"
                                            value={child.age}
                                            type="number"
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) <
                                                        1 ||
                                                    parseInt(e.target.value) >
                                                        17
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
                        {/* {idx != 0 && (
                            <button
                                className="bg-red-500 flex self-center ml-auto mr-0 mt-4 rounded-md py-2 px-3 text-white font-medium text-xs"
                                
                            >
                                Remove room
                            </button>
                        )} */}
                    </div>
                )
            )}
            <div className="flex items-center mt-10">
                <button
                    className={`g-sans text-center bg-[#086972] text-[#A7FF83] hover:bg-opacity-[0.98] rounded-md py-2 px-10 whitespace-nowrap font-medium text-md`}
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
                {setOpen && (
                    <button
                        className={`ml-auto mr-0 g-sans text-center bg-[#00395D] text-[#00AEEF] hover:bg-opacity-[0.98] rounded-md py-2 px-10 whitespace-nowrap font-medium text-md`}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};

export default RoomConfig;
