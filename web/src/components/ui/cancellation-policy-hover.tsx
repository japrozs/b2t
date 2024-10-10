import React from "react";
import { Popper } from "./popper";
import { parseDate, FORMAT_GRAMMAR } from "@/utils";
import moment from "moment";
import { LuBadgeInfo } from "react-icons/lu";
import { MdOutlineCheck } from "react-icons/md";
import { RoomDetailType } from "@/types";

interface CancellationPolicyHoverProps {
    room: RoomDetailType;
}

export const CancellationPolicyHover: React.FC<
    CancellationPolicyHoverProps
> = ({ room }) => {
    return (
        <Popper
            panelShadow
            button={({ open }) => (
                <LuBadgeInfo className={`text-blue-600 text-md ml-2`} />
            )}
            panel={() => (
                <div className="bg-white w-96 p-4 flex items-start">
                    <div className="py-1 pr-2">
                        <MdOutlineCheck className="text-md text-emerald-600" />
                    </div>
                    <div>
                        <p className="flex items-center font-medium text-sm text-emerald-600">
                            Free cancellation before{" "}
                            {moment(
                                parseDate(
                                    room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                )
                            ).format("D MMMM, YYYY")}
                        </p>
                        <p className="text-sm text-gray-700 font-normal mt-1">
                            You may cancel free of charge until{" "}
                            <span className="font-medium">23:59</span> on{" "}
                            <span className="font-medium">
                                {moment(
                                    parseDate(
                                        room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                    )
                                )
                                    .subtract(1, "days")
                                    .format("D MMMM, YYYY")}
                            </span>
                            . You will be charged{" "}
                            {room.CancellationPolicyDetails.Cancellation[0]
                                .NightToCharge
                                ? `the cost
                                                                    of ${FORMAT_GRAMMAR(
                                                                        room
                                                                            .CancellationPolicyDetails
                                                                            .Cancellation[0]
                                                                            .NightToCharge,
                                                                        "night"
                                                                    )}`
                                : room.CancellationPolicyDetails.Cancellation[0]
                                      .PercentOrAmt === "P"
                                ? `${Math.round(
                                      parseFloat(
                                          room.CancellationPolicyDetails
                                              .Cancellation[0].Value || ""
                                      )
                                  )}% of the booking amount`
                                : `\$ ${Math.round(
                                      parseFloat(
                                          room.CancellationPolicyDetails
                                              .Cancellation[0].Value || ""
                                      )
                                  )}`}{" "}
                            if you cancel on or after{" "}
                            <span className="font-medium">00:00</span> on{" "}
                            <span className="font-medium">
                                {moment(
                                    parseDate(
                                        room.CancellationPolicyDetails.Cancellation[0].FromDate.toString()
                                    )
                                ).format("D MMMM, YYYY")}
                            </span>
                            . If you don't show up, the no-show fee will be the
                            same as the cancellation fee.
                        </p>
                    </div>
                </div>
            )}
        />
    );
};
