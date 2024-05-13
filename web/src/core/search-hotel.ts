import { HotelSearchResult, RoomCfgType } from "@/types";
import { SearchHotelStruct, formatRoomCfg } from "@/utils";
import axios, { AxiosResponse } from "axios";
import useSWR, { SWRResponse } from "swr";

interface SearchHotelResponse {
    data: HotelSearchResult | null;
    error: unknown;
    isLoading: boolean;
}

export const searchHotel = async (
    codes: string | undefined,
    struct: SearchHotelStruct | undefined
): Promise<SearchHotelResponse> => {
    if (struct === undefined || codes?.length === 0) {
        return {
            data: null,
            error: "You fucked up",
            isLoading: false,
        };
    }
    try {
        const response: AxiosResponse<HotelSearchResult> = await axios.post(
            `/proxy?url=https://api.iwtxconnect.com/hotel/api/v1/search`,
            {
                Profile: {
                    Password: process.env.NEXT_PUBLIC_API_PASSWORD,
                    Code: process.env.NEXT_PUBLIC_API_CODE,
                    TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                },
                SearchCriteria: {
                    RoomConfiguration: {
                        Room: formatRoomCfg(struct.cfg),
                    },
                    StartDate: struct?.in.replaceAll("-", ""),
                    EndDate: struct?.out.replaceAll("-", ""),
                    HotelCode: codes,
                    // THIS IS NATIONALITY OF TRAVELLER
                    Nationality: "LON",
                    GroupByRooms: "Y",
                    CancellationPolicy: "Y",
                },
            }
        );

        return {
            data: response.data,
            error: null,
            isLoading: false,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            data: null,
            error,
            isLoading: false,
        };
    }
};
