const express = require("express");

const { rateLimit } = require("express-rate-limit");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { Auth, Proxy } = require("./utils/common");
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 10 minutes).
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply the rate limiting middleware to all requests.
app.use(limiter);

//proxy

app.use("/flightService", Proxy(ServerConfig.FlightService));
app.use("/bookingService", Proxy(ServerConfig.BookingService));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
