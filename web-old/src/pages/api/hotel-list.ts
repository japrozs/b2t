import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";

type ResponseData = {
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { countryCode, pageNumber } = req.query;
    if (!countryCode || !pageNumber) {
        res.status(400).json({
            message: "did not receive an option for countryCode and pageNumber",
        });
    }
    const options = {
        method: "POST",
        url: `https://api.iwtxconnect.com/api/v1/hotellist?pageSize=100&RoomConfigurationId=1&pageNumber=${pageNumber}&countryCode=${countryCode}`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Profile: {
                Password: process.env.NEXT_PUBLIC_API_PASSWORD,
                Code: process.env.NEXT_PUBLIC_API_CODE,
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
        }),
    };

    request(options, function (error: any, response: any) {
        if (error) {
            res.status(400).json({ message: "Could not get hotel list" });
        }
        res.status(200).json(JSON.parse(response.body));
    });
}
