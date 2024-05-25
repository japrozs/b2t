import "../styles/globals.css";
import { CheckoutStoreProvider } from "../store/provider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { AppProps } from "next/app";
import NextTransitionBar from "next-transition-bar";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";

Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;
Axios.defaults.withCredentials = true;

const fetcher = async (options: object): Promise<AxiosResponse<any, any>> => {
    try {
        const res = await Axios(options);
        return res.data;
    } catch (err: any) {
        throw err.response.data;
    }
};

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "include",
    cache: new InMemoryCache(),
});

// TODO: add spinny small loader bar at the top of page
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <SWRConfig
                value={{
                    fetcher,
                    dedupingInterval: 10000,
                }}
            >
                <CheckoutStoreProvider>
                    <NextTransitionBar color={"#35E0A1"} showSpinner={false} />
                    <Component {...pageProps} />
                    <Toaster />
                </CheckoutStoreProvider>
            </SWRConfig>
        </ApolloProvider>
    );
}
