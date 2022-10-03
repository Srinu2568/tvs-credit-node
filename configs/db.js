// Include Sequelize module
const Sequelize = require("sequelize");

// let db;

// class SequelizeHandler {
//   constructor(dbUri, dbHost, sslOptObj) {
//     this.DbUri = dbUri;
//     this.host = dbHost;
//     this.sslOptObj = sslOptObj;
//   }
//   async init() {
//     db = new Sequelize(this.DbUri, {
//       host: this.host,
//       dialect: "postgres",
//       protocol: "postgres",
//       dialectOptions: {
//         ssl: this.sslOptObj,
//       },
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//       },
//     });
//     return db;
//   }
// }

// // Exporting the sequelize object.
// // We can use it in another file
// // for creating models
// module.exports = { SequelizeHandler, db };

const sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_ROSE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
