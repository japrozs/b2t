import { CheckoutStoreProvider } from "@/store-provider";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Axios from "axios";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

Axios.defaults.baseURL = "http://localhost:3000/api/";
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
    try {
        const res = await Axios.get(url);
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
                    <Component {...pageProps} />
                </CheckoutStoreProvider>
            </SWRConfig>
        </ApolloProvider>
    );
}
