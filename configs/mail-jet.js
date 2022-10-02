let mjInstance = require("node-mailjet").connect(
  process.env.MAIL_JET_API_KEY,
  process.env.MAIL_JET_SECRET_KEY
);

module.exports = {
  mjInstance,
};
