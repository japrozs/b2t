import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
    @Field()
    companyName: string;

    @Field()
    number: string;

    @Field()
    password: string;

    @Field()
    confirmPassword: string;

    @Field()
    email: string;

    @Field()
    PANNumber: string;

    @Field()
    PANName: string;

    @Field()
    GSTNumber: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    address: string;

    @Field()
    country: string;

    @Field()
    state: string;

    @Field()
    city: string;

    @Field()
    pinCode: string;
}
