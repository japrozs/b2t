import useSWR from "swr";
import { HotelListType, RoomDetailType } from "./types";
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

export const getCheapestRoom = (rooms: RoomDetailType[]): RoomDetailType => {
    let minTotalRate = Infinity;
    let room: RoomDetailType = rooms[0];
    rooms.forEach((roomLoop: RoomDetailType) => {
        if (roomLoop.TotalRate < minTotalRate) {
            minTotalRate = roomLoop.TotalRate;
            room = roomLoop;
        }
    });
    return room;
};
