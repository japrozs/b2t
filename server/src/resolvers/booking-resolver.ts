import { Booking } from "../entities/booking";
import { isAuth } from "../middleware/is-auth";
import { Arg, Ctx, Int, Mutation, Query, UseMiddleware } from "type-graphql";
import { Context } from "../types";
import axios from "axios";

export class BookingResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Booking])
    async getBookings(@Ctx() { req }: Context) {
        return Booking.find({
            where: { creatorId: req.session.userId },
            relations: ["creator", "hotel"],
            order: {
                createdAt: "DESC",
            },
        });
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async cancelBooking(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: Context
    ) {
        const booking = await Booking.findOne(id);
        if (booking?.creatorId !== req.session.userId) {
            return false;
        }
        return true;
    }
}
