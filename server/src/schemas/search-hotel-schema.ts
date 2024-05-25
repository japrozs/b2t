import { z } from "zod";

export const searchHotelSchema = z.object({
    city: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    cfg: z.string(),
});
