import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { CityDropdown } from "@/components/ui/city-dropdown";
import RoomConfig from "@/components/ui/room-cfg";
import Datepicker from "react-tailwindcss-datepicker";
import { useLogoutMutation } from "@/generated/graphql";
import { RoomCfgType } from "@/types";
import { useIsAuth } from "@/utils/use-is-auth";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FORMAT_GRAMMAR, nightsBetween } from "@/utils";
import { RoomCfgModal } from "@/components/modals/room-cfg-modal";
import { toast } from "sonner";
import { Logo } from "@/components/ui/logo";
import useRandomColor from "@/utils/use-random-color";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface AppHomePageProps {}

const categories = [
    {
        name: "Recent",
        posts: [
            {
                id: 1,
                title: "Does drinking coffee make you smarter?",
                date: "5h ago",
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: "2h ago",
                commentCount: 3,
                shareCount: 2,
            },
        ],
    },
    {
        name: "Popular",
        posts: [
            {
                id: 1,
                title: "Is tech making coffee better or worse?",
                date: "Jan 7",
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: "The most innovative things happening in coffee",
                date: "Mar 19",
                commentCount: 24,
                shareCount: 12,
            },
        ],
    },
    {
        name: "Trending",
        posts: [
            {
                id: 1,
                title: "Ask Me Anything: 10 answers to your questions about coffee",
                date: "2d ago",
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: "4d ago",
                commentCount: 1,
                shareCount: 2,
            },
        ],
    },
];

const AppHomePage: React.FC<AppHomePageProps> = ({}) => {
    useIsAuth();
    const [city, setCity] = useState("LON");
    const [logout] = useLogoutMutation();
    const [value, setValue] = useState({
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
    });
    const theme = useRandomColor();
    const client = useApolloClient();
    const [checkinDate, setCheckinDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [checkoutDate, setCheckoutDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [open, setOpen] = useState(false);
    const [roomConfig, setRoomConfig] = useState<RoomCfgType>({
        rooms: [
            {
                adults: 1,
                children: [
                    {
                        age: 6,
                    },
                ],
            },
        ],
    });
    const router = useRouter();

    useEffect(() => {
        console.log("roomCfg :: ", roomConfig);
    }, [roomConfig]);

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };

    return (
        <div>
            <Navbar />
            <main
                className="bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url("/img/tokyo.jpg")`,
                    height: "550px",
                }}
            >
                <div className="h-full flex items-stretch max-w-[76rem] p-5 mx-auto">
                    <div className="w-full my-auto">
                        <p className="text-4xl font-semibold text-white drop-shadow-md mb-5">
                            Find hotels for your next trip
                        </p>
                        <div className="bg-white rounded-xl p-4 max-w-sm">
                            <CityDropdown
                                fullWidth
                                label="City"
                                city={city}
                                setCity={setCity}
                            />
                            <hr className="border-gray-200 mt-5 mb-2" />
                            <p className="text-gray-800 text-md font-semibold">
                                Dates
                            </p>
                            <div className="flex items-center">
                                <Datepicker
                                    primaryColor="blue"
                                    value={value}
                                    separator=" – "
                                    placeholder="DD-MM-YYYY to DD-MM-YYYY"
                                    displayFormat="DD-MM-YYYY"
                                    // disabledDates={[
                                    //     {
                                    //         startDate: "2024-05-30",
                                    //         endDate: "2024-05-30",
                                    //     },
                                    // ]}
                                    // asSingle={true}
                                    inputClassName={
                                        "outline-nonefocus:ring-1  datepicker-input"
                                    }
                                    minDate={
                                        // new Date(Date.now() - 24 * 60 * 60 * 1000)
                                        new Date(Date.now())
                                    }
                                    onChange={(val: any) => {
                                        if (val.startDate === val.endDate) {
                                            toast.error(
                                                "A stay of at least 1 night is required"
                                            );
                                            return;
                                        }
                                        console.log("val :: ", val);
                                        setValue(val);
                                    }}
                                />
                                <div className="w-max px-4 text-center">
                                    <p className="text-blue-500 text-lg font-semibold">
                                        {nightsBetween(
                                            new Date(value.startDate),
                                            new Date(value.endDate)
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {nightsBetween(
                                            new Date(value.startDate),
                                            new Date(value.endDate)
                                        ) === 1
                                            ? "night"
                                            : "nights"}
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-200 mt-5 mb-2" />
                            <p className="text-gray-800 text-md font-semibold">
                                Rooms & persons
                            </p>
                            <p
                                onClick={() => setOpen(true)}
                                className="text-black cursor-pointer py-1.5 text-lg font-semibold"
                            >
                                {FORMAT_GRAMMAR(
                                    roomConfig.rooms
                                        .flatMap(
                                            (room) =>
                                                room.adults +
                                                room.children.length
                                        )
                                        .reduce((a, b) => a + b),
                                    "person"
                                )}{" "}
                                –{" "}
                                {FORMAT_GRAMMAR(
                                    roomConfig.rooms.length,
                                    "room"
                                )}
                            </p>
                            <button
                                onClick={() => {
                                    router.push(
                                        `/app/search?city=${city}&in=${
                                            value.startDate
                                        }&out=${
                                            value.endDate
                                        }&cfg=${JSON.stringify(roomConfig)}`
                                    );
                                }}
                                className="transition-all mt-2.5 bg-blue-600 w-full text-center py-2 rounded-lg text-white font-medium drop-shadow-sm hover:bg-opacity-95"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="items-start w-full my-auto">
                        {/* <Logo
                            monogram
                            style={{
                                color: theme[0],
                            }}
                            className={`h-10 w-auto text-[${theme[0]}]  drop-shadow-2xl`}
                        /> */}
                    </div>
                </div>
            </main>
            <div
                style={{
                    backgroundImage: `url("/img/bg.png")`,
                }}
                className="bg-cover bg-center bg-no-repeat max-w-6xl rounded-lg p-10 mx-auto mt-12 mb-0"
            >
                <p className="text-5xl mb-6  text-center text-purple-900 spoof-bold">
                    Book a trip
                    <br />
                    within minutes
                </p>
                <p className="max-w-xl text-center mx-auto font-medium">
                    With our powerful booking engine and a easy booking flow
                    with the best prices of any website, you can book a hotel
                    for your trip and take that long need vacation a bit quicker
                    🚀
                </p>
                <button className="transition-all mt-7 bg-purple-900 text-purple-50 flex items-center mx-auto py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90">
                    Search hotels
                </button>
            </div>
            {/* TODO – change this copy pasted content */}
            <div className="p-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center  mb-6">
                        <Logo
                            monogram
                            className="h-6 w-auto text-[#FD0054] mr-2"
                        />
                        <p className="text-2xl font-semibold">
                            Most popular destinations
                        </p>
                    </div>
                    <div className="w-full">
                        <TabGroup>
                            <TabList className="flex gap-4 border-b border-gray-200">
                                <Tab className="py-1.5 px-6 text-sm/6 border-b-[1.5px] border-black border-opacity-0 font-semibold text-black focus:outline-none data-[selected]:border-opacity-100">
                                    Berlin
                                </Tab>
                                <Tab className="py-1.5 px-6 text-sm/6 border-b-[1.5px] border-black border-opacity-0 font-semibold text-black focus:outline-none data-[selected]:border-opacity-100">
                                    Munich
                                </Tab>
                                <Tab className="py-1.5 px-6 text-sm/6 border-b-[1.5px] border-black border-opacity-0 font-semibold text-black focus:outline-none data-[selected]:border-opacity-100">
                                    Paris
                                </Tab>
                                <Tab className="py-1.5 px-6 text-sm/6 border-b-[1.5px] border-black border-opacity-0 font-semibold text-black focus:outline-none data-[selected]:border-opacity-100">
                                    Hamburg
                                </Tab>
                            </TabList>
                            <TabPanels className="mt-8 ">
                                <TabPanel>
                                    <div className="flex items-stretch space-x-5">
                                        <img
                                            className="w-1/2 h-72 object-cover rounded-xl"
                                            src="/img/berlin.jpg"
                                        ></img>
                                        <div className="w-1/2 h-full">
                                            <p className="text-xl font-semibold">
                                                Travel to Berlin
                                            </p>
                                            <p className="text-sm mt-1.5 text-gray-700 font-medium">
                                                The German capital Berlin (about
                                                3.6 million inhabitants) has an
                                                eventful history and many
                                                interesting sights. The best
                                                example is the memorial plaque
                                                for John F. Kennedy, who said in
                                                1963: "I am a Berliner".
                                            </p>
                                            <a
                                                href={`/app/search?city=BER&in=${
                                                    value.startDate
                                                }&out=${
                                                    value.endDate
                                                }&cfg=${JSON.stringify(
                                                    roomConfig
                                                )}`}
                                            >
                                                <button
                                                    style={{
                                                        color: theme[0],
                                                        backgroundColor:
                                                            theme[1],
                                                    }}
                                                    className="transition-all mt-5  py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90"
                                                >
                                                    Book hotels in Berlin
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex items-stretch space-x-5">
                                        <img
                                            className="w-1/2 h-72 object-cover rounded-xl"
                                            src="/img/munich.jpg"
                                        ></img>
                                        <div className="w-1/2 h-full">
                                            <p className="text-xl font-semibold">
                                                Munich offers so much
                                            </p>
                                            <p className="text-sm mt-1.5 text-gray-700 font-medium">
                                                The Bavarian capital München has
                                                about 1.5 million inhabitants.
                                                The location in the foothills of
                                                the Alps promises varied stays
                                                both in the warm and cold
                                                seasons. The most popular square
                                                in the city is Marienplatz and
                                                the most famous church is the
                                                Frauenkirche. Munich is a
                                                destination for city/cultural
                                                trips!
                                            </p>
                                            <a
                                                href={`/app/search?city=MUNICH&in=${
                                                    value.startDate
                                                }&out=${
                                                    value.endDate
                                                }&cfg=${JSON.stringify(
                                                    roomConfig
                                                )}`}
                                            >
                                                <button
                                                    style={{
                                                        color: theme[0],
                                                        backgroundColor:
                                                            theme[1],
                                                    }}
                                                    className="transition-all mt-5  py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90"
                                                >
                                                    Book hotels in Munich
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex items-stretch space-x-5">
                                        <img
                                            className="w-1/2 h-72 object-cover rounded-xl"
                                            src="/img/paris.jpg"
                                        ></img>
                                        <div className="w-1/2 h-full">
                                            <p className="text-xl font-semibold">
                                                Discover the Magic of Paris
                                            </p>
                                            <p className="text-sm mt-1.5 text-gray-700 font-medium">
                                                Paris, the "City of Light,"
                                                enchants visitors with its
                                                historic landmarks and vibrant
                                                culture. From the Eiffel Tower
                                                and the Louvre to Montmartre's
                                                charming streets, Paris offers
                                                timeless appeal. Savor French
                                                cuisine, explore the scenic
                                                Seine, and immerse yourself in
                                                the romance that makes Paris a
                                                beloved destination year-round.
                                            </p>

                                            <a
                                                href={`/app/search?city=PAR&in=${
                                                    value.startDate
                                                }&out=${
                                                    value.endDate
                                                }&cfg=${JSON.stringify(
                                                    roomConfig
                                                )}`}
                                            >
                                                <button
                                                    style={{
                                                        color: theme[0],
                                                        backgroundColor:
                                                            theme[1],
                                                    }}
                                                    className="transition-all mt-5  py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90"
                                                >
                                                    Book hotels in Paris
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex items-stretch space-x-5">
                                        <img
                                            className="w-1/2 h-72 object-cover rounded-xl"
                                            src="/img/hamburg.jpg"
                                        ></img>
                                        <div className="w-1/2 h-full">
                                            <p className="text-xl font-semibold">
                                                Discover Hamburg
                                            </p>
                                            <p className="text-sm mt-1.5 text-gray-700 font-medium">
                                                Often referred to as the
                                                "gateway to the world", Hamburg
                                                is a city-state with just under
                                                1.9 million inhabitants. The
                                                harbour, fish market and
                                                Reeperbahn are the most famous
                                                sights. The most famous landmark
                                                is the Michel. Hamburg has been
                                                regarded as a musical metropolis
                                                for years. A visit is always
                                                worthwhile!
                                            </p>
                                            <a
                                                href={`/app/search?city=Hamburg&in=${
                                                    value.startDate
                                                }&out=${
                                                    value.endDate
                                                }&cfg=${JSON.stringify(
                                                    roomConfig
                                                )}`}
                                            >
                                                <button
                                                    style={{
                                                        color: theme[0],
                                                        backgroundColor:
                                                            theme[1],
                                                    }}
                                                    className="transition-all mt-5  py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90"
                                                >
                                                    Book hotels in Hamburg
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
            <div className="bg-[#050f2c] px-10 py-16">
                <div className="max-w-6xl mx-auto flex items-center space-x-8">
                    <div className="w-1/4">
                        <img
                            className="w-auto h-72 object-cover rounded-xl"
                            src="/img/amsterdam.jpg"
                        />
                    </div>
                    <div className="w-2/4">
                        <p className="text-5xl font-normal text-white text-center spoof-bold">
                            You <span className="text-[#8E43E7]">deserve</span>
                            <br />
                            that{" "}
                            <span className="text-[#00AEEF]">vacation!</span>
                        </p>
                        <p className="max-w-xl mx-auto text-center text-blue-50 font-medium mt-4">
                            Escape the everyday and immerse yourself in a world
                            of relaxation and adventure. Discover our exclusive
                            offers and start planning your dream getaway today.
                            Because you’ve earned it!
                        </p>
                        <button className="transition-all mt-10 bg-[#00395D] text-[#00AEEF] flex items-center mx-auto py-2 px-10 rounded-lg  font-medium text-sm hover:bg-opacity-90">
                            Book your dream getaway
                        </button>
                    </div>
                    <div className="w-1/4">
                        <img
                            className="w-auto h-72 object-cover rounded-xl"
                            src="/img/spain.jpg"
                        />
                    </div>
                </div>
            </div>
            {/* TODO – change this copy pasted content */}
            <div className="bg-gray-50 p-10">
                <div className="max-w-6xl mx-auto text-gray-800">
                    <p className="text-2xl font-semibold">
                        Find the perfect hotel for your trip with HRS!
                    </p>
                    <p className="text-sm text-gray-600 mt-2 mb-6">
                        HRS is the ideal companion for business travel and is
                        one of the top three hotel portals in Europe. Travelers
                        and travel managers in small and medium-sized companies
                        benefit from fast and easy online hotel bookings as well
                        as customized solutions before, during and after their
                        hotel stay. HRS negotiates special rates with hotels for
                        registered myHRS members with discounts of up to 30
                        percent. Flexibility is particularly important for
                        business travelers, as appointments can be postponed
                        spontaneously. That's why standard bookings at HRS can
                        be canceled free of charge until 6 p.m. on the day of
                        arrival. With investments in new technologies, HRS is
                        driving digital booking and guest experiences, e.g.
                        check-in, check-out and payment of the hotel bill via
                        smartphone. During their stay, HRS is there for its
                        business travelers with excellent customer service.
                    </p>
                    <p className="text-2xl font-semibold">
                        Highest quality, low prices and only real hotel reviews
                    </p>
                    <p className="text-sm text-gray-600 mt-2 mb-6">
                        Theme worlds such as top hotels with coworking spaces or
                        business hotels with very well-equipped business areas
                        can also be found on our portal. You can also directly
                        choose hotels of a hotel chain, such as ACHAT, Best
                        Western, Motel One or InterCity Hotels and specifically
                        search for them. Detailed hotel descriptions,
                        informative photos and videos as well as about five
                        million hotel ratings facilitate the hotel search. The
                        special thing about HRS hotel ratings: Only guests who
                        have booked through HRS and stayed at the respective
                        hotel can submit a rating. Thus, you can see real hotel
                        ratings for each hotel.
                    </p>
                    <p className="text-2xl font-semibold drop-shadow-md">
                        Exclusive benefits for myHRS members
                    </p>
                    <p className="text-sm text-gray-600 mt-2 mb-6">
                        myHRS members benefit from many exclusive advantages.
                        For example, with a free myHRS account, you can unlock
                        exclusive hotel offers such as the HRS Business Tariff
                        and save up to 30 % or more at the best hotels. In
                        addition, HRS negotiates free additional services such
                        as parking directly at the hotel, free upgrades to the
                        next higher room category or late check-out. And even if
                        things do not go as planned, our competent HRS customer
                        service is available day and night and guarantees to
                        find a solution quickly.
                    </p>
                    <p className="text-2xl font-semibold">
                        Safety & hygiene have top priority
                    </p>
                    <p className="text-sm text-gray-600 mt-2 mb-6">
                        The health, safety and security of our customers and
                        business partners are currently more important than
                        ever. For this reason, we have developed the Clean &
                        Safe Protocol together with SGS, the world's leading
                        inspection, verification, testing and certification
                        company. With the Clean & Safe label, you can see at
                        first glance whether a hotel complies with extended
                        hygiene measures. This makes traveling safe.
                    </p>
                </div>
            </div>
            <RoomCfgModal
                open={open}
                setOpen={setOpen}
                roomConfig={roomConfig}
                setRoomConfig={setRoomConfig}
            />
            <Footer />
        </div>
    );
};

export default AppHomePage;
