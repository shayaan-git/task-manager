require("dotenv").config();
const app = require("./src/app.js");
const connectToDb = require("./src/config/database.js");

connectToDb();

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
