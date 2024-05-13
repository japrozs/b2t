import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { url } = req.query;
    if (!url) {
        res.status(400).json({
            error: "Request 'url' not provided as an argument",
        });
    }
    if (req.method === "POST") {
        try {
            console.log("url :: ", url);
            const response = await axios.post(url as string, req.body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error(
                "Error fetching data:",
                (error as AxiosError).response?.data
            );
            res.status(500).json({ error });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
