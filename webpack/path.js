const path = require("path");

const ROOT = path.resolve(__dirname, "..");

module.exports = {
  ROOT,
  SRC: path.join(ROOT, "src"),
  DIST: path.join(ROOT, "dist"),
  PUBLIC: path.join(ROOT, "public"),
};
