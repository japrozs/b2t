import axios from "axios";
import { Request, Response } from "express";
import { City } from "../entities/city";
import { formatRoomCfg } from "../utils/utils";

export const searchHotel = async (req: Request, res: Response) => {
    const { city, startDate, endDate, cfg } = req.body;
    if (!city || !startDate || !endDate || !cfg) {
        console.log(req.body);
        res.status(200).json({
            Hotels: {
                Hotel: [],
            },
            ErrorMessage: {
                Error: {
                    Messages:
                        "One of the options between city, startDate, endDate or cfg weren't provided in the request body",
                },
            },
        });
        return;
    }
    const searchCity = await City.findOne({
        where: { code: city },
        relations: ["hotels"],
    });
    axios
        .post(`https://api.iwtxconnect.com/hotel/api/v1/search`, {
            Profile: {
                // TODO: change these to environment variables
                Password: "EybSIuEUqr9aaoPm",
                Code: "NobleTravels",
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
                Nationality: "LON",
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
};