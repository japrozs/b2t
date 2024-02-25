import useSWR from "swr";
import { HotelListType } from "./types";
import { useGetCitiesQuery, useGetCityQuery } from "./generated/graphql";

export const formatAutoCompleteResults = (
    struct: { d: string } | undefined
) => {
    if (!struct) {
        return { results: [] };
    }
    const stringified = `{"results" : ${struct.d}}`;
    return JSON.parse(stringified);
};

export interface SearchHotelStruct {
    city: string;
    // country: string;
    in: string;
    out: string;
    adults: number;
    children: number;
}

export const useSearchHotels = async (struct: SearchHotelStruct) => {
    const { data: city, loading } = useGetCitiesQuery();
    while (!loading) {}
    console.log(city);
    return city;
};

// export const useSearchHotels = async (struct: SearchHotelStruct) => {
//     console.log("str : ", struct);
//     const countryLists = [];
//     let total,
//         count = 0;
//     let pageNumber = 1;
//     let { data } = await useSWR<HotelListType>(
//         `/hotel-list?countryCode=${struct.country}&pageNumber=${pageNumber}`
//     );
//     total = data?.Total as number;
//     count = data?.Count as number;
//     countryLists.push(data?.CountryList);
//     while (total > count) {
//         pageNumber++;
//         let { data } = await useSWR<HotelListType>(
//             `/hotel-list?countryCode=${struct.country}&pageNumber=${pageNumber}`
//         );
//         console.log("pageNumber :: ", pageNumber, data);
//         count += data?.Count as number;
//         countryLists.push(data?.CountryList);
//     }
//     console.log(countryLists);
//     return [];
// };
