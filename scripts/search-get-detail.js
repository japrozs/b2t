import request from "request";

request(
    {
        method: "POST",
        url: "https://api.iwtxconnect.com/api/v1/details",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            OutputFormat: "JSON",
            Profile: {
                Code: "DEV_IWTX",
                Password: "D3V_1234",
                TokenNumber: "d97c3531-3103-485a-b13c-4a85130a1fsam7",
            },
            SearchCriteria: {
                HotelCode: "164-214068",
            },
        }),
    },
    function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    }
);
