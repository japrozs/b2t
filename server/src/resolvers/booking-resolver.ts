import { Booking } from "../entities/booking";
import { isAuth } from "../middleware/is-auth";
import { Arg, Ctx, Query, UseMiddleware } from "type-graphql";
import { Context } from "../types";

export class BookingResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Booking])
    async getBookings(@Ctx() { req }: Context) {
        return Booking.find({
            where: { id: req.session.userId },
            relations: ["creator", "hotel"],
        });
    }
}
