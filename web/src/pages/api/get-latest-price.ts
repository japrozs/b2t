import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";

type ResponseData = {
    error: string;
    err_msg?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | {}>
) {
    const { startDate, endDate, hotelCode, cfg } = req.query;
    if (!hotelCode || !startDate || !endDate || cfg === undefined) {
        res.status(400).json({
            error: "did not receive an option for one of the above values. hotelCode, startDate, endDate or cfg",
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
            OutputFormat: "JSON",
            Profile: {
                Password: process.env.NEXT_PUBLIC_API_PASSWORD,
                Code: process.env.NEXT_PUBLIC_API_CODE,
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
            SearchCriteria: {
                RoomConfiguration: {
                    Room: JSON.parse((cfg as string) || "{}"),
                },
                StartDate: startDate,
                EndDate: endDate,
                HotelCode: hotelCode,
                City: "LON",
                // THIS IS NATIONALITY OF TRAVELLER
                Nationality: "LON",
                IncludeRateDetails: "Y",
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
