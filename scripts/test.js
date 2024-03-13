import request from "request";
var options = {
    method: "POST",
    url: "https://api.iwtxconnect.com/api/v1/details",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        OutputFormat: "JSON",
        Profile: {
            Code: "EmaarB2B",
            Password: "Em@@RBtw0B",
            TokenNumber: "SBE_drbt55qejhgzog453egubyyv",
        },
        SearchCriteria: {
            HotelCode: "101-1330",
        },
    }),
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
