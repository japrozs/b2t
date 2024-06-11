import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
        "./node_modules/@nextui-org/theme/dist/components/(popover|button|ripple|spinner).js",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "primary-color": "#35E0A1",
                "blue-main": "#09225A",
                "blue-sec": "#558FF0",
                "ios-blue": "#147efb",
                "sky-blue": "#00AEEF",
                "teal-blue": "#00395D",
            },
            fontSize: {
                tiny: "0.89rem",
                smol: "0.95rem",
                md: "0.9375rem",
            },
            lineHeight: {
                md: "1.375rem",
            },
        },
    },
    plugins: [nextui()],
};
export default config;
