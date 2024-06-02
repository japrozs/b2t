import "../styles/globals.css";
import { CheckoutStoreProvider } from "../store/provider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { AppProps } from "next/app";
import NextTransitionBar from "next-transition-bar";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";

// // TODO: CHANGE THIS VERY IMPORTANT
// Axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/`;
Axios.defaults.baseURL = `http://192.168.1.6:4000/api/`;
Axios.defaults.withCredentials = true;

const fetcher = async (options: object): Promise<AxiosResponse<any, any>> => {
    try {
        const res = await Axios(options);
        return res.data;
    } catch (err: any) {
        throw err.response.data;
    }
};

// // TODO: CHANGE THIS VERY IMPORTANT
// const client = new ApolloClient({
//     uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
//     credentials: "include",
//     cache: new InMemoryCache(),
// });
const client = new ApolloClient({
    uri: `http://192.168.1.6:4000/graphql`,
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
                    <NextTransitionBar color={"#007AFF"} showSpinner={false} />
                    <Component {...pageProps} />
                    <Toaster />
                </CheckoutStoreProvider>
            </SWRConfig>
        </ApolloProvider>
    );
}
