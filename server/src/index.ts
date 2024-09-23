import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { City } from "./entities/city";
import { Hotel } from "./entities/hotel";
import { User } from "./entities/user";
import { CityResolver } from "./resolvers/city-resolver";
import { UserResolver } from "./resolvers/user-resolver";
import { expressIsAuth } from "./middleware/is-auth";
import { searchHotel } from "./routes/search-hotel";
import bodyParser from "body-parser";
import { checkAvailability } from "./routes/check-availability";
import { createBooking } from "./routes/create-booking";
import { Booking } from "./entities/booking";
// import { refreshDatabaseWithNewHotels } from "./utils/refresh-db";
import { refreshHotelDetails } from "./utils/refresh-details";
import { BookingResolver } from "./resolvers/booking-resolver";
import { createPaymentIntent, pay } from "./routes/create-payment-intent";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, City, Hotel, Booking],
    });
    await conn.runMigrations();
    // await Booking.delete({});
    // (await Hotel.find({ where: { details: "{}" } })).forEach((hotel: Hotel) => {
    //     console.log({
    //         code: hotel.code,
    //         id: hotel.id,
    //     });
    // });

    // hotels in BOMBAY
    const city = await Hotel.find({ where: { cityId: 171 } });

    console.log(await User.find({ where: { id: 1 } }));

    console.log(city.length);

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );
    app.use(bodyParser.json());

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__,
                domain: __prod__ ? ".bid2travel.com" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [CityResolver, UserResolver, BookingResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });

    // app.use("/upload/", avatarUpload);

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    // TODO: run this function every day instead
    // THESE FIX ARE HIGHLY UNSTABLE AND NEED TO BE FIXED BEFORE SHIPPING TO PRODUCTION
    // refreshDatabaseWithNewHotels();
    // refreshHotelDetails();

    app.post("/api/search-hotel", expressIsAuth, searchHotel);
    app.post("/api/check-availability", expressIsAuth, checkAvailability);
    app.post("/api/create-booking", expressIsAuth, createBooking);
    app.post("/api/create-payment-intent", expressIsAuth, createPaymentIntent);
    app.post("/api/pay", expressIsAuth, pay);

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on localhost:${process.env.PORT}`);
    });
};

main().catch((err: Error) => {
    console.error(err.message);
});
