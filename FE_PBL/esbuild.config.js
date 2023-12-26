const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['your-entry-file.js'],
  bundle: true,
  outfile: 'out.js',
  loader: {
    '.js': 'jsx' // Thêm cấu hình loader cho cú pháp JSX
  },
}).catch(() => process.exit(1));
