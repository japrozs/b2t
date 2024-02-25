import fetch from "node-fetch";
import fs from "node:fs";
import request from "request";

const arr = [];

const getAllPossibleThreeLetterWords = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const arr = [];
    let text = "";
    for (let i = 0; i < chars.length; i++) {
        for (let x = 0; x < chars.length; x++) {
            for (let j = 0; j < chars.length; j++) {
                text += chars[i];
                text += chars[x];
                text += chars[j];
                arr.push(text);
                text = "";
            }
        }
    }
    return arr;
};
getAllPossibleThreeLetterWords().forEach((str, idx) => {
    console.log(str, idx);
    request(
        {
            url: "https://iolglobalb2bcloudssl.iolcloud.com/IWTXCall.aspx/GetCountryCity",
            headers: {
                accept: "application/json, text/javascript, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json; charset=UTF-8",
            },
            body: `{'ClientXid':'-1', 'ElementType':'H', 'IWTXYN':'Y', 'CityName':'${str}', 'HotelName':'', 'CityXid':'-1','ZoneXid':'-1','ODCompanyXid':'10427'}`,
            method: "POST",
        },
        function (err, res) {
            console.log(err, res);
            const stringified = `{"results" : ${res.body.d}}`;
            const jsonified = JSON.parse(stringified);
            arr.push([jsonified]);
            console.log(arr);
            const obj = { cities: arr };
            fs.writeFileSync(
                "output.json",
                JSON.stringify(obj, null, 4),
                "utf-8"
            );
        }
    );
});
