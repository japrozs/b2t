import puppeteer from "puppeteer";
import fs from "fs";
import hbd from "handlebars";
import path from "path";

const compile = async (name: string, data: Object) => {
    const filePath = path.join(process.cwd(), "src", "templates", name);
    const html = fs.readFileSync(filePath, "utf-8");
    return hbd.compile(html)(data);
};

hbd.registerHelper("date-format", (val) => {
    return `formatted date :: ${val}`;
});

const main = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile("booking.hbs", {});
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
