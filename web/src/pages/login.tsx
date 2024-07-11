import { Button } from "../components/ui/button";
import { InputField } from "../components/ui/input-field";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "../utils/to-error-map";
import { useIsAuth } from "../utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Logo } from "@/components/ui/logo";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    useIsAuth();
    const [loginMut] = useLoginMutation();
    const [loading, setLoading] = useState(false);
    const client = useApolloClient();
    const router = useRouter();
    return (
        <div>
            <Head>
                {/* <Meta title={"Login - Lumos"} /> */}
                <title>Login – Lumos</title>
            </Head>
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <Link href="/">
                        <Logo className="h-9 w-auto text-[#050f2c]" />
                    </Link>
                </div>
                <div
                    style={{
                        marginTop: "13.8vh",
                    }}
                    className="w-80 ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <p className="text-5xl font-semibold mb-5">Log in</p>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const response = await loginMut({
                                variables: values,
                            });
                            if (response.data?.login.errors) {
                                setErrors(
                                    toErrorMap(response.data.login.errors)
                                );
                            } else if (response.data?.login.user) {
                                if (typeof router.query.next === "string") {
                                    router.push(router.query.next);
                                } else {
                                    // worked
                                    setLoading(true);
                                    await client.resetStore();
                                    router.push("/app");
                                }
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name="email"
                                    placeholder="jim@dundermifflin.com"
                                    label="Email"
                                    shadow
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="that's what she said..."
                                    label="Password"
                                    shadow
                                />
                                <Button
                                    loading={isSubmitting || loading}
                                    type="submit"
                                    label="Log in"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-600 text-smol mt-6">
                        Don{"'"}t have an account?{" "}
                        <Link
                            href="/signup"
                            className="hover:underline font-medium hover:text-blue-500"
                        >
                            Sign up
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

export default Login;
