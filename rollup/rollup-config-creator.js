import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import typescript from "rollup-plugin-typescript2";
import sourcemaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';

export function rollupConfigCreator(options, callback) {
    const name = options.name;
    const extName = options.format === "esm" ? "mjs" : "js";
    const outputName = "dist/" + [name, options.format, extName].join(".");

    const config = {
        input: options.input,
        output: {
            file: outputName,
            format: options.format,
            name: 'Page Scroller',
            sourcemap: true,
            exports: 'named',
        },
        plugins: [
            external(),
            postcss({ extensions: ['.css'] }),
            typescript({
                tsconfig: options.tsconfig,
                clean: true,
            }),
            sourcemaps(),
            options.format === "umd" && commonjs({ include: /\/node_modules\// }),
            options.format !== 'esm' &&
            terser({
                output: { comments: false },
                compress: {
                    drop_console: true,
                },
            }),
        ].filter(Boolean)
    }

    return callback ? callback(config) : config;
}