import {
    RegularBookingFragment,
    useCancelBookingMutation,
} from "@/generated/graphql";
import { BookingDetailType } from "@/types";
import { Transition, Dialog, DialogPanel } from "@headlessui/react";
import React, {
    Dispatch,
    Fragment,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

interface CancelBookingModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    booking: RegularBookingFragment;
    details: BookingDetailType;
}

export const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
    open,
    setOpen,
    booking,
    details,
}) => {
    const [bookingNumberInput, setBookingNumberInput] = useState("");
    const [cancelBookingMut, { loading }] = useCancelBookingMutation();

    const cancelBooking = async () => {
        const obj = {
            id: booking.id,
            bookingNum: details.BookingDetails.BookingNumber,
            source: details.BookingDetails.Source,
            subResNum: details.HotelDetails.RoomDetails.map(
                (room) => room.SubResNo
            ).join(","),
        };
        console.log("req :: ", obj);
        const resp = await cancelBookingMut({
            variables: obj,
        });
        if (resp.data?.cancelBooking === true) {
            toast.success("Booking cancelled successfully");
        } else {
            // TODO: do something here;
            toast.error("An error occured. Please try again later.");
        }
        setOpen(false);
    };

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
                            className="w-full overflow-y-scroll py-4 max-w-lg rounded-lg p-5 bg-white"
                        >
                            <div className="flex items-center mb-2">
                                <p className="text-lg font-semibold">
                                    Are you sure?
                                </p>
                                <div
                                    onClick={() => setOpen(false)}
                                    className="cursor-pointer ml-auto mr-0 hover:bg-gray-100 rounded-full p-1"
                                >
                                    <IoMdClose className="text-xl text-gray-700" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-500">
                                This action{" "}
                                <span className="font-medium">
                                    cannot be undone
                                </span>
                                . Your booking will be cancelled permanently and
                                forever. To confirm this action, please type the
                                booking number (
                                <span className="text-sm menlo text-pink-500 bg-pink-50 py-0.5 px-1 rounded-md">
                                    {booking.id}
                                </span>
                                ) of your booking below
                            </p>
                            <div className="my-3.5">
                                <input
                                    value={bookingNumberInput}
                                    onChange={(e) =>
                                        setBookingNumberInput(e.target.value)
                                    }
                                    className={`menlo medium w-full text-gray-700 shadow-sm transition-all text-smol border placeholder-gray-300 py-1 px-3 bg-white rounded-md outline-none focus:ring-2 focus:ring-border-blue-100`}
                                    placeholder={"Booking no."}
                                />
                            </div>
                            <div className="mt-5 flex items-center">
                                <div className="ml-auto flex items-center">
                                    <button
                                        disabled={
                                            bookingNumberInput !==
                                                booking.id.toString() || loading
                                        }
                                        onClick={cancelBooking}
                                        className={`transition-all ease-soft-spring flex items-center ml-auto text-center ${
                                            bookingNumberInput !==
                                                booking.id.toString() || loading
                                                ? "cursor-disabled bg-gray-100 border border-gray-100 text-gray-300 cursor-not-allowed"
                                                : "bg-red-500 border border-red-500 hover:bg-opacity-[0.94] text-white cursor-pointer"
                                        } hover:bg-opacity-[0.96] rounded-md py-1.5 px-8 whitespace-nowrap font-medium text-sm`}
                                    >
                                        {loading
                                            ? "Loading..."
                                            : "Cancel Booking"}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition.Child>
        </Transition>
    );
};
