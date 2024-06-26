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

    // @UseMiddleware(isAuth)
    // @Mutation(() => Boolean)
    // async cancelBooking(
    //     @Arg("id", () => Int) id: number,
    //     @Arg("bookingNum", () => String) bookingNum: string,
    //     @Arg("subResNum", () => String) subResNum: string,
    //     @Arg("source", () => Int) source: number,
    //     @Ctx() { req }: Context
    // ) {
    //     // IOLX docs page 37 section 14 – if cancellation fails, we gotta call em up
    //     //                                and cancel the booking ourselves
    //     const booking = await Booking.findOne(id);
    //     if (booking?.creatorId !== req.session.userId) {
    //         return false;
    //     }

    //     const subResNumsSplit: string[] = subResNum.split(",");
    //     const retVals: boolean[] = [];
    //     subResNumsSplit.forEach((SResNum: string) => {
    //         const obj = {
    //             Profile: {
    //                 Password: process.env.IOLX_API_PASSWORD,
    //                 Code: process.env.IOLX_API_CODE,
    //                 TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
    //             },
    //             BookingDetails: {
    //                 Source: source,
    //                 BookingNumber: bookingNum,
    //                 SubResNo: SResNum,
    //             },
    //         };
    //         console.log(
    //             "cancelling room with data :: ",
    //             JSON.stringify(obj, null, 4)
    //         );
    //         axios
    //             .post("https://api.iwtxconnect.com/hotel/booking/cancel", obj)
    //             .then(async (response) => {
    //                 if (response.data.ErrorMessage) {
    //                     console.log(JSON.stringify(response.data.ErrorMessage));
    //                     retVals.push(false);
    //                     return;
    //                 }

    //                 console.log("IOLX response :: ", response.data);
    //                 await Booking.update(
    //                     { id: booking?.id },
    //                     {
    //                         cancelled: true,
    //                     }
    //                 );
    //                 retVals.push(true);
    //             })
    //             .catch(async (error) => {
    //                 console.log(error);
    //                 retVals.push(false);
    //             });
    //     });

    //     console.log("retVals :: ", retVals);
    //     return retVals.every((val) => val === true);
    // }
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async cancelBooking(
        @Arg("id", () => Int) id: number,
        @Arg("bookingNum", () => String) bookingNum: string,
        @Arg("subResNum", () => String) subResNum: string,
        @Arg("source", () => Int) source: number,
        @Ctx() { req }: Context
    ): Promise<boolean> {
        const booking = await Booking.findOne(id);
        if (booking?.creatorId !== req.session.userId) {
            return false;
        }

        const subResNumsSplit: string[] = subResNum.split(",");
        const results = await Promise.all(
            subResNumsSplit.map(async (SResNum: string) => {
                const obj = {
                    Profile: {
                        Password: process.env.IOLX_API_PASSWORD,
                        Code: process.env.IOLX_API_CODE,
                        TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                    },
                    BookingDetails: {
                        Source: source,
                        BookingNumber: bookingNum,
                        SubResNo: SResNum,
                    },
                };

                console.log(
                    "cancelling room with data :: ",
                    JSON.stringify(obj, null, 4)
                );

                try {
                    const response = await axios.post(
                        "https://api.iwtxconnect.com/hotel/booking/cancel",
                        obj
                    );
                    if (response.data.ErrorMessage) {
                        console.log(JSON.stringify(response.data.ErrorMessage));
                        return false;
                    }
                    console.log("IOLX response :: ", response.data);
                    await Booking.update(
                        { id: booking?.id },
                        { cancelled: true }
                    );
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            })
        );

        console.log("results :: ", results);
        return results.every((val) => val === true);
    }
}
