const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//To hide the key
if (process.env.NODE_ENV !== "production") require("dotenv").config();

//Stripe, after checking if environment is producction
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Creating express app
const app = express();
const port = process.env.PORT || 5000;

//Parses the body and converts to json
app.use(bodyParser.json());
//safety url encoded
app.use(bodyParser.urlencoded({ extended: true }));

//allow us to make request to bkd server
app.use(cors());

//Serving the static files in build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  //function for every url (*)
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port" + port);
});

//Creating payment route
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
