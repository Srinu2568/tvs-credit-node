require("dotenv").config();

const { BigPromiseNormal } = require("./utils/BigPromise.js");
const sequelize = require("./configs/db.js");
const { mjInstance } = require("./configs/mail-jet.js");
const { devKickStart } = require("./seeds/seeds.js");
const {
  definedSetsBulkInsert,
  labelledDefinedSetsBulkInsert,
  carModelBulkInsert,
  locationBulkInsert,
} = require("./seeds/DSBulkInsert");

const app = require("./app.js");

const PORT = process.env.PORT || 80;

const appStarter = async () => {
  await sequelize.authenticate();
  // await sequelize.sync({ force: true });
  // await carModelBulkInsert();
  // await locationBulkInsert();
  // await devKickStart();

  app.listen(PORT, () => console.log(`server running at ${PORT}...`));
};

BigPromiseNormal(appStarter);
