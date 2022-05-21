const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

console.time("⚡️[build] Building is succeed in");
esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: './build/index.js',
    bundle: true,
    minify: process.env.NODE_ENV !== 'production',
    platform: 'node',
    sourcemap: true,
    plugins: [nodeExternalsPlugin(),],
}).then(_ => {
    console.timeEnd("⚡️[build] Building is succeed in");
}).catch(() => process.exit(1))