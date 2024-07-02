import { z } from "zod";

export const passengerInfoSchema = z.union([
    z.array(
        z.object({
            title: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            age: z.string(),
            nationality: z.string(),
            gender: z.string(),
        })
    ),
    z.null(),
]);

// TODO: add rate to this structure (api guide page 32)
export const createBookingSchema = z.object({
    adultsData: z.array(passengerInfoSchema),
    childrenData: z.array(passengerInfoSchema),
    startDate: z.number(),
    endDate: z.number(),
    hotelCode: z.string(),
    RoomTypeCode: z.number(),
    MealPlanCode: z.string(),
    Rate: z.number(),
    TotalBookingAmount: z.number(),
    PaymentMethodId: z.string(),
    ContractTokenId: z.string(),
    roomDetails: z.string(),
    // cfg: z.string(),
});
