const DEFAULT_STATS = {
  // minimal
  // can use `preset: "minimal"` once webpack 5 lands
  all: false,
  modules: true,
  errors: true,
  warnings: true,
  // We want to keep output narrowly focused when possible because there's a lot
  // of different watchers started at once.
  moduleTrace: true,
  errorDetails: true,
  assets: true,
  excludeAssets: [/\.d\.ts/, /\.png/, /\.jpe?g/],
  hash: true,
  timings: true,
};

module.exports = {
  DEFAULT_STATS,
};
