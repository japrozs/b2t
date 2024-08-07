"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
    createCheckoutStore,
    initCheckoutStore,
    type CheckoutStore,
} from "./checkout-store";

export const CheckoutStoreContext =
    createContext<StoreApi<CheckoutStore> | null>(null);

export interface CheckoutStoreProvidedProps {
    children: ReactNode;
}

export const CheckoutStoreProvider = ({
    children,
}: CheckoutStoreProvidedProps) => {
    const storeRef = useRef<StoreApi<CheckoutStore>>();
    if (!storeRef.current) {
        storeRef.current = createCheckoutStore(initCheckoutStore());
    }

    return (
        <CheckoutStoreContext.Provider value={storeRef.current}>
            {children}
        </CheckoutStoreContext.Provider>
    );
};

export const useCheckoutStore = <T,>(
    selector: (store: CheckoutStore) => T
): T => {
    const checkoutStoreContext = useContext(CheckoutStoreContext);

    if (!checkoutStoreContext) {
        throw new Error(
            `useCounterStore must be use within CounterStoreProvider`
        );
    }

    return useStore(checkoutStoreContext, selector);
};
