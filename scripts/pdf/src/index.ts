import puppeteer from "puppeteer";
import fs from "fs";
import hbd from "handlebars";
import path from "path";
import moment from "moment";

export const SAMPLE_BOOKING = {
    id: 9,
    details:
        '{"BookingDetails":{"Source":281,"BookedDate":20240711,"BookingNumber":"1540379","BookingTotalRate":245,"RecommendedRetailPrice":306.25,"Currency":"USD","BookingStatus":"Confirmed","Passengers":[{"PaxNumber":1,"RoomNo":1,"Title":1,"TitleString":"Mr","PassengerType":"ADT","Age":18,"FirstName":"NIMRAT","LastName":"SINGHSAINI","Nationality":"IND","Gender":1,"GenderString":"M"},{"PaxNumber":2,"RoomNo":1,"Title":1,"TitleString":"Mr","PassengerType":"CHD","Age":6,"FirstName":"JAPROZ","LastName":"SINGHSAINI","Nationality":"IND","Gender":1,"GenderString":"M"}],"AgencyRef":"9","PartyName":"SINGHSAINI/NIMRAT","Language":"EN"},"HotelDetails":{"StartDate":20240711,"EndDate":20240712,"HotelCode":"281-227368","HotelName":"Heeton Concept Hotel - Luma Hammersmith","TotalRate":245,"RecommendedRetailPrice":306.25,"Currency":"USD","TimeZone":"Europe/London","RoomDetails":[{"RoomType":"LUMA Twin","RoomTypeCode":3732,"RoomStatus":"TEST","CurrCode":"USD","ContractTokenId":"21250","RoomConfigurationId":1,"RoomNo":1,"MealPlan":"Room Only","MealPlanCode":28,"TaxSellCharges":0,"Rate":245,"RecommendedRetailPrice":306.25,"SubResNo":"IOLx-1540379-12410580","SupplierResNo":"56979c4d-5110-427b-989d-09b8cbed3f70_TEST","Messages":{"Message":[{"Id":1179494,"MessageId":585222,"MessageShort":"CheckIn instructions","MessageFull":"<ul>  <li>Extra-person charges may apply and vary depending on property policy</li><li>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</li><li>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</li><li>This property accepts credit cards; cash is not accepted</li><li>Safety features at this property include a fire extinguisher, a security system, a first aid kit, and window guards</li>  </ul>\\nFront desk staff will greet guests on arrival.","Type":"Check in Instruction","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99},{"Id":1179495,"MessageId":585223,"MessageShort":"Mandatory fees","MessageFull":"<p>You\'ll be asked to pay the following charges at the property:</p> <ul><li>Deposit: GBP 50.0 per stay</li></ul> <p>We have included all charges provided to us by the property. </p>","Type":"Mandatory Fees","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99},{"Id":1179496,"MessageId":585224,"MessageShort":"Know before you go","MessageFull":"<ul>  <li>Up to 3 children 1 year old and younger stay free when occupying the parent or guardian\'s room, using existing bedding. </li><li>This property welcomes guests of all sexual orientations and gender identities (LGBTQ+ friendly).</li> </ul>","Type":"Know Before You Go","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99}]}}]}}',
    creatorId: 5,
    cancelled: false,
    roomDetails:
        '{"RoomNo":1,"RoomType":"LUMA Twin","RoomTypeCode":3732,"RoomStatus":"OK","BlackOut":{"Status":"N","Msg":""},"CurrCode":"USD","ContractTokenId":"21250","RoomConfigurationId":1,"RatePlanId":21250,"MealPlan":"Room Only","MealPlanCode":"28","NumberOfMeals":2,"RoomNumber":1,"TaxSellCharges":0,"TaxSellChargesAsText":"0.00","Rate":245,"RateDetails":[245],"RoomStatusDetails":{"Status":["OK"]},"CancellationPolicyDetails":{"Cancellation":[{"FromDate":20240710,"ToDate":20240712,"NightToCharge":1}]},"Messages":{"Message":[{"Id":585222,"MessageShort":"CheckIn instructions","MessageFull":"<ul>  <li>Extra-person charges may apply and vary depending on property policy</li><li>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</li><li>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</li><li>This property accepts credit cards; cash is not accepted</li><li>Safety features at this property include a fire extinguisher, a security system, a first aid kit, and window guards</li>  </ul>\\nFront desk staff will greet guests on arrival.","Type":"Check in Instruction","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99},{"Id":585223,"MessageShort":"Mandatory fees","MessageFull":"<p>You\'ll be asked to pay the following charges at the property:</p> <ul><li>Deposit: GBP 50.0 per stay</li></ul> <p>We have included all charges provided to us by the property. </p>","Type":"Mandatory Fees","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99},{"Id":585224,"MessageShort":"Know before you go","MessageFull":"<ul>  <li>Up to 3 children 1 year old and younger stay free when occupying the parent or guardian\'s room, using existing bedding. </li><li>This property welcomes guests of all sexual orientations and gender identities (LGBTQ+ friendly).</li> </ul>","Type":"Know Before You Go","MessageChargeBase":"0","ValueType":"Fixed","AgeFrom":0,"AgeTo":99}]},"PackageYN":"N","NonRefundable":"Y","DynamicYN":"Y","RecommendedRetailPrice":306.25,"ContractLabel":"Rate inclusive of VAT. Free WiFi access.","MealPlanCodeLong":28}',
    creator: {
        id: 5,
        firstName: "ramakrishna",
        lastName: "swamy",
        companyName: "this is my company name",
        number: "9810172913",
        PANNumber: "BNZAA2318S",
        PANName: "Japroz Saini",
        GSTNumber: "06BZAHM6385P6Z2",
        address: "hi there",
        country: "asdas",
        state: "asdsd",
        city: "sdsadas",
        pinCode: "834433",
        email: "sainijaproz@gmail.com",
        createdAt: "1710306691800",
        updatedAt: "1710306691800",
        __typename: "User",
    },
    hotelId: 908,
    hotel: {
        id: 908,
        code: "281-227368",
        name: "Heeton Concept Hotel - Luma Hammersmith",
        body: '{"Code":"281-227368","Name":"Heeton Concept Hotel - Luma Hammersmith","StarRating":3,"GeoLocation":{"Latitude":"51.494096","Longitude":"-0.228714"},"ContractList":{"Contract":[{"ContractTokenID":21250,"ContractLabel":"Rate inclusive of VAT. Free WiFi access.","PackageYN":"N","NonRefYN":"N","MealPlanList":{"MealPlanResponse":[{"Code":28,"Name":"Room Only"}]},"RoomTypeList":{"RoomType":[{"Code":3733,"Name":"LUXE Rooms"},{"Code":3731,"Name":"LUMA Double"},{"Code":3732,"Name":"LUMA Twin"},{"Code":3730,"Name":"LIGHT Rooms"}]}},{"ContractTokenID":763195,"ContractLabel":"RESTEL Rate Plan","PackageYN":"N","NonRefYN":"N","MealPlanList":{"MealPlanResponse":[{"Code":28,"Name":"Room Only"}]},"RoomTypeList":{"RoomType":[{"Code":3733,"Name":"LUXE Rooms"},{"Code":3731,"Name":"LUMA Double"},{"Code":3732,"Name":"LUMA Twin"},{"Code":3730,"Name":"LIGHT Rooms"}]}},{"ContractTokenID":762642,"ContractLabel":"DOTW Rate Plan","PackageYN":"N","NonRefYN":"N","MealPlanList":{"MealPlanResponse":[{"Code":28,"Name":"Room Only"}]},"RoomTypeList":{"RoomType":[{"Code":3733,"Name":"LUXE Rooms"},{"Code":3731,"Name":"LUMA Double"},{"Code":3732,"Name":"LUMA Twin"},{"Code":3730,"Name":"LIGHT Rooms"}]}},{"ContractTokenID":763194,"ContractLabel":"Voyage Tours Rate Plan","PackageYN":"N","NonRefYN":"N","MealPlanList":{"MealPlanResponse":[{"Code":28,"Name":"Room Only"}]},"RoomTypeList":{"RoomType":[{"Code":3733,"Name":"LUXE Rooms"},{"Code":3731,"Name":"LUMA Double"},{"Code":3732,"Name":"LUMA Twin"},{"Code":3730,"Name":"LIGHT Rooms"}]}},{"ContractTokenID":762644,"ContractLabel":"RateHawk Rate Plan","PackageYN":"N","NonRefYN":"N","MealPlanList":{"MealPlanResponse":[{"Code":28,"Name":"Room Only"}]},"RoomTypeList":{"RoomType":[{"Code":3733,"Name":"LUXE Rooms"},{"Code":3731,"Name":"LUMA Double"},{"Code":3732,"Name":"LUMA Twin"},{"Code":3730,"Name":"LIGHT Rooms"}]}}]}}',
        details:
            '{"Details":[{"HotelCode":"281-227368","HotelName":"Heeton Concept Hotel - Luma Hammersmith","HotelChain":"Hotelrez Hotels & Resorts","HotelStarRating":3,"HotelPhone":"442031411480","HotelEmail":"reservations.luma@heetonconcepthotels.com","HotelPostCode":"W6 0LS","HotelWeb":"www.lumahotelhammersmith.co.uk","CityCode":"LON","CountryCode":"GB","HotelCity":"London","HotelAddress":"28-36 Glenthorne Road, London","Description":"The LUMA Concept Hotel operates under a very simple principle- naked stay. Rather than concentrating on the glossy bells and whistles that add very little substance to the experience of staying at the hotel - naked stay strips down to the essentials. It is a liberating experience- hospitality on your terms. Check-in may usually be from any time after 3pm - but the welcome from the hotel staff will be just as warm at 3am. The hotel is completely designed around the guest - right down to the rooms. Available in three sizes - Light - Luma and Luxe - each one offers spacious rooms containing big - plush - comfortable beds - piping hot showers - and televisions. These tech-ready spaces - with free Wi-Fi - come filled with witty - unexpected touches - but their casual - minimalistic design matches the stripped-back ethos of the hotel. Ultimately - the LUMA Concept Hotel aims to indulge.\\n","CheckInTime":"1500","CheckOutTime":"1100","GeoLocation":{"Latitude":"51.494096","Longitude":"-0.228714"},"Images":{"Img":["https://cdn.worldota.net/t/240x240/content/7a/21/7a215bb7408ece608cea29ef1eabacefe3727bf3.jpeg","https://cdn.worldota.net/t/240x240/content/ef/08/ef08805eb958dfd073318bbee98341012fc087d1.jpeg","https://cdn.worldota.net/t/240x240/content/ba/46/ba468b4e9c639bb0c1aed1835b5e7bd9522c7784.jpeg","https://cdn.worldota.net/t/240x240/content/32/de/32deaa7d69dc279e460f36774063caa8b9a4e3be.jpeg","https://cdn.worldota.net/t/240x240/content/94/38/94389bab9ec9f9774418e27b83864c8d8ee8aad0.jpeg","https://cdn.worldota.net/t/240x240/content/d8/15/d815022ec55017201424a75f0eab622bb5301a43.jpeg","https://cdn.worldota.net/t/240x240/content/30/dc/30dcbed564dbe117a8979298cd313e851ef9c437.jpeg","https://cdn.worldota.net/t/240x240/content/87/30/873051e3fe1746744400badca4c5ba86ed5a6438.jpeg","https://cdn.worldota.net/t/240x240/content/48/b3/48b3be2dc2a58a620d0947125ae095aa5ae5a01a.jpeg","https://cdn.worldota.net/t/240x240/content/80/68/8068282e632d789965a8f598486d407a510f9a17.jpeg","https://cdn.worldota.net/t/240x240/content/ea/17/ea171a6023c5b275d1122b7c7f7ea18c7c8bc47a.jpeg","https://cdn.worldota.net/t/240x240/content/26/67/2667a732f6c9c5685732af48bca166b8df050bc3.jpeg","https://cdn.worldota.net/t/240x240/content/62/fa/62fa594664ce386f454b705ae220f02c28295faa.jpeg","https://cdn.worldota.net/t/240x240/content/02/6e/026edfb70875cda48add1e624008a0f4ffd65cff.jpeg","https://cdn.worldota.net/t/240x240/content/10/8a/108a0d54b2ca2e831ba72f90adb415bec666234a.jpeg","https://cdn.worldota.net/t/240x240/content/9f/ee/9fee95c90987ef3e65e1e45bbc047942dc41be9a.jpeg","https://cdn.worldota.net/t/240x240/content/40/65/4065a5c0c39a349429ef199015ed686f3a44ec74.jpeg","https://cdn.worldota.net/t/240x240/content/91/84/9184d9868735cc592d9ffb59efc23100e7d39626.jpeg","https://cdn.worldota.net/t/240x240/content/cf/3a/cf3a6d95aff6f07009620259eac330d64128d24f.jpeg","https://cdn.worldota.net/t/240x240/content/58/63/586338eeece3caab0328278595a0be0b00412d18.jpeg","https://cdn.worldota.net/t/240x240/content/80/b1/80b194f1c779a0a391c63229f94dfe9a4ea8dc65.jpeg","https://cdn.worldota.net/t/240x240/content/38/e6/38e6ffbd9d6138eebbb11d73f099d5ab0cb425ee.jpeg","https://cdn.worldota.net/t/240x240/content/32/9c/329cb532385134c2d92c49c87c746e62920c0c42.jpeg","https://cdn.worldota.net/t/240x240/content/e3/29/e32900af1ae0761d810cffa341461c9e3698d0c2.jpeg","https://cdn.worldota.net/t/240x240/content/91/4e/914e123f04e3f492648309d6aa7bd4ddded33b1d.jpeg","https://cdn.worldota.net/t/240x240/content/9a/0e/9a0e0b86d7e8825397d171389a7931e784f6053a.jpeg","https://cdn.worldota.net/t/240x240/content/e7/zz/e7add0a4292f3c0a594a3410ba9775055513cd7b.jpeg","https://cdn.worldota.net/t/240x240/content/9c/08/9c08c0bd85cef05734e5db89384fddad265ec049.jpeg","https://cdn.worldota.net/t/240x240/content/a7/ae/a7ae8acfa7a18a95cad5a0c3e76934b93dd510a6.jpeg","https://cdn.worldota.net/t/240x240/content/34/d5/34d586c35aee91ede9a849870dbc1017de8b62e6.jpeg","https://cdn.worldota.net/t/240x240/content/35/50/3550c98d2bd451c8bb13337446ab6b45d01509f4.jpeg","https://cdn.worldota.net/t/240x240/content/11/77/1177f00b45f0f0b476e6d5d86e6ed8eff044b404.jpeg","https://cdn.worldota.net/t/240x240/content/3b/69/3b696c8019ac7fc71e12e207c504d6bf33544994.jpeg","https://cdn.worldota.net/t/240x240/content/f4/97/f4972f5f8d91456f08352ab103710703b8c1d55b.jpeg","https://cdn.worldota.net/t/240x240/content/1d/3d/1d3d89dfe855f77c8bc759d28e0b56390f247e41.jpeg","https://cdn.worldota.net/t/240x240/content/c8/b8/c8b8ee8c3c0e3d10d5b77192332ab407c294bcc2.jpeg","https://cdn.worldota.net/t/240x240/content/d4/c9/d4c9d89dabe8c38a5aa25086f4d6d56328945c6b.jpeg","https://cdn.worldota.net/t/240x240/content/6f/f9/6ff9c917e462f9bca2ded94ee2ef1610c2b49bcf.jpeg","https://cdn.worldota.net/t/240x240/content/34/ba/34baaaba71b59b1119a4e5147b7059e22430ce60.jpeg","https://cdn.worldota.net/t/240x240/content/57/ce/57cefc09761dc69fe988d2366f73f68ac1155667.jpeg","https://cdn.worldota.net/t/240x240/content/71/a2/71a2ea12702853d5ddc824c24fd3738267192b13.jpeg","https://cdn.worldota.net/t/240x240/content/4c/7c/4c7c189956580a3f50190cb4041f0ee071f4796d.jpeg"]},"HotelFacilities":{"Facility":["English","Smoke Detector","Additional measures against COVID-19","Personal protection equipment for staff","First Aid Kit","Spanish","Smoke-free property","Laundry","Extra decontamination measures","Hairdryer","Multi-language staff","Russian","Telephone","Breakfast/lunch to go","Tour assistance","Personal protection equipment for guests","Concierge services","Room service","Individually packaged food","Elevator/lift","Kitchen","Ticket assistance","Free Wi-Fi","Family room","Dry-cleaning","TV","Security guard","Parking nearby","Safe-deposit box","Contactless check-in and/or check-out","French","Pets Not Allowed","Garden","Air conditioning","Wheelchair Accessible","Bar","Accessibility features","24-hour reception","Luggage storage","Italian"]},"RoomFacilities":{"Facility":[]},"RoomTypes":{"RoomType":[{"RoomTypeCode":3730,"RoomType":"LIGHT Rooms","MaxOccAdt":2,"MaxOccPax":2,"MaxOccChd":1,"ACYN":false,"WindowYN":false,"WifiYN":false,"Images":{"Img":[]}},{"RoomTypeCode":3731,"RoomType":"LUMA Double","MaxOccAdt":2,"MaxOccPax":2,"MaxOccChd":1,"ACYN":false,"WindowYN":false,"WifiYN":false,"Images":{"Img":[]}},{"RoomTypeCode":3732,"RoomType":"LUMA Twin","MaxOccAdt":2,"MaxOccPax":2,"MaxOccChd":1,"ACYN":false,"WindowYN":false,"WifiYN":false,"Images":{"Img":[]}},{"RoomTypeCode":3733,"RoomType":"LUXE Rooms","MaxOccAdt":3,"MaxOccPax":3,"MaxOccChd":2,"ACYN":false,"WindowYN":false,"WifiYN":false,"Images":{"Img":[]}}]},"Messages":{"Message":[]}}]}',
        cityId: 464,
        createdAt: "1710289266235",
        updatedAt: "1710291850559",
        __typename: "Hotel",
    },
    createdAt: "1720679951095",
    updatedAt: "1720679954046",
    __typename: "Booking",
};

const compile = async (name: string, data: Object) => {
    const filePath = path.join(process.cwd(), "src", "templates", name);
    const html = fs.readFileSync(filePath, "utf-8");
    return hbd.compile(html)(data);
};

const parseDate = (str: string): Date => {
    if (!/^(\d){8}$/.test(str)) return new Date();
    const y = Math.floor(parseInt(str) / 10000);
    const m = Math.floor((parseInt(str) % 10000) / 100) - 1; // Months are zero-based in JavaScript
    const d = parseInt(str) % 100;
    return new Date(y, m, d);
};

hbd.registerHelper("date-format", (val) => {
    return `formatted date :: ${val}`;
});

hbd.registerHelper("nights-between", (startDate: number, endDate: number) =>
    Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24))
);

hbd.registerHelper("get-date-day", (val: number) => {
    const date = parseDate(val.toString());
    return date.getDate();
});

hbd.registerHelper("get-day", (val: number) => {
    const date = moment(val.toString(), "YYYYMMDD");
    return date.format("dddd");
});

hbd.registerHelper("get-date-month", (val: number) => {
    const date = moment(val.toString(), "YYYYMMDD");
    return date.format("MMMM");
});

hbd.registerHelper("hotel-location", (addr, chain) => {
    console.log({ addr, chain });
    return addr.split(",").slice(0, 2).join(", ") || chain;
});

const main = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile("booking.hbs", {
            bookingDetails: JSON.parse(SAMPLE_BOOKING.details),
            hotelDetails: JSON.parse(SAMPLE_BOOKING.hotel.details),
            hotel: SAMPLE_BOOKING.hotel,
        });
        await page.setContent(content);
        await page.emulateMediaType("screen");
        await page.pdf({
            path: "pdf.pdf",
            format: "A4",
            printBackground: true,
        });
        console.log("rendering done");
        await browser.close();
        process.exit();
    } catch (e) {
        console.log("something went wrong :: ", e);
    }
};

main().catch((err: Error) => console.log(err));
