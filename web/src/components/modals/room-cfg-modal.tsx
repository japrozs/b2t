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
                                maxHeight: "35rem",
                            }}
                            className="w-full overflow-y-scroll  max-w-2xl rounded-lg space-y-4 bg-white p-5"
                        >
                            <RoomConfig
                                roomConfig={roomConfig}
                                setRoomConfig={setRoomConfig}
                            />
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
