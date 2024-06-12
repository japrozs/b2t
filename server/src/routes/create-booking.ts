import axios from "axios";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { z } from "zod";
import { Booking } from "../entities/booking";
import { createBookingSchema } from "../schemas/create-booking-schema";

interface CheckoutInfoDataType {
    title: string;
    firstName: string;
    lastName: string;
    age: string;
    nationality: string;
    gender: string;
}

export const createBooking = async (req: Request, res: Response) => {
    try {
        const validatedBody = createBookingSchema.parse(req.body);

        // TODO: find a way to rewrite this routine
        let paxNumber = 1;
        const passengers = [];
        for (let i = 0; i < validatedBody.adultsData.length; ++i) {
            if (validatedBody.adultsData[i] === null) {
                continue;
            }
            const room = validatedBody.adultsData[
                i
            ] as (CheckoutInfoDataType | null)[];
            for (let k = 0; k < room.length; ++k) {
                const info = room[k];
                passengers.push({
                    PaxNumber: paxNumber,
                    RoomNo: i + 1,
                    Title: info?.title,
                    PassengerType: "ADT",
                    Age: info?.age,
                    FirstName: info?.firstName,
                    LastName: info?.lastName,
                    Nationality: info?.nationality,
                    Gender: info?.gender,
                });
                paxNumber += 1;
            }
        }
        for (let i = 0; i < validatedBody.childrenData.length; ++i) {
            if (validatedBody.childrenData[i] === null) {
                continue;
            }
            const room = validatedBody.childrenData[
                i
            ] as (CheckoutInfoDataType | null)[];
            for (let k = 0; k < room.length; ++k) {
                const info = room[k];
                passengers.push({
                    PaxNumber: paxNumber,
                    RoomNo: i + 1,
                    Title: info?.title,
                    PassengerType: "CHD",
                    Age: info?.age,
                    FirstName: info?.firstName,
                    LastName: info?.lastName,
                    Nationality: info?.nationality,
                    Gender: info?.gender,
                });
                paxNumber += 1;
            }
        }
        console.log(passengers);
        const agencyRefId = v4().slice(0, 20);
        axios
            .post(`https://api.iwtxconnect.com/hotel/book`, {
                Profile: {
                    // TODO: use environment variables
                    Password: "EybSIuEUqr9aaoPm",
                    Code: "NobleTravels",
                    TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                },
                Passengers: passengers,
                HotelDetails: {
                    StartDate: validatedBody.startDate,
                    EndDate: validatedBody.endDate,
                    HotelCode: validatedBody.hotelCode,
                    AgencyRef: agencyRefId,
                    RoomDetails: {
                        room: validatedBody.adultsData.map((_, i: number) => ({
                            roomTypeCode: validatedBody.RoomTypeCode,
                            contractTokenId: validatedBody.ContractTokenId,
                            mealPlanCode: validatedBody.MealPlanCode,
                            roomConfigurationId: i + 1,
                            rate: validatedBody.Rate,
                            currencyCode: "USD",
                        })),
                    },
                },
            })
            .then(async (response) => {
                if (response.data.ErrorMessage) {
                    res.status(200).json({
                        status: "NOT_OK",
                        error: response.data.ErrorMessage,
                    });
                    return;
                }
                await Booking.create({
                    id: agencyRefId,
                    details: JSON.stringify(response.data),
                    creatorId: req.session.userId,
                }).save();
                res.status(200).json({ status: "OK", ...response.data });
            })
            .catch((error) => {
                console.log(error);
                res.status(200).json({
                    status: "NOT_OK",
                    error,
                });
            });
    } catch (err) {
        res.status(200).json({
            error: (err as z.ZodError).toString(),
        });
    }
};
