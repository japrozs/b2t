import request from "request";
import { Hotel } from "../entities/hotel";

const makeRequest = async (code: string, id: number) => {
    try {
        const response: request.Response = await new Promise(
            (resolve, reject) => {
                request(
                    {
                        method: "POST",
                        url: "https://api.iwtxconnect.com/api/v1/details",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            OutputFormat: "JSON",
                            Profile: {
                                Code: "DEV_IWTX",
                                Password: "D3V_1234",
                                TokenNumber:
                                    "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                            },
                            SearchCriteria: {
                                // HotelCode: hotel.code,
                                HotelCode: code,
                            },
                        }),
                    },
                    async (err, response) => {
                        if (err) reject(err);
                        resolve(response);
                    }
                );
            }
        );
        await Hotel.update(
            // { id: hotel.id },
            { id: id },
            {
                details: response.body,
            }
        );
    } catch (err) {
        console.log(
            // `Error for hotel code ${hotel.code} with id ${hotel.id} :: ${err}`
            `Error for hotel code ${code} with id ${id} :: ${err}`
        );
    }
};

export const refreshHotelDetails = async () => {
    const hotels = await Hotel.find({});
    const codes = [];
    for (let i = 0; i < hotels.length; i++) {
        setTimeout(() => {
            const hotel = hotels[i];
            // hotels.forEach(async (hotel: Hotel) => {
            // codes.forEach(async ({ code, id }) => {
            makeRequest(hotel.code, hotel.id);
        }, i * 500);
        // new Promise((resolve) => setTimeout(resolve, 1000));
        // });
    }
};
