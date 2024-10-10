import request from "request";
import { City } from "../entities/city";
import { Hotel } from "../entities/hotel";
import {
    CityItemType,
    CountryType,
    HotelItemType,
    HotelListType,
    countryList,
} from "../types";

export const refreshDatabaseWithNewHotels = () => {
    // let hotelCount = 0;
    // countryList.forEach((country: CountryType, idx: number) => {
    //     if (country.countryAlpha2 === "GB") {
    //         console.log(idx, country);
    //     }
    // });
    for (let iter = 1; iter < 10; iter++) {
        for (let i = 0; i < countryList.length; i++) {
            setTimeout(() => {
                const country: CountryType = countryList[i];
                console.log(
                    `iter : ${iter}, index : ${i}, country : ${country}`
                );
                const options = {
                    method: "POST",
                    // TODO: keep the page numbers going until there is no new data
                    url: `https://api.iwtxconnect.com/api/v1/hotellist?pageSize=500&RoomConfigurationId=1&pageNumber=${iter}&countryCode=${country.countryAlpha2}`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Profile: {
                            Password: process.env.IOLX_API_PASSWORD,
                            Code: process.env.IOLX_API_CODE,
                            TokenNumber:
                                "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                        },
                    }),
                };
                request(options, async (error: any, response: any) => {
                    try {
                        if (error) {
                            console.log(error);
                        }

                        const struct: HotelListType = JSON.parse(response.body);
                        if (struct.CountryList.length === 0) {
                            return;
                        }
                        const country = struct.CountryList[0];
                        country.CityList.forEach(
                            async (cityItem: CityItemType) => {
                                let city = await City.findOne({
                                    where: {
                                        code: cityItem.Code,
                                    },
                                });
                                if (!city) {
                                    city = await City.create({
                                        code: cityItem.Code,
                                        name: cityItem.Name,
                                        countryCode: country.Code,
                                        countryName: country.Name,
                                    }).save();
                                }
                                console.log(
                                    city,
                                    cityItem.HotelList.Hotel.length
                                );
                                cityItem.HotelList.Hotel.forEach(
                                    async (
                                        hotel: HotelItemType & { details?: any }
                                    ) => {
                                        let h = await Hotel.findOne({
                                            where: {
                                                code: hotel.Code,
                                            },
                                        });
                                        if (h) {
                                            console.log("hotel already exists");
                                            return;
                                        }
                                        console.log(hotel);

                                        h = await Hotel.create({
                                            code: hotel.Code,
                                            name: hotel.Name,
                                            cityId: city?.id,
                                            body: JSON.stringify(hotel) || "{}",
                                            details: "{}",
                                        }).save();
                                    }
                                );
                            }
                        );
                    } catch (err) {
                        console.log("try-catch triggered : ", err);
                    }
                    // console.log(JSON.parse(response.body));
                });
            }, iter * i * 500);
        }
    }
};
