const fs = require("fs");

module.exports = {
  de: JSON.parse(fs.readFileSync(__dirname + "/../l10n/de.arb")),
  en: JSON.parse(fs.readFileSync(__dirname + "/../l10n/en.arb")),
  fr: JSON.parse(fs.readFileSync(__dirname + "/../l10n/fr.arb")),
  it: JSON.parse(fs.readFileSync(__dirname + "/../l10n/it.arb")),
  es: JSON.parse(fs.readFileSync(__dirname + "/../l10n/es.arb")),
};
