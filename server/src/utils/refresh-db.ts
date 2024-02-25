import request from "request";
import { City } from "../entities/city";
import { Hotel } from "../entities/hotel";

export interface CountryType {
    name: string;
    countryAlpha2: string;
    countryAlpha3: string;
    countryNum: string;
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

export interface CityItemType {
    Code: string;
    HotelList: {
        Hotel: HotelItemType[];
    };
    Name: string;
}

export interface HotelListType {
    Count: number;
    Total: number;
    CountryList: {
        CityList: CityItemType[];
        Code: string;
        Name: string;
    }[];
}

const countryList: CountryType[] = [
    {
        name: "Afghanistan	",
        countryAlpha2: "AF",
        countryAlpha3: "AFG",
        countryNum: "004",
    },
    {
        name: "Albania	",
        countryAlpha2: "AL",
        countryAlpha3: "ALB",
        countryNum: "008",
    },
    {
        name: "Algeria	",
        countryAlpha2: "DZ",
        countryAlpha3: "DZA",
        countryNum: "012",
    },
    {
        name: "American Samoa	",
        countryAlpha2: "AS",
        countryAlpha3: "ASM",
        countryNum: "016",
    },
    {
        name: "Andorra	",
        countryAlpha2: "AD",
        countryAlpha3: "AND",
        countryNum: "020",
    },
    {
        name: "Angola	",
        countryAlpha2: "AO",
        countryAlpha3: "AGO",
        countryNum: "024",
    },
    {
        name: "Anguilla	",
        countryAlpha2: "AI",
        countryAlpha3: "AIA",
        countryNum: "660",
    },
    {
        name: "Antarctica	",
        countryAlpha2: "AQ",
        countryAlpha3: "ATA",
        countryNum: "010",
    },
    {
        name: "Antigua and Barbuda	",
        countryAlpha2: "AG",
        countryAlpha3: "ATG",
        countryNum: "028",
    },
    {
        name: "Argentina	",
        countryAlpha2: "AR",
        countryAlpha3: "ARG",
        countryNum: "032",
    },
    {
        name: "Armenia	",
        countryAlpha2: "AM",
        countryAlpha3: "ARM",
        countryNum: "051",
    },
    {
        name: "Aruba	",
        countryAlpha2: "AW",
        countryAlpha3: "ABW",
        countryNum: "533",
    },
    {
        name: "Australia	",
        countryAlpha2: "AU",
        countryAlpha3: "AUS",
        countryNum: "036",
    },
    {
        name: "Austria	",
        countryAlpha2: "AT",
        countryAlpha3: "AUT",
        countryNum: "040",
    },
    {
        name: "Azerbaijan	",
        countryAlpha2: "AZ",
        countryAlpha3: "AZE",
        countryNum: "031",
    },
    {
        name: "Bahamas (the)	",
        countryAlpha2: "BS",
        countryAlpha3: "BHS",
        countryNum: "044",
    },
    {
        name: "Bahrain	",
        countryAlpha2: "BH",
        countryAlpha3: "BHR",
        countryNum: "048",
    },
    {
        name: "Bangladesh	",
        countryAlpha2: "BD",
        countryAlpha3: "BGD",
        countryNum: "050",
    },
    {
        name: "Barbados	",
        countryAlpha2: "BB",
        countryAlpha3: "BRB",
        countryNum: "052",
    },
    {
        name: "Belarus	",
        countryAlpha2: "BY",
        countryAlpha3: "BLR",
        countryNum: "112",
    },
    {
        name: "Belgium	",
        countryAlpha2: "BE",
        countryAlpha3: "BEL",
        countryNum: "056",
    },
    {
        name: "Belize	",
        countryAlpha2: "BZ",
        countryAlpha3: "BLZ",
        countryNum: "084",
    },
    {
        name: "Benin	",
        countryAlpha2: "BJ",
        countryAlpha3: "BEN",
        countryNum: "204",
    },
    {
        name: "Bermuda	",
        countryAlpha2: "BM",
        countryAlpha3: "BMU",
        countryNum: "060",
    },
    {
        name: "Bhutan	",
        countryAlpha2: "BT",
        countryAlpha3: "BTN",
        countryNum: "064",
    },
    {
        name: "Bolivia (Plurinational State of)	",
        countryAlpha2: "BO",
        countryAlpha3: "BOL",
        countryNum: "068",
    },
    {
        name: "Bonaire, Sint Eustatius and Saba	",
        countryAlpha2: "BQ",
        countryAlpha3: "BES",
        countryNum: "535",
    },
    {
        name: "Bosnia and Herzegovina	",
        countryAlpha2: "BA",
        countryAlpha3: "BIH",
        countryNum: "070",
    },
    {
        name: "Botswana	",
        countryAlpha2: "BW",
        countryAlpha3: "BWA",
        countryNum: "072",
    },
    {
        name: "Bouvet Island	",
        countryAlpha2: "BV",
        countryAlpha3: "BVT",
        countryNum: "074",
    },
    {
        name: "Brazil	",
        countryAlpha2: "BR",
        countryAlpha3: "BRA",
        countryNum: "076",
    },
    {
        name: "British Indian Ocean Territory (the)	",
        countryAlpha2: "IO",
        countryAlpha3: "IOT",
        countryNum: "086",
    },
    {
        name: "Brunei Darussalam	",
        countryAlpha2: "BN",
        countryAlpha3: "BRN",
        countryNum: "096",
    },
    {
        name: "Bulgaria	",
        countryAlpha2: "BG",
        countryAlpha3: "BGR",
        countryNum: "100",
    },
    {
        name: "Burkina Faso	",
        countryAlpha2: "BF",
        countryAlpha3: "BFA",
        countryNum: "854",
    },
    {
        name: "Burundi	",
        countryAlpha2: "BI",
        countryAlpha3: "BDI",
        countryNum: "108",
    },
    {
        name: "Cabo Verde	",
        countryAlpha2: "CV",
        countryAlpha3: "CPV",
        countryNum: "132",
    },
    {
        name: "Cambodia	",
        countryAlpha2: "KH",
        countryAlpha3: "KHM",
        countryNum: "116",
    },
    {
        name: "Cameroon	",
        countryAlpha2: "CM",
        countryAlpha3: "CMR",
        countryNum: "120",
    },
    {
        name: "Canada	",
        countryAlpha2: "CA",
        countryAlpha3: "CAN",
        countryNum: "124",
    },
    {
        name: "Cayman Islands (the)	",
        countryAlpha2: "KY",
        countryAlpha3: "CYM",
        countryNum: "136",
    },
    {
        name: "Central African Republic (the)	",
        countryAlpha2: "CF",
        countryAlpha3: "CAF",
        countryNum: "140",
    },
    {
        name: "Chad	",
        countryAlpha2: "TD",
        countryAlpha3: "TCD",
        countryNum: "148",
    },
    {
        name: "Chile	",
        countryAlpha2: "CL",
        countryAlpha3: "CHL",
        countryNum: "152",
    },
    {
        name: "China	",
        countryAlpha2: "CN",
        countryAlpha3: "CHN",
        countryNum: "156",
    },
    {
        name: "Christmas Island	",
        countryAlpha2: "CX",
        countryAlpha3: "CXR",
        countryNum: "162",
    },
    {
        name: "Cocos (Keeling) Islands (the)	",
        countryAlpha2: "CC",
        countryAlpha3: "CCK",
        countryNum: "166",
    },
    {
        name: "Colombia	",
        countryAlpha2: "CO",
        countryAlpha3: "COL",
        countryNum: "170",
    },
    {
        name: "Comoros (the)	",
        countryAlpha2: "KM",
        countryAlpha3: "COM",
        countryNum: "174",
    },
    {
        name: "Congo (the Democratic Republic of the)	",
        countryAlpha2: "CD",
        countryAlpha3: "COD",
        countryNum: "180",
    },
    {
        name: "Congo (the)	",
        countryAlpha2: "CG",
        countryAlpha3: "COG",
        countryNum: "178",
    },
    {
        name: "Cook Islands (the)	",
        countryAlpha2: "CK",
        countryAlpha3: "COK",
        countryNum: "184",
    },
    {
        name: "Costa Rica	",
        countryAlpha2: "CR",
        countryAlpha3: "CRI",
        countryNum: "188",
    },
    {
        name: "Croatia	",
        countryAlpha2: "HR",
        countryAlpha3: "HRV",
        countryNum: "191",
    },
    {
        name: "Cuba	",
        countryAlpha2: "CU",
        countryAlpha3: "CUB",
        countryNum: "192",
    },
    {
        name: "Curaçao	",
        countryAlpha2: "CW",
        countryAlpha3: "CUW",
        countryNum: "531",
    },
    {
        name: "Cyprus	",
        countryAlpha2: "CY",
        countryAlpha3: "CYP",
        countryNum: "196",
    },
    {
        name: "Czechia	",
        countryAlpha2: "CZ",
        countryAlpha3: "CZE",
        countryNum: "203",
    },
    {
        name: "Côte d'Ivoire	",
        countryAlpha2: "CI",
        countryAlpha3: "CIV",
        countryNum: "384",
    },
    {
        name: "Denmark	",
        countryAlpha2: "DK",
        countryAlpha3: "DNK",
        countryNum: "208",
    },
    {
        name: "Djibouti	",
        countryAlpha2: "DJ",
        countryAlpha3: "DJI",
        countryNum: "262",
    },
    {
        name: "Dominica	",
        countryAlpha2: "DM",
        countryAlpha3: "DMA",
        countryNum: "212",
    },
    {
        name: "Dominican Republic (the)	",
        countryAlpha2: "DO",
        countryAlpha3: "DOM",
        countryNum: "214",
    },
    {
        name: "Ecuador	",
        countryAlpha2: "EC",
        countryAlpha3: "ECU",
        countryNum: "218",
    },
    {
        name: "Egypt	",
        countryAlpha2: "EG",
        countryAlpha3: "EGY",
        countryNum: "818",
    },
    {
        name: "El Salvador	",
        countryAlpha2: "SV",
        countryAlpha3: "SLV",
        countryNum: "222",
    },
    {
        name: "Equatorial Guinea	",
        countryAlpha2: "GQ",
        countryAlpha3: "GNQ",
        countryNum: "226",
    },
    {
        name: "Eritrea	",
        countryAlpha2: "ER",
        countryAlpha3: "ERI",
        countryNum: "232",
    },
    {
        name: "Estonia	",
        countryAlpha2: "EE",
        countryAlpha3: "EST",
        countryNum: "233",
    },
    {
        name: "Eswatini	",
        countryAlpha2: "SZ",
        countryAlpha3: "SWZ",
        countryNum: "748",
    },
    {
        name: "Ethiopia	",
        countryAlpha2: "ET",
        countryAlpha3: "ETH",
        countryNum: "231",
    },
    {
        name: "Falkland Islands (the) [Malvinas]	",
        countryAlpha2: "FK",
        countryAlpha3: "FLK",
        countryNum: "238",
    },
    {
        name: "Faroe Islands (the)	",
        countryAlpha2: "FO",
        countryAlpha3: "FRO",
        countryNum: "234",
    },
    {
        name: "Fiji	",
        countryAlpha2: "FJ",
        countryAlpha3: "FJI",
        countryNum: "242",
    },
    {
        name: "Finland	",
        countryAlpha2: "FI",
        countryAlpha3: "FIN",
        countryNum: "246",
    },
    {
        name: "France	",
        countryAlpha2: "FR",
        countryAlpha3: "FRA",
        countryNum: "250",
    },
    {
        name: "French Guiana	",
        countryAlpha2: "GF",
        countryAlpha3: "GUF",
        countryNum: "254",
    },
    {
        name: "French Polynesia	",
        countryAlpha2: "PF",
        countryAlpha3: "PYF",
        countryNum: "258",
    },
    {
        name: "French Southern Territories (the)	",
        countryAlpha2: "TF",
        countryAlpha3: "ATF",
        countryNum: "260",
    },
    {
        name: "Gabon	",
        countryAlpha2: "GA",
        countryAlpha3: "GAB",
        countryNum: "266",
    },
    {
        name: "Gambia (the)	",
        countryAlpha2: "GM",
        countryAlpha3: "GMB",
        countryNum: "270",
    },
    {
        name: "Georgia	",
        countryAlpha2: "GE",
        countryAlpha3: "GEO",
        countryNum: "268",
    },
    {
        name: "Germany	",
        countryAlpha2: "DE",
        countryAlpha3: "DEU",
        countryNum: "276",
    },
    {
        name: "Ghana	",
        countryAlpha2: "GH",
        countryAlpha3: "GHA",
        countryNum: "288",
    },
    {
        name: "Gibraltar	",
        countryAlpha2: "GI",
        countryAlpha3: "GIB",
        countryNum: "292",
    },
    {
        name: "Greece	",
        countryAlpha2: "GR",
        countryAlpha3: "GRC",
        countryNum: "300",
    },
    {
        name: "Greenland	",
        countryAlpha2: "GL",
        countryAlpha3: "GRL",
        countryNum: "304",
    },
    {
        name: "Grenada	",
        countryAlpha2: "GD",
        countryAlpha3: "GRD",
        countryNum: "308",
    },
    {
        name: "Guadeloupe	",
        countryAlpha2: "GP",
        countryAlpha3: "GLP",
        countryNum: "312",
    },
    {
        name: "Guam	",
        countryAlpha2: "GU",
        countryAlpha3: "GUM",
        countryNum: "316",
    },
    {
        name: "Guatemala	",
        countryAlpha2: "GT",
        countryAlpha3: "GTM",
        countryNum: "320",
    },
    {
        name: "Guernsey	",
        countryAlpha2: "GG",
        countryAlpha3: "GGY",
        countryNum: "831",
    },
    {
        name: "Guinea	",
        countryAlpha2: "GN",
        countryAlpha3: "GIN",
        countryNum: "324",
    },
    {
        name: "Guinea-Bissau	",
        countryAlpha2: "GW",
        countryAlpha3: "GNB",
        countryNum: "624",
    },
    {
        name: "Guyana	",
        countryAlpha2: "GY",
        countryAlpha3: "GUY",
        countryNum: "328",
    },
    {
        name: "Haiti	",
        countryAlpha2: "HT",
        countryAlpha3: "HTI",
        countryNum: "332",
    },
    {
        name: "Heard Island and McDonald Islands	",
        countryAlpha2: "HM",
        countryAlpha3: "HMD",
        countryNum: "334",
    },
    {
        name: "Holy See (the)	",
        countryAlpha2: "VA",
        countryAlpha3: "VAT",
        countryNum: "336",
    },
    {
        name: "Honduras	",
        countryAlpha2: "HN",
        countryAlpha3: "HND",
        countryNum: "340",
    },
    {
        name: "Hong Kong	",
        countryAlpha2: "HK",
        countryAlpha3: "HKG",
        countryNum: "344",
    },
    {
        name: "Hungary	",
        countryAlpha2: "HU",
        countryAlpha3: "HUN",
        countryNum: "348",
    },
    {
        name: "Iceland	",
        countryAlpha2: "IS",
        countryAlpha3: "ISL",
        countryNum: "352",
    },
    {
        name: "India	",
        countryAlpha2: "IN",
        countryAlpha3: "IND",
        countryNum: "356",
    },
    {
        name: "Indonesia	",
        countryAlpha2: "ID",
        countryAlpha3: "IDN",
        countryNum: "360",
    },
    {
        name: "Iran (Islamic Republic of)	",
        countryAlpha2: "IR",
        countryAlpha3: "IRN",
        countryNum: "364",
    },
    {
        name: "Iraq	",
        countryAlpha2: "IQ",
        countryAlpha3: "IRQ",
        countryNum: "368",
    },
    {
        name: "Ireland	",
        countryAlpha2: "IE",
        countryAlpha3: "IRL",
        countryNum: "372",
    },
    {
        name: "Isle of Man	",
        countryAlpha2: "IM",
        countryAlpha3: "IMN",
        countryNum: "833",
    },
    {
        name: "Israel	",
        countryAlpha2: "IL",
        countryAlpha3: "ISR",
        countryNum: "376",
    },
    {
        name: "Italy	",
        countryAlpha2: "IT",
        countryAlpha3: "ITA",
        countryNum: "380",
    },
    {
        name: "Jamaica	",
        countryAlpha2: "JM",
        countryAlpha3: "JAM",
        countryNum: "388",
    },
    {
        name: "Japan	",
        countryAlpha2: "JP",
        countryAlpha3: "JPN",
        countryNum: "392",
    },
    {
        name: "Jersey	",
        countryAlpha2: "JE",
        countryAlpha3: "JEY",
        countryNum: "832",
    },
    {
        name: "Jordan	",
        countryAlpha2: "JO",
        countryAlpha3: "JOR",
        countryNum: "400",
    },
    {
        name: "Kazakhstan	",
        countryAlpha2: "KZ",
        countryAlpha3: "KAZ",
        countryNum: "398",
    },
    {
        name: "Kenya	",
        countryAlpha2: "KE",
        countryAlpha3: "KEN",
        countryNum: "404",
    },
    {
        name: "Kiribati	",
        countryAlpha2: "KI",
        countryAlpha3: "KIR",
        countryNum: "296",
    },
    {
        name: "Korea (the Democratic People's Republic of)	",
        countryAlpha2: "KP",
        countryAlpha3: "PRK",
        countryNum: "408",
    },
    {
        name: "Korea (the Republic of)	",
        countryAlpha2: "KR",
        countryAlpha3: "KOR",
        countryNum: "410",
    },
    {
        name: "Kuwait	",
        countryAlpha2: "KW",
        countryAlpha3: "KWT",
        countryNum: "414",
    },
    {
        name: "Kyrgyzstan	",
        countryAlpha2: "KG",
        countryAlpha3: "KGZ",
        countryNum: "417",
    },
    {
        name: "Lao People's Democratic Republic (the)	",
        countryAlpha2: "LA",
        countryAlpha3: "LAO",
        countryNum: "418",
    },
    {
        name: "Latvia	",
        countryAlpha2: "LV",
        countryAlpha3: "LVA",
        countryNum: "428",
    },
    {
        name: "Lebanon	",
        countryAlpha2: "LB",
        countryAlpha3: "LBN",
        countryNum: "422",
    },
    {
        name: "Lesotho	",
        countryAlpha2: "LS",
        countryAlpha3: "LSO",
        countryNum: "426",
    },
    {
        name: "Liberia	",
        countryAlpha2: "LR",
        countryAlpha3: "LBR",
        countryNum: "430",
    },
    {
        name: "Libya	",
        countryAlpha2: "LY",
        countryAlpha3: "LBY",
        countryNum: "434",
    },
    {
        name: "Liechtenstein	",
        countryAlpha2: "LI",
        countryAlpha3: "LIE",
        countryNum: "438",
    },
    {
        name: "Lithuania	",
        countryAlpha2: "LT",
        countryAlpha3: "LTU",
        countryNum: "440",
    },
    {
        name: "Luxembourg	",
        countryAlpha2: "LU",
        countryAlpha3: "LUX",
        countryNum: "442",
    },
    {
        name: "Macao	",
        countryAlpha2: "MO",
        countryAlpha3: "MAC",
        countryNum: "446",
    },
    {
        name: "Madagascar	",
        countryAlpha2: "MG",
        countryAlpha3: "MDG",
        countryNum: "450",
    },
    {
        name: "Malawi	",
        countryAlpha2: "MW",
        countryAlpha3: "MWI",
        countryNum: "454",
    },
    {
        name: "Malaysia	",
        countryAlpha2: "MY",
        countryAlpha3: "MYS",
        countryNum: "458",
    },
    {
        name: "Maldives	",
        countryAlpha2: "MV",
        countryAlpha3: "MDV",
        countryNum: "462",
    },
    {
        name: "Mali	",
        countryAlpha2: "ML",
        countryAlpha3: "MLI",
        countryNum: "466",
    },
    {
        name: "Malta	",
        countryAlpha2: "MT",
        countryAlpha3: "MLT",
        countryNum: "470",
    },
    {
        name: "Marshall Islands (the)	",
        countryAlpha2: "MH",
        countryAlpha3: "MHL",
        countryNum: "584",
    },
    {
        name: "Martinique	",
        countryAlpha2: "MQ",
        countryAlpha3: "MTQ",
        countryNum: "474",
    },
    {
        name: "Mauritania	",
        countryAlpha2: "MR",
        countryAlpha3: "MRT",
        countryNum: "478",
    },
    {
        name: "Mauritius	",
        countryAlpha2: "MU",
        countryAlpha3: "MUS",
        countryNum: "480",
    },
    {
        name: "Mayotte	",
        countryAlpha2: "YT",
        countryAlpha3: "MYT",
        countryNum: "175",
    },
    {
        name: "Mexico	",
        countryAlpha2: "MX",
        countryAlpha3: "MEX",
        countryNum: "484",
    },
    {
        name: "Micronesia (Federated States of)	",
        countryAlpha2: "FM",
        countryAlpha3: "FSM",
        countryNum: "583",
    },
    {
        name: "Moldova (the Republic of)	",
        countryAlpha2: "MD",
        countryAlpha3: "MDA",
        countryNum: "498",
    },
    {
        name: "Monaco	",
        countryAlpha2: "MC",
        countryAlpha3: "MCO",
        countryNum: "492",
    },
    {
        name: "Mongolia	",
        countryAlpha2: "MN",
        countryAlpha3: "MNG",
        countryNum: "496",
    },
    {
        name: "Montenegro	",
        countryAlpha2: "ME",
        countryAlpha3: "MNE",
        countryNum: "499",
    },
    {
        name: "Montserrat	",
        countryAlpha2: "MS",
        countryAlpha3: "MSR",
        countryNum: "500",
    },
    {
        name: "Morocco	",
        countryAlpha2: "MA",
        countryAlpha3: "MAR",
        countryNum: "504",
    },
    {
        name: "Mozambique	",
        countryAlpha2: "MZ",
        countryAlpha3: "MOZ",
        countryNum: "508",
    },
    {
        name: "Myanmar	",
        countryAlpha2: "MM",
        countryAlpha3: "MMR",
        countryNum: "104",
    },
    {
        name: "Namibia	",
        countryAlpha2: "NA",
        countryAlpha3: "NAM",
        countryNum: "516",
    },
    {
        name: "Nauru	",
        countryAlpha2: "NR",
        countryAlpha3: "NRU",
        countryNum: "520",
    },
    {
        name: "Nepal	",
        countryAlpha2: "NP",
        countryAlpha3: "NPL",
        countryNum: "524",
    },
    {
        name: "Netherlands (the)	",
        countryAlpha2: "NL",
        countryAlpha3: "NLD",
        countryNum: "528",
    },
    {
        name: "New Caledonia	",
        countryAlpha2: "NC",
        countryAlpha3: "NCL",
        countryNum: "540",
    },
    {
        name: "New Zealand	",
        countryAlpha2: "NZ",
        countryAlpha3: "NZL",
        countryNum: "554",
    },
    {
        name: "Nicaragua	",
        countryAlpha2: "NI",
        countryAlpha3: "NIC",
        countryNum: "558",
    },
    {
        name: "Niger (the)	",
        countryAlpha2: "NE",
        countryAlpha3: "NER",
        countryNum: "562",
    },
    {
        name: "Nigeria	",
        countryAlpha2: "NG",
        countryAlpha3: "NGA",
        countryNum: "566",
    },
    {
        name: "Niue	",
        countryAlpha2: "NU",
        countryAlpha3: "NIU",
        countryNum: "570",
    },
    {
        name: "Norfolk Island	",
        countryAlpha2: "NF",
        countryAlpha3: "NFK",
        countryNum: "574",
    },
    {
        name: "Northern Mariana Islands (the)	",
        countryAlpha2: "MP",
        countryAlpha3: "MNP",
        countryNum: "580",
    },
    {
        name: "Norway	",
        countryAlpha2: "NO",
        countryAlpha3: "NOR",
        countryNum: "578",
    },
    {
        name: "Oman	",
        countryAlpha2: "OM",
        countryAlpha3: "OMN",
        countryNum: "512",
    },
    {
        name: "Pakistan	",
        countryAlpha2: "PK",
        countryAlpha3: "PAK",
        countryNum: "586",
    },
    {
        name: "Palau	",
        countryAlpha2: "PW",
        countryAlpha3: "PLW",
        countryNum: "585",
    },
    {
        name: "Palestine, State of	",
        countryAlpha2: "PS",
        countryAlpha3: "PSE",
        countryNum: "275",
    },
    {
        name: "Panama	",
        countryAlpha2: "PA",
        countryAlpha3: "PAN",
        countryNum: "591",
    },
    {
        name: "Papua New Guinea	",
        countryAlpha2: "PG",
        countryAlpha3: "PNG",
        countryNum: "598",
    },
    {
        name: "Paraguay	",
        countryAlpha2: "PY",
        countryAlpha3: "PRY",
        countryNum: "600",
    },
    {
        name: "Peru	",
        countryAlpha2: "PE",
        countryAlpha3: "PER",
        countryNum: "604",
    },
    {
        name: "Philippines (the)	",
        countryAlpha2: "PH",
        countryAlpha3: "PHL",
        countryNum: "608",
    },
    {
        name: "Pitcairn	",
        countryAlpha2: "PN",
        countryAlpha3: "PCN",
        countryNum: "612",
    },
    {
        name: "Poland	",
        countryAlpha2: "PL",
        countryAlpha3: "POL",
        countryNum: "616",
    },
    {
        name: "Portugal	",
        countryAlpha2: "PT",
        countryAlpha3: "PRT",
        countryNum: "620",
    },
    {
        name: "Puerto Rico	",
        countryAlpha2: "PR",
        countryAlpha3: "PRI",
        countryNum: "630",
    },
    {
        name: "Qatar	",
        countryAlpha2: "QA",
        countryAlpha3: "QAT",
        countryNum: "634",
    },
    {
        name: "Republic of North Macedonia	",
        countryAlpha2: "MK",
        countryAlpha3: "MKD",
        countryNum: "807",
    },
    {
        name: "Romania	",
        countryAlpha2: "RO",
        countryAlpha3: "ROU",
        countryNum: "642",
    },
    {
        name: "Russian Federation (the)	",
        countryAlpha2: "RU",
        countryAlpha3: "RUS",
        countryNum: "643",
    },
    {
        name: "Rwanda	",
        countryAlpha2: "RW",
        countryAlpha3: "RWA",
        countryNum: "646",
    },
    {
        name: "Réunion	",
        countryAlpha2: "RE",
        countryAlpha3: "REU",
        countryNum: "638",
    },
    {
        name: "Saint Barthélemy	",
        countryAlpha2: "BL",
        countryAlpha3: "BLM",
        countryNum: "652",
    },
    {
        name: "Saint Helena, Ascension and Tristan da Cunha	",
        countryAlpha2: "SH",
        countryAlpha3: "SHN",
        countryNum: "654",
    },
    {
        name: "Saint Kitts and Nevis	",
        countryAlpha2: "KN",
        countryAlpha3: "KNA",
        countryNum: "659",
    },
    {
        name: "Saint Lucia	",
        countryAlpha2: "LC",
        countryAlpha3: "LCA",
        countryNum: "662",
    },
    {
        name: "Saint Martin (French part)	",
        countryAlpha2: "MF",
        countryAlpha3: "MAF",
        countryNum: "663",
    },
    {
        name: "Saint Pierre and Miquelon	",
        countryAlpha2: "PM",
        countryAlpha3: "SPM",
        countryNum: "666",
    },
    {
        name: "Saint Vincent and the Grenadines	",
        countryAlpha2: "VC",
        countryAlpha3: "VCT",
        countryNum: "670",
    },
    {
        name: "Samoa	",
        countryAlpha2: "WS",
        countryAlpha3: "WSM",
        countryNum: "882",
    },
    {
        name: "San Marino	",
        countryAlpha2: "SM",
        countryAlpha3: "SMR",
        countryNum: "674",
    },
    {
        name: "Sao Tome and Principe	",
        countryAlpha2: "ST",
        countryAlpha3: "STP",
        countryNum: "678",
    },
    {
        name: "Saudi Arabia	",
        countryAlpha2: "SA",
        countryAlpha3: "SAU",
        countryNum: "682",
    },
    {
        name: "Senegal	",
        countryAlpha2: "SN",
        countryAlpha3: "SEN",
        countryNum: "686",
    },
    {
        name: "Serbia	",
        countryAlpha2: "RS",
        countryAlpha3: "SRB",
        countryNum: "688",
    },
    {
        name: "Seychelles	",
        countryAlpha2: "SC",
        countryAlpha3: "SYC",
        countryNum: "690",
    },
    {
        name: "Sierra Leone",
        countryAlpha2: "SL",
        countryAlpha3: "SLE",
        countryNum: "694",
    },
    {
        name: "Singapore",
        countryAlpha2: "SG",
        countryAlpha3: "SGP",
        countryNum: "702",
    },
    {
        name: "Sint Maarten (Dutch part)",
        countryAlpha2: "SX",
        countryAlpha3: "SXM",
        countryNum: "534",
    },
    {
        name: "Slovakia",
        countryAlpha2: "SK",
        countryAlpha3: "SVK",
        countryNum: "703",
    },
    {
        name: "Slovenia",
        countryAlpha2: "SI",
        countryAlpha3: "SVN",
        countryNum: "705",
    },
    {
        name: "Solomon Islands",
        countryAlpha2: "SB",
        countryAlpha3: "SLB",
        countryNum: "090",
    },
    {
        name: "Somalia",
        countryAlpha2: "SO",
        countryAlpha3: "SOM",
        countryNum: "706",
    },
    {
        name: "South Africa",
        countryAlpha2: "ZA",
        countryAlpha3: "ZAF",
        countryNum: "710",
    },
    {
        name: "South Georgia and the South Sandwich Islands	",
        countryAlpha2: "GS",
        countryAlpha3: "SGS",
        countryNum: "239",
    },
    {
        name: "South Sudan	",
        countryAlpha2: "SS",
        countryAlpha3: "SSD",
        countryNum: "728",
    },
    {
        name: "Spain	",
        countryAlpha2: "ES",
        countryAlpha3: "ESP",
        countryNum: "724",
    },
    {
        name: "Sri Lanka	",
        countryAlpha2: "LK",
        countryAlpha3: "LKA",
        countryNum: "144",
    },
    {
        name: "Sudan (the)	",
        countryAlpha2: "SD",
        countryAlpha3: "SDN",
        countryNum: "729",
    },
    {
        name: "Suriname	",
        countryAlpha2: "SR",
        countryAlpha3: "SUR",
        countryNum: "740",
    },
    {
        name: "Svalbard and Jan Mayen	",
        countryAlpha2: "SJ",
        countryAlpha3: "SJM",
        countryNum: "744",
    },
    {
        name: "Sweden	",
        countryAlpha2: "SE",
        countryAlpha3: "SWE",
        countryNum: "752",
    },
    {
        name: "Switzerland	",
        countryAlpha2: "CH",
        countryAlpha3: "CHE",
        countryNum: "756",
    },
    {
        name: "Syrian Arab Republic	",
        countryAlpha2: "SY",
        countryAlpha3: "SYR",
        countryNum: "760",
    },
    {
        name: "Taiwan (Province of China)	",
        countryAlpha2: "TW",
        countryAlpha3: "TWN",
        countryNum: "158",
    },
    {
        name: "Tajikistan	",
        countryAlpha2: "TJ",
        countryAlpha3: "TJK",
        countryNum: "762",
    },
    {
        name: "Tanzania, United Republic of	",
        countryAlpha2: "TZ",
        countryAlpha3: "TZA",
        countryNum: "834",
    },
    {
        name: "Thailand	",
        countryAlpha2: "TH",
        countryAlpha3: "THA",
        countryNum: "764",
    },
    {
        name: "Timor-Leste	",
        countryAlpha2: "TL",
        countryAlpha3: "TLS",
        countryNum: "626",
    },
    {
        name: "Togo	",
        countryAlpha2: "TG",
        countryAlpha3: "TGO",
        countryNum: "768",
    },
    {
        name: "Tokelau	",
        countryAlpha2: "TK",
        countryAlpha3: "TKL",
        countryNum: "772",
    },
    {
        name: "Tonga	",
        countryAlpha2: "TO",
        countryAlpha3: "TON",
        countryNum: "776",
    },
    {
        name: "Trinidad and Tobago	",
        countryAlpha2: "TT",
        countryAlpha3: "TTO",
        countryNum: "780",
    },
    {
        name: "Tunisia	",
        countryAlpha2: "TN",
        countryAlpha3: "TUN",
        countryNum: "788",
    },
    {
        name: "Turkey	",
        countryAlpha2: "TR",
        countryAlpha3: "TUR",
        countryNum: "792",
    },
    {
        name: "Turkmenistan	",
        countryAlpha2: "TM",
        countryAlpha3: "TKM",
        countryNum: "795",
    },
    {
        name: "Turks and Caicos Islands (the)	",
        countryAlpha2: "TC",
        countryAlpha3: "TCA",
        countryNum: "796",
    },
    {
        name: "Tuvalu	",
        countryAlpha2: "TV",
        countryAlpha3: "TUV",
        countryNum: "798",
    },
    {
        name: "Uganda	",
        countryAlpha2: "UG",
        countryAlpha3: "UGA",
        countryNum: "800",
    },
    {
        name: "Ukraine	",
        countryAlpha2: "UA",
        countryAlpha3: "UKR",
        countryNum: "804",
    },
    {
        name: "United Arab Emirates (the)	",
        countryAlpha2: "AE",
        countryAlpha3: "ARE",
        countryNum: "784",
    },
    {
        name: "United Kingdom of Great Britain and Northern Ireland (the)	",
        countryAlpha2: "GB",
        countryAlpha3: "GBR",
        countryNum: "826",
    },
    {
        name: "United States Minor Outlying Islands (the)	",
        countryAlpha2: "UM",
        countryAlpha3: "UMI",
        countryNum: "581",
    },
    {
        name: "United States of America (the)",
        countryAlpha2: "US",
        countryAlpha3: "USA",
        countryNum: "840",
    },
    {
        name: "Uruguay	",
        countryAlpha2: "UY",
        countryAlpha3: "URY",
        countryNum: "858",
    },
    {
        name: "Uzbekistan	",
        countryAlpha2: "UZ",
        countryAlpha3: "UZB",
        countryNum: "860",
    },
    {
        name: "Vanuatu	",
        countryAlpha2: "VU",
        countryAlpha3: "VUT",
        countryNum: "548",
    },
    {
        name: "Venezuela (Bolivarian Republic of)	",
        countryAlpha2: "VE",
        countryAlpha3: "VEN",
        countryNum: "862",
    },
    {
        name: "Viet Nam	",
        countryAlpha2: "VN",
        countryAlpha3: "VNM",
        countryNum: "704",
    },
    {
        name: "Virgin Islands (British)	",
        countryAlpha2: "VG",
        countryAlpha3: "VGB",
        countryNum: "092",
    },
    {
        name: "Virgin Islands (U.S.)	",
        countryAlpha2: "VI",
        countryAlpha3: "VIR",
        countryNum: "850",
    },
    {
        name: "Wallis and Futuna	",
        countryAlpha2: "WF",
        countryAlpha3: "WLF",
        countryNum: "876",
    },
    {
        name: "Western Sahara	",
        countryAlpha2: "EH",
        countryAlpha3: "ESH",
        countryNum: "732",
    },
    {
        name: "Yemen	",
        countryAlpha2: "YE",
        countryAlpha3: "YEM",
        countryNum: "887",
    },
    {
        name: "Zambia	",
        countryAlpha2: "ZM",
        countryAlpha3: "ZMB",
        countryNum: "894",
    },
    {
        name: "Zimbabwe	",
        countryAlpha2: "ZW",
        countryAlpha3: "ZWE",
        countryNum: "716",
    },
    {
        name: "Åland Islands	",
        countryAlpha2: "AX",
        countryAlpha3: "ALA",
        countryNum: "248}]",
    },
];

export const refreshDatabaseWithNewHotels = () => {
    // let hotelCount = 0;
    // countryList.forEach((country: CountryType, idx: number) => {
    //     if (country.countryAlpha2 === "GB") {
    //         console.log(idx, country);
    //     }
    // });
    for (let i = 0; i < countryList.length; i++) {
        const country: CountryType = countryList[i];
        console.log(`index : ${i}`);
        const options = {
            method: "POST",
            // page numbers only go up until 2
            url: `https://api.iwtxconnect.com/api/v1/hotellist?pageSize=500&RoomConfigurationId=1&pageNumber=2&countryCode=${country.countryAlpha2}`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Profile: {
                    Password: "D3V_1234",
                    Code: "DEV_IWTX",
                    TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
                },
            }),
        };
        request(options, async (error: any, response: any) => {
            if (error) {
                console.log(error);
            }
            const struct: HotelListType = JSON.parse(response.body);
            if (struct.CountryList.length === 0) {
                return;
            }
            const country = struct.CountryList[0];
            country.CityList.forEach(async (cityItem: CityItemType) => {
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
                console.log(city, cityItem.HotelList.Hotel.length);
                cityItem.HotelList.Hotel.forEach(
                    async (hotel: HotelItemType & { details?: any }) => {
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
                        }).save();
                    }
                );
            });
            // console.log(JSON.parse(response.body));
        });
    }
};
