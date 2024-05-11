import { useGetCityQuery } from "@/generated/graphql";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    error: string;
    err_msg?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | {}>
) {
    const city = useGetCityQuery({
        variables: {
            code: "LON",
        },
    });
    return res.status(200).json({ city });
    // const hotel = useCheckoutStore((state) => state.hotel);
    // const room = useCheckoutStore((state) => state.room);
    // const cfg = useCheckoutStore((state) => state.cfg);
    // if (Object.keys(hotel).length === 0 || Object.keys(room).length === 0) {
    //     res.status(400).json({
    //         error: "either hotel state or room state in store is empty",
    //         err_msg: ";)",
    //     });
    // }

    // res.status(200).json({
    //     hotel,
    //     room,
    //     cfg,
    // });

    // request(options, function (error: Error, response: any) {
    //     if (error) {
    //         res.status(400).json({
    //             error: "Could not get hotel list",
    //             err_msg: error.message,
    //         });
    //     }
    //     res.status(200).json(JSON.parse(response.body));
    // });
}
