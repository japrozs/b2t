const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
        Profile: {
            Password: "D3V_1234",
            Code: "DEV_IWTX",
            TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
        },
        SearchCriteria: {
            RoomConfiguration: {
                Room: [
                    {
                        Adult: [
                            {
                                Age: 35,
                            },
                            {
                                Age: 35,
                            },
                        ],
                    },
                ],
            },
            StartDate: 20240225,
            EndDate: 20240228,
            HotelCode:
                "164-214068,281-228029,265-217096,152-229032,281-232234,281-229662,229-231082,265-221513,281-228573,272-231588,281-231862,106-228970,106-229388,265-545616,281-227368,281-223753,281-226324,265-224147,281-221284,281-225172,106-224172,1341-25258,281-224022,201-217084,164-229032,1341-26886,1341-1503",
            Nationality: "LON",
            GroupByRooms: "Y",
            CancellationPolicy: "Y",
        },
    }),
    redirect: "follow",
};

fetch("https://api.iwtxconnect.com/hotel/api/v1/search", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
