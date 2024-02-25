export interface HotelItemType {
    Code: string;
    Name: string;
    StarRating: number;
    ContractList: {
        Contract: {
            ContractTokenID: number;
            ContractLabel: string;
            PackageYN: string;
            NonRefYN: string;
            MealPlanList: {
                MealPlanResponse: {
                    Code: number;
                    Name: string;
                }[];
            };
            RoomTypeList: {
                RoomType: {
                    Code: number;
                    Name: string;
                }[];
            };
        }[];
    };
    GeoLocation: {
        Latitude: string;
        Longitude: string;
    };
}

export interface HotelListType {
    Count: number;
    Total: number;
    CountryList: {
        CityList: {
            Code: string;
            HotelList: {
                Hotel: HotelItemType[];
            };
            Name: string;
        }[];
        Code: string;
        Name: string;
    }[];
}

export interface HotelSearchItemType {
    SourceId: number;
    HotelId: number;
    HotelName: string;
    PreferredStatus: string;
    PropertyType: string;
    StarRating: number;
    GeoLocation: {
        Longitude: string;
        Latitude: string;
    };
    Chain: string;
    HotelCode: string;
    TimeZone: string;
    City: string;
    RoomTypeDetails: {
        Rooms: {
            Room: {
                RoomNo: number;
                RoomType: string;
                RoomTypeCode: number;
                RoomTypeSupplierCode: string;
                MealPlanSupplierCode: string;
                RoomStatus: string;
                BlackOut: {
                    Status: string;
                    Msg: string;
                };
                CurrCode: string;
                ContractTokenId: string;
                RoomConfigurationId: number;
                RatePlanCode: string;
                RatePlanId: number;
                MealPlan: string;
                MealPlanCode: string;
                NumberOfMeals: number;
                RoomNumber: number;
                Rate: number;
                RoomStatusDetails: {
                    Status: string[];
                };
                DiscountDetails: {};
                CancellationPolicyDetails: {
                    Cancellation: {
                        FromDate: number;
                        FromTime: string;
                        ToDate: number;
                        NightToCharge: number;
                    }[];
                };
                PromotionalContract: string;
                PackageYN: string;
                NonRefundable: string;
                DynamicYN: string;
                TotalRate: number;
                RateBeforeTax: number;
                TotalDiscount: number;
                RecommendedRetailPrice: number;
                ContractLabel: string;
                MealPlanCodeLong: number;
            }[];
        };
    };
    StartDate: number;
    EndDate: number;
    Country: string;
    Restriction: string;
}

export interface HotelSearchResult {
    Hotels: {
        Hotel: HotelSearchItemType[];
    };
}

export interface AutoCompleteResultItem {
    CountryCode: string;
    Country: string;
    CityId: string;
    CityCode: string;
    City: string;
    RelatedAirportCode: string;
    RelatedAirport: string;
    ZoneId: string;
    Zone: string;
}
