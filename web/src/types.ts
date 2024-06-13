export interface HotelDetailType {
    Details: {
        HotelCode: string;
        HotelName: string;
        HotelChain: string;
        HotelStarRating: number;
        HotelPhone: string;
        HotelEmail: string;
        HotelPostCode: string;
        HotelWeb: string;
        CityCode: string;
        CountryCode: string;
        HotelCity: string;
        HotelAddress: string;
        Description: string;
        CheckInTime: string;
        CheckOutTime: string;
        GeoLocation: {
            Latitude: string;
            Longitude: string;
        };
        Images: {
            Img: string[];
        };
        HotelFacilities: {
            Facility: string[];
        };
        RoomFacilities: {
            Facility: string[];
        };
        RoomTypes: {
            RoomType: {
                RoomTypeCode: number;
                RoomType: string;
                MaxOccAdt: number;
                MaxOccPax: number;
                MaxOccChd: number;
                ACYN: boolean;
                WindowYN: boolean;
                WifiYN: boolean;
                Images: {
                    Img: string[];
                };
            }[];
        };
        Messages: {
            Message: {
                MessageShort: string;
                MessageFull: string;
                MealPlanId: number;
                RoomId: number;
                BookFromDate: number;
                BookToDate: number;
                TravelFromDate: number;
                TravelToDate: number;
                Currency: string;
                MessageChargeBase: string;
                Value: number;
                MessageType: string;
                AgeFrom: number;
                AgeTo: number;
                TaxInclusive: boolean;
            }[];
        };
    }[];
}

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

export interface RoomDetailType {
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
        // time is in local time of the location
        Cancellation: {
            FromDate: number;
            FromTime: string;
            ToDate: number;
            NightToCharge?: number;
            PercentOrAmt?: string;
            Value?: string;
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
}

export interface HotelSearchItemType {
    SourceId: number;
    HotelId: number;
    HotelName: string;
    PreferredStatus: string;
    PropertyType: string;
    details: HotelDetailType;
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
            Room: RoomDetailType[];
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
    ErrorMessage?: {
        Error: {
            Messages: string[];
        };
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

export interface RoomCfgType {
    rooms: {
        // FIX: why are adults and children passed differently...
        adults: number;
        children: {
            age: number;
        }[];
    }[];
}

export interface BookingDetailType {
    BookingDetails: {
        Source: number;
        BookedDate: number;
        BookingNumber: string;
        BookingTotalRate: number;
        RecommendedRetailPrice: number;
        Currency: string;
        BookingStatus: string;
        Passengers: {
            PaxNumber: number;
            RoomNo: number;
            Title: number;
            TitleString: string;
            PassengerType: "ADT" | "CHD";
            Age: number;
            FirstName: string;
            LastName: string;
            Nationality: string;
            Gender: number;
            GenderString: string;
        }[];
        AgencyRef: string;
        PartyName: string;
    };
    HotelDetails: {
        StartDate: number;
        EndDate: number;
        HotelCode: string;
        HotelName: string;
        TotalRate: number;
        RecommendedRetailPrice: number;
        Currency: string;
        TimeZone: string;
        RoomDetails: {
            RoomType: string;
            RoomTypeCode: number;
            RoomStatus: string;
            CurrCode: string;
            ContractTokenId: string;
            RoomConfigurationId: number;
            RoomNo: number;
            MealPlan: string;
            MealPlanCode: number;
            TaxSellCharges: number;
            Rate: number;
            RecommendedRetailPrice: number;
            SubResNo: string;
            SupplierResNo: string;
            Messages: {
                Message: {
                    Id: number;
                    MessageId: number;
                    MessageShort: string;
                    MessageFull: string;
                    Type: string;
                    MessageChargeBase: string;
                    ValueType: string;
                    AgeFrom: number;
                    AgeTo: number;
                }[];
            };
        }[];
    };
}
