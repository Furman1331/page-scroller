import pkg from "../package.json";

import { rollupConfigCreator } from "./rollup-config-creator";

const name = "index";

const options = [
    {
        name,
        format: "cjs",
        input: pkg.source
    },
    {
        name,
        format: "esm",
        input: pkg.source
    },
    {
        name,
        format: "umd",
        input: pkg.source
    }
];

export default options.map(option => rollupConfigCreator(option))