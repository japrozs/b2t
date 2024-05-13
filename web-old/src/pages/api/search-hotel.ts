import { RoomCfgType } from "@/types";
import { formatRoomCfg } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";

type ResponseData = {
    error: string;
    err_msg?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { hotelCodes, checkinDate, checkoutDate, cfg } = req.query;
    if (!hotelCodes || !checkinDate || !checkoutDate || cfg === undefined) {
        res.status(400).json({
            error: "did not receive an option for one of the above values. hotelCodes, checkinDate, checkoutDate, adults, city, children",
            err_msg: ";)",
        });
    }
    const roomCfg: RoomCfgType = JSON.parse((cfg as string) || "{}");
    const options = {
        method: "POST",
        url: `https://api.iwtxconnect.com/hotel/api/v1/search`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Profile: {
                Password: process.env.NEXT_PUBLIC_API_PASSWORD,
                Code: process.env.NEXT_PUBLIC_API_CODE,
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
            SearchCriteria: {
                RoomConfiguration: {
                    // TODO: use actual adults and children number
                    Room: formatRoomCfg(roomCfg),
                    // Room: [
                    //     {
                    //         Adult: [
                    //             {
                    //                 Age: 25,
                    //             },
                    //             {
                    //                 Age: 25,
                    //             },
                    //         ],
                    //     },
                    // ],
                },
                StartDate: checkinDate,
                EndDate: checkoutDate,
                HotelCode: hotelCodes,
                // THIS IS NATIONALITY OF TRAVELLER
                Nationality: "LON",
                GroupByRooms: "Y",
                CancellationPolicy: "Y",
            },
        }),
    };

    request(options, function (error: Error, response: any) {
        if (error) {
            res.status(400).json({
                error: "Could not get hotel list",
                err_msg: error.message,
            });
        }
        res.status(200).json(JSON.parse(response.body));
    });
}
