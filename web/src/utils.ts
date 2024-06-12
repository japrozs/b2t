import axios from "axios";
import { useGetAllCitiesQuery } from "./generated/graphql";
import { HotelSearchItemType, RoomCfgType, RoomDetailType } from "./types";
import { COMMISSION_RATE } from "./constants";

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
    // adults: number;
    // children: number;
    cfg: RoomCfgType;
}

export interface DetailStruct {
    hotel: HotelSearchItemType;
    room: RoomDetailType;
    cfg: RoomCfgType;
}

export const useSearchHotels = async (struct: SearchHotelStruct) => {
    const { data: city, loading } = useGetAllCitiesQuery();
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

export const nightsBetween = (date1: any, date2: any) =>
    Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

export const formatRoomCfg = (cfg: RoomCfgType) => {
    const ret = [];
    for (let i = 0; i < cfg.rooms.length; i++) {
        const room = {
            Adult: Array(cfg.rooms[i].adults).fill({
                Age: 25,
            }),
            // Child: Array(cfg.rooms[i].children).fill({
            //     Age: 11,
            // }),
            Child: cfg.rooms[i].children.map((child: { age: number }) => ({
                Age: child.age,
            })),
        };
        ret.push(room);
    }
    return ret;
};

export const IS_EMPTY = (...structs: object[]) => {
    structs.forEach((struct: object) => {
        if (Object.keys(struct).length === 0) return true;
    });
    return false;
};

export const formatCfg = (cfg: RoomCfgType, room: RoomDetailType) => {
    const formattedRoomCfg = formatRoomCfg(cfg);
    formattedRoomCfg.forEach((cfg) => {
        (cfg as any).RoomTypeCode = room.RoomTypeCode;
        (cfg as any).MealPlanCode = parseInt(room.MealPlanCode);
        (cfg as any).ContractTokenId = parseInt(room.ContractTokenId);
        (cfg as any).RoomConfigurationId = room.RoomConfigurationId;
    });
    return formattedRoomCfg;
};

export const parseDate = (str: string): Date => {
    if (!/^(\d){8}$/.test(str)) return new Date();
    const y = Math.floor(parseInt(str) / 10000);
    const m = Math.floor((parseInt(str) % 10000) / 100) - 1; // Months are zero-based in JavaScript
    const d = parseInt(str) % 100;
    return new Date(y, m, d);
};

// interface CheckoutInfoDataType {
//     title: string;
//     firstName: string;
//     lastName: string;
//     age: string;
//     nationality: string;
//     gender: string;
// }
// interface CheckoutInfoType {
//     adultsData: CheckoutInfoDataType[];
//     childrenData: CheckoutInfoDataType[];
// }

// export const mergeInfoAndConfig = (
//     info: CheckoutInfoType,
//     cfg: RoomCfgType
// ) => {
//     return info;
// };

export const sortAndFilterHotels = (
    hotels: HotelSearchItemType[],
    schema: {
        price: boolean;
        priceSortOrder: string;
        ratings: boolean;
        ratingSortOrder: string;
        query: string;
        facilities: string[];
    }
): HotelSearchItemType[] => {
    console.log(schema);
    let cpy: HotelSearchItemType[] = [...hotels];
    if (schema.price) {
        if (schema.priceSortOrder === "H2L") {
            cpy = cpy.sort(
                (a, b) =>
                    Math.min(
                        ...b.RoomTypeDetails.Rooms.Room.map(
                            (room) => room.TotalRate
                        )
                    ) -
                    Math.min(
                        ...a.RoomTypeDetails.Rooms.Room.map(
                            (room) => room.TotalRate
                        )
                    )
            );
        } else {
            cpy = cpy.sort(
                (a, b) =>
                    Math.min(
                        ...a.RoomTypeDetails.Rooms.Room.map(
                            (room) => room.TotalRate
                        )
                    ) -
                    Math.min(
                        ...b.RoomTypeDetails.Rooms.Room.map(
                            (room) => room.TotalRate
                        )
                    )
            );
        }
    }
    if (schema.ratings) {
        if (schema.ratingSortOrder === "H2L") {
            cpy = cpy.sort((a, b) => b.StarRating - a.StarRating);
        } else {
            cpy = cpy.sort((a, b) => a.StarRating - b.StarRating);
        }
    }

    cpy = cpy.filter((hotel: HotelSearchItemType) => {
        return hotel.HotelName.trim()
            .replaceAll("-", "")
            .replaceAll(".", "")
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(
                schema.query
                    .trim()
                    .replaceAll("-", "")
                    .replaceAll(".", "")
                    .split(" ")
                    .join("")
                    .toLowerCase()
            );
    });

    cpy = cpy.filter((hotel: HotelSearchItemType) => {
        return schema.facilities.every((fac) =>
            hotel.details.Details[0].HotelFacilities.Facility.includes(fac)
        );
    });

    return cpy;
};

export const getFacilitiesMap = (hotels: HotelSearchItemType[]) => {
    const facilitiesMap: Record<string, number> = {};

    hotels.forEach((hotel) => {
        const facilities = hotel.details.Details.flatMap(
            (detail) => detail.HotelFacilities.Facility
        );

        facilities.forEach((facility) => {
            if (facilitiesMap[facility]) {
                facilitiesMap[facility]++;
            } else {
                facilitiesMap[facility] = 1;
            }
        });
    });

    const sortedFacilitiesMap = Object.entries(facilitiesMap)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj: any, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    return sortedFacilitiesMap;
};

export const FORMAT_GRAMMAR = (val: number, str: string, plural?: string) => {
    if (val != 1) {
        return `${val} ${plural || `${str}s`}`;
    }
    return `${val} ${str}`;
};

type PersonDetailType = {
    age: string;
    firstName: string;
    gender: string;
    lastName: string;
    nationality: string;
    title: string;
}[][];

export const submitButtonDisabledFn = (
    childrenData: PersonDetailType,
    adultsData: PersonDetailType
): boolean => {
    const hasInvalidChild = childrenData.some((room) =>
        room.some(
            (detail) =>
                detail.age.length === 0 ||
                detail.firstName.length === 0 ||
                detail.lastName.length === 0
        )
    );

    const hasInvalidAdult = adultsData.some((room) =>
        room.some(
            (detail) =>
                detail.age.length === 0 ||
                detail.firstName.length === 0 ||
                detail.lastName.length === 0
        )
    );

    console.log(childrenData, adultsData);

    return hasInvalidChild || hasInvalidAdult;
};

export const getPricePerNightPerRoom = (
    room: RoomDetailType,
    startDate: number,
    endDate: number
): number => {
    return Math.ceil(
        COMMISSION_RATE *
            (room.TotalRate /
                nightsBetween(
                    parseDate(startDate.toString()),
                    parseDate(endDate.toString())
                ))
    );
};
export const getRRPPricePerNightPerRoom = (
    room: RoomDetailType,
    startDate: number,
    endDate: number
): number => {
    return Math.ceil(
        COMMISSION_RATE *
            (room.RecommendedRetailPrice /
                nightsBetween(
                    parseDate(startDate.toString()),
                    parseDate(endDate.toString())
                ))
    );
};

export const getTotalPrice = (
    room: RoomDetailType,
    numRooms: number
): number => {
    return Math.ceil(COMMISSION_RATE * room.TotalRate * numRooms);
};
export const getRRPTotalPrice = (
    room: RoomDetailType,
    numRooms: number
): number => {
    return Math.ceil(COMMISSION_RATE * room.RecommendedRetailPrice * numRooms);
};
