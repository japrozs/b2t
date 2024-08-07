import argon2 from "argon2";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entities/user";
// import { isAuth } from "../middleware/is-auth";
import { UserInput } from "../schemas/user-input";
import { Context } from "../types";
import { sendEmail } from "../utils/send-email";
import { validateRegister } from "../utils/validate-register";

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() { redis, req }: Context
    ): Promise<UserResponse> {
        if (newPassword.length <= 6) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "length must be greater than 6",
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum, {
            relations: [],
        });

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "user no longer exists",
                    },
                ],
            };
        }

        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            }
        );

        await redis.del(key);

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: Context
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return false;
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            "ex",
            1000 * 60 * 60 * 24 * 3
        ); // 3 days

        await sendEmail({
            subject: "Change your password",
            to: email,
            html: `<a href="${process.env.CORS_ORIGIN}/changepass/${token}">reset password</a>`,
        });

        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: Context) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UserInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        try {
            // TODO: SETUP A SYSTEM TO GET A PICTURE OF PAN CARD
            //       THIS IS CURRENTY INCOMPLETE!!!! FINISH IT
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    firstName: options.firstName,
                    lastName: options.lastName,
                    companyName: options.companyName,
                    number: options.number,
                    email: options.email,
                    PANNumber: options.PANNumber,
                    PANName: options.PANName,
                    GSTNumber: options.GSTNumber,
                    address: options.address,
                    country: options.country,
                    state: options.state,
                    city: options.city,
                    pinCode: options.pinCode,
                    password: hashedPassword,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            // duplicate username error
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email already taken",
                        },
                    ],
                };
            }
        }

        req.session.userId = user.id;
        const us = await User.findOne(user.id);
        console.log(us);

        // sendEmail({
        //     subject: "Verify your email",
        //     to: us.email,
        //     html: `<a href="http://localhost:4000/verify/${code}">verify email</a>`,
        // });

        return { user: us };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "that account doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }

    // @UseMiddleware(isAuth)
    // @Mutation(() => Boolean)
    // async updateName(@Arg("name") name: string, @Ctx() { req }: Context) {
    //     await User.update(
    //         { id: req.session.userId },
    //         {
    //             name,
    //         }
    //     );
    //     return true;
    // }

    // @UseMiddleware(isAuth)
    // @Mutation(() => Boolean)
    // async verifyUser(@Arg("code") code: string, @Ctx() { req }: Context) {
    //     const user: User = await User.findOne(req.session.userId);
    //     if (user.verificationCode === code) {
    //         await User.update(
    //             { id: req.session.userId },
    //             {
    //                 verified: true,
    //             }
    //         );
    //         return true;
    //     }
    //     return false;
    // }
}
