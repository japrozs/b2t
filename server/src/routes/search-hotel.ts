import axios from "axios";
import { Request, Response } from "express";
import { City } from "../entities/city";
import { formatRoomCfg } from "../utils/utils";
import { searchHotelSchema } from "../schemas/search-hotel-schema";
import { z } from "zod";
import { v4 } from "uuid";

export const searchHotel = async (req: Request, res: Response) => {
    try {
        const validatedBody = searchHotelSchema.parse(req.body);
        const { city, startDate, endDate, cfg } = validatedBody;
        console.log(req.body);
        const searchCity = await City.findOne({
            where: { code: city },
            relations: ["hotels"],
        });
        console.log("body : ", {
            Profile: {
                Password: process.env.IOLX_API_PASSWORD,
                Code: process.env.IOLX_API_CODE,
                TokenNumber: v4(),
            },
            SearchCriteria: {
                RoomConfiguration: {
                    Room: JSON.stringify(formatRoomCfg(JSON.parse(cfg))),
                },
                StartDate: startDate.replaceAll("-", ""),
                EndDate: endDate.replaceAll("-", ""),
                HotelCode: searchCity?.hotels
                    .map((hotel) => hotel.code)
                    .join(", "),
                // TODO: THIS IS NATIONALITY OF TRAVELLER, probably don't hardcode it
                Nationality: "LON",
                GroupByRooms: "Y",
                CancellationPolicy: "Y",
            },
        });
        axios
            .post(`https://api.iwtxconnect.com/hotel/api/v1/search`, {
                Profile: {
                    Password: process.env.IOLX_API_PASSWORD,
                    Code: process.env.IOLX_API_CODE,
                    TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                },
                SearchCriteria: {
                    RoomConfiguration: {
                        Room: formatRoomCfg(JSON.parse(cfg)),
                    },
                    StartDate: startDate.replaceAll("-", ""),
                    EndDate: endDate.replaceAll("-", ""),
                    HotelCode: searchCity?.hotels
                        .map((hotel) => hotel.code)
                        .join(", "),
                    // TODO: THIS IS NATIONALITY OF TRAVELLER, probably don't hardcode it
                    Nationality: "IN",
                    GroupByRooms: "Y",
                    CancellationPolicy: "Y",
                },
            })
            .then((response) => {
                const result = JSON.parse(JSON.stringify(response.data));
                result.Hotels.Hotel.forEach((hotel: any) => {
                    hotel.details = JSON.parse(
                        searchCity?.hotels.filter(
                            (h) => h.code === hotel.HotelCode
                        )[0].details || "{}"
                    );
                    console.log(hotel.HotelCode, hotel.details);
                });
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(200).json({
                    Hotels: {
                        Hotel: [],
                    },
                    ErrorMessage: {
                        Error: {
                            Messages: error,
                        },
                    },
                });
            });
    } catch (err) {
        console.log(req.body);
        res.status(200).json({
            Hotels: {
                Hotel: [],
            },
            ErrorMessage: {
                Error: {
                    Messages: [err as z.ZodError].toString(),
                },
            },
        });
        return;
    }
};
