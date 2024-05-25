import { z } from "zod";

export const checkAvailabilitySchema = z.object({
    city: z.string(),
    startDate: z.number(),
    endDate: z.number(),
    hotelCode: z.string(),
    RoomTypeCode: z.number(),
    MealPlanCode: z.string(),
    ContractTokenId: z.string(),
    cfg: z.string(),
});
