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
    const { hotelCodes, checkinDate, checkoutDate, adults, children } =
        req.query;
    if (!hotelCodes || !checkinDate || !checkoutDate || !adults || !children) {
        res.status(400).json({
            error: "did not receive an option for one of the above values. hotelCodes, checkinDate, checkoutDate, adults, city, children",
            err_msg: ";)",
        });
    }
    const options = {
        method: "POST",
        url: `https://api.iwtxconnect.com/hotel/api/v1/search`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Profile: {
                Password: "D3V_1234",
                Code: "DEV_IWTX",
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
            SearchCriteria: {
                RoomConfiguration: {
                    Room: [
                        {
                            Adult: [
                                {
                                    Age: 35,
                                },
                                {
                                    Age: 35,
                                },
                            ],
                        },
                    ],
                },
                StartDate: checkinDate,
                EndDate: checkoutDate,
                HotelCode: hotelCodes,
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
