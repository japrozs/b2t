import axios, { AxiosError } from "axios";
import { z } from "zod";
import { Request, Response } from "express";
import { Hotel } from "../entities/hotel";
import { formatRoomCfg } from "../utils/utils";
import { checkAvailabilitySchema } from "../schemas/check-availability-schema";
import { v4 } from "uuid";

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
        const obj = {
            Profile: {
                Password: process.env.IOLX_API_PASSWORD,
                Code: process.env.IOLX_API_CODE,
                // TODO: make this TokenNumber a uuid (first read what TokenNumber's actually supposed to be)
                TokenNumber: v4(),
            },
            SearchCriteria: {
                RoomConfiguration: {
                    Room: formattedCfg,
                },
                StartDate: startDate,
                EndDate: endDate,
                HotelCode: hotelCode,
                // TODO: THIS IS NATIONALITY OF TRAVELLER, probably don't hardcode it
                Nationality: "IN",
                City: city,
                GroupByRooms: "Y",
                CancellationPolicy: "Y",
            },
        };

        console.log("body :: ", JSON.stringify(obj, null, 4));
        axios
            .post(`https://api.iwtxconnect.com/hotel/availability`, obj)
            .then((response) => {
                if (response.data.ErrorMessage) {
                    console.log(
                        "error :: ",
                        response.data.ErrorMessage.Error.Messages
                    );
                    res.status(200).json({
                        Hotels: {
                            Hotel: [],
                        },
                        ErrorMessage: {
                            Error: {
                                Messages: [
                                    response.data.ErrorMessage.Error
                                        .Messages[0],
                                ],
                            },
                        },
                    });
                    return;
                }
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
