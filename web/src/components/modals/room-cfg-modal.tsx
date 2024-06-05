import React, { Dispatch, Fragment, SetStateAction } from "react";
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { RoomCfgType } from "@/types";
import RoomConfig from "../ui/room-cfg";
import { RxCross2 } from "react-icons/rx";
import { FORMAT_GRAMMAR } from "@/utils";

interface RoomCfgModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    roomConfig: RoomCfgType;
    setRoomConfig: Dispatch<SetStateAction<RoomCfgType>>;
}

export const RoomCfgModal: React.FC<RoomCfgModalProps> = ({
    open,
    setOpen,
    roomConfig,
    setRoomConfig,
}) => {
    return (
        <Transition appear show={open}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    className="relative z-50"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />

                    {/* Full-screen container to center the panel */}
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        {/* The actual dialog panel  */}
                        <DialogPanel
                            style={{
                                maxHeight: "39rem",
                            }}
                            className="w-full overflow-y-scroll py-4 max-w-2xl rounded-lg space-y-4 bg-white"
                        >
                            <div className="flex items-center px-4">
                                <p className="text-lg flex items-center g-sans font-medium">
                                    Rooms
                                    <span className="text-gray-600 mx-2 font-normal">
                                        ––
                                    </span>
                                    <span className="text-gray-600 font-normal">
                                        {FORMAT_GRAMMAR(
                                            roomConfig.rooms.length,
                                            "room"
                                        )}{" "}
                                        (
                                        {FORMAT_GRAMMAR(
                                            roomConfig.rooms
                                                .flatMap((room) => room.adults)
                                                .reduce((a, b) => a + b),
                                            "adult"
                                        )}
                                        ,{" "}
                                        {FORMAT_GRAMMAR(
                                            roomConfig.rooms
                                                .flatMap(
                                                    (room) =>
                                                        room.children.length
                                                )
                                                .reduce((a, b) => a + b),
                                            "child",
                                            "children"
                                        )}
                                        )
                                    </span>
                                </p>
                                <RxCross2
                                    onClick={() => setOpen(false)}
                                    className="transition-all ml-auto text-2xl text-gray-400 hover:text-blue-600 cursor-pointer"
                                />
                            </div>
                            <RoomConfig
                                roomConfig={roomConfig}
                                setRoomConfig={setRoomConfig}
                                setOpen={setOpen}
                            />
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
