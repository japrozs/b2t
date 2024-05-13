// import { Meta } from "@/components/shared/meta";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import { useRegisterMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/to-error-map";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
    // useIsAuth();
    const [registerMut] = useRegisterMutation();
    const router = useRouter();
    const client = useApolloClient();
    return (
        <div>
            <Head>
                {/* <Meta title={"Signup - Lumos"} /> */}
                <title>Signup – Lumos</title>
            </Head>
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <Link href="/">
                        <Image
                            src="https://raw.githubusercontent.com/japrozs/noble/master/web/public/logo.svg?token=GHSAT0AAAAAACO4RIN6GQXJGIMUNOFSDUMSZPRCYFQ"
                            className="h-8 w-auto"
                            height={20}
                            width={20}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div
                    style={{
                        marginTop: "13.8vh",
                    }}
                    className="w-80 ml-auto mr-auto flex flex-col items-center justify-center"
                >
                    <p className="text-5xl font-semibold mb-5">Sign up</p>
                    <Formik
                        initialValues={{
                            companyName: "",
                            number: "",
                            password: "",
                            confirmPassword: "",
                            email: "",
                            PANNumber: "",
                            PANName: "",
                            GSTNumber: "",
                            firstName: "",
                            lastName: "",
                            address: "",
                            country: "",
                            state: "",
                            city: "",
                            pinCode: "",
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            console.log(values);
                            const res = await registerMut({
                                variables: {
                                    options: values,
                                },
                            });
                            if (res.data?.register.errors) {
                                setErrors(toErrorMap(res.data.register.errors));
                            } else if (res.data?.register.user) {
                                router.push("/app");
                                await client.resetStore();
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <p className="text-xl font-semibold mb-5">
                                    Account information
                                </p>
                                <InputField
                                    name="companyName"
                                    placeholder="..."
                                    label="Company Name"
                                    shadow
                                />
                                <InputField
                                    name="number"
                                    placeholder="..."
                                    label="Mobile number"
                                    shadow
                                />
                                <InputField
                                    name="password"
                                    placeholder="..."
                                    type="password"
                                    label="Password"
                                    shadow
                                />
                                <InputField
                                    name="confirmPassword"
                                    placeholder="..."
                                    type="password"
                                    label="Confirm Password"
                                    shadow
                                />
                                <InputField
                                    name="email"
                                    placeholder="..."
                                    label="Email"
                                    shadow
                                />
                                <br />
                                <p className="text-xl font-semibold mb-5">
                                    PAN information
                                </p>
                                <InputField
                                    name="PANNumber"
                                    placeholder="..."
                                    label="PAN Number"
                                    shadow
                                />
                                <InputField
                                    name="PANName"
                                    placeholder="..."
                                    label="PAN Name"
                                    shadow
                                />
                                {/* ASK FOR PAN CARD IMAGE HERE FOR CONFIRMATION */}
                                <br />
                                <p className="text-xl font-semibold mb-5">
                                    GST information
                                </p>
                                <InputField
                                    name="GSTNumber"
                                    placeholder="..."
                                    label="GST Number"
                                    shadow
                                />
                                <br />
                                <p className="text-xl font-semibold mb-5">
                                    Address information
                                </p>
                                <InputField
                                    name="firstName"
                                    placeholder="..."
                                    label="First Name"
                                    shadow
                                />
                                <InputField
                                    name="lastName"
                                    placeholder="..."
                                    label="Last Name"
                                    shadow
                                />
                                <InputField
                                    name="address"
                                    placeholder="..."
                                    label="Address"
                                    shadow
                                />
                                <InputField
                                    name="country"
                                    placeholder="..."
                                    label="Country"
                                    shadow
                                />
                                <InputField
                                    name="state"
                                    placeholder="..."
                                    label="State"
                                    shadow
                                />
                                <InputField
                                    name="city"
                                    placeholder="..."
                                    label="City"
                                    shadow
                                />
                                <InputField
                                    name="pinCode"
                                    placeholder="..."
                                    label="PIN Code"
                                    shadow
                                />
                                <Button
                                    loading={isSubmitting}
                                    type="submit"
                                    label="Sign up"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-600 text-smol mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="hover:underline hover:text-blue-main transition-all"
                        >
                            Login
                        </Link>
                    </p>
                    {/* TODO – build pages for forgot password */}
                    {/* <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="hover:underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default Signup;
