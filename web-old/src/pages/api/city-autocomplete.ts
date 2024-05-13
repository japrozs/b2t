import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";

type ResponseData = {
    message: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { query } = req.query;
    if (!query) {
        res.status(400).json({ message: "Expected a query field" });
    }

    request(
        {
            url: "https://iolglobalb2bcloudssl.iolcloud.com/IWTXCall.aspx/GetCountryCity",
            headers: {
                accept: "application/json, text/javascript, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json; charset=UTF-8",
            },
            body: `{'ClientXid':'-1', 'ElementType':'H', 'IWTXYN':'Y', 'CityName':'${query}', 'HotelName':'', 'CityXid':'-1','ZoneXid':'-1','ODCompanyXid':'10427'}`,
            method: "POST",
        },
        function (error, response) {
            console.log(error, response);
            if (error) {
                res.status(404).json({ message: "An error occured" });
            } else {
                res.status(200).json(JSON.parse(response.body));
            }
        }
    );
}
