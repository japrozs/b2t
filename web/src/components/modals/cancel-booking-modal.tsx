import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";

interface CancelBookingModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
    open,
    setOpen,
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
                                maxHeight: "44rem",
                            }}
                            className="w-full overflow-y-scroll py-4 max-w-5xl rounded-lg p-5 bg-white"
                        >
                            <p>cancel booking</p>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
