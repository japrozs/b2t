import axios from "axios";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { z } from "zod";
import { Booking } from "../entities/booking";
import { createBookingSchema } from "../schemas/create-booking-schema";
import { Hotel } from "../entities/hotel";

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

        // TODO: complete this

        console.log("paymentMethoId :: ", validatedBody.PaymentMethodId);
        console.log(
            "totalAmount to charge from stripe :: ",
            validatedBody.TotalBookingAmount
        );

        // res.status(200).json({
        //     status: "NOT_OK",
        //     error: {
        //         Errors: {
        //             Error: [
        //                 {
        //                     Msg: "hi there",
        //                 },
        //             ],
        //         },
        //     },
        // });

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
                    // TODO: update nationality dropdown items index and change this
                    Nationality: "IN",
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
                    // TODO: update nationality dropdown items index and change this
                    Nationality: "IN",
                    Gender: info?.gender,
                });
                paxNumber += 1;
            }
        }
        console.log(passengers);

        const hotel = await Hotel.findOne({
            code: validatedBody.hotelCode,
        });
        const booking = await Booking.create({
            creatorId: req.session.userId,
            hotelId: hotel?.id,
        }).save();

        const obj = {
            Profile: {
                Password: process.env.IOLX_API_PASSWORD,
                Code: process.env.IOLX_API_CODE,
                TokenNumber: v4(),
            },
            Passengers: passengers,
            HotelDetails: {
                StartDate: validatedBody.startDate,
                EndDate: validatedBody.endDate,
                HotelCode: validatedBody.hotelCode,
                AgencyRef: `nt-${booking.id}`,
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
        };

        console.log("create booking body :: ", obj);

        axios
            .post(`https://api.iwtxconnect.com/hotel/book`, obj)
            .then(async (response) => {
                if (response.data.ErrorMessage) {
                    await Booking.delete({ id: booking.id });
                    res.status(200).json({
                        status: "NOT_OK",
                        error: response.data.ErrorMessage,
                    });
                    return;
                }

                await Booking.update(
                    { id: booking.id },
                    {
                        details: JSON.stringify(response.data),
                        roomDetails: validatedBody.roomDetails,
                    }
                );
                res.status(200).json({ status: "OK", ...response.data });
            })
            .catch(async (error) => {
                await Booking.delete({ id: booking.id });
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
