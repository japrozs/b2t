import axios, { AxiosError } from "axios";
import { z } from "zod";
import { Request, Response } from "express";
import { Hotel } from "../entities/hotel";
import { formatRoomCfg } from "../utils/utils";
import { checkAvailabilitySchema } from "../schemas/check-availability-schema";

export const checkAvailability = async (req: Request, res: Response) => {
    try {
        const validatedBody = checkAvailabilitySchema.parse(req.body);
        const {
            city,
            startDate,
            hotelCode,
            endDate,
            cfg,
            RoomTypeCode,
            MealPlanCode,
            ContractTokenId,
        } = validatedBody;

        console.log(req.body);

        const formattedCfg = formatRoomCfg(JSON.parse(cfg || "{}"));
        formattedCfg.forEach((c, i) => {
            (c as any).RoomTypeCode = RoomTypeCode;
            (c as any).MealPlanCode = parseInt(MealPlanCode);
            (c as any).ContractTokenId = parseInt(ContractTokenId);
            (c as any).RoomConfigurationId = i + 1;
        });

        const hotel = await Hotel.findOne({ code: hotelCode });
        axios
            .post(`https://api.iwtxconnect.com/hotel/availability`, {
                Profile: {
                    // TODO: change these to environment variables
                    Password: "EybSIuEUqr9aaoPm",
                    Code: "NobleTravels",
                    // TODO: make this TokenNumber a uuid (first read what TokenNumber's actually supposed to be)
                    TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                },
                SearchCriteria: {
                    RoomConfiguration: {
                        Room: formattedCfg,
                    },
                    StartDate: startDate,
                    EndDate: endDate,
                    HotelCode: hotelCode,
                    // TODO: THIS IS NATIONALITY OF TRAVELLER, probably don't hardcode it
                    Nationality: "LON",
                    City: city,
                    GroupByRooms: "Y",
                    CancellationPolicy: "Y",
                },
            })
            .then((response) => {
                const result = JSON.parse(JSON.stringify(response.data));
                result.Hotels.Hotel.forEach((h: any) => {
                    h.details = JSON.parse(hotel?.details || "{}");
                    console.log(h.HotelCode, hotel?.details);
                });
                res.status(200).json(result);
            })
            .catch((error: AxiosError) => {
                console.log("error :: ", error.response);
                res.status(200).json({
                    Hotels: {
                        Hotel: [],
                    },
                    ErrorMessage: {
                        Error: {
                            Messages: [error.response?.data],
                        },
                    },
                });
            });
    } catch (err) {
        console.log(req.body);
        res.status(500).json({
            Hotels: {
                Hotel: [],
            },
            ErrorMessage: {
                Error: {
                    Messages: [(err as z.ZodError).toString()],
                },
            },
        });
        return;
    }
};
