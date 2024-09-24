const redisClient = require("../redis");

//ttl:time to live in redis
module.exports.rateLimiter = (ttl, requestLimit) => async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  //we will track each user by ther ip so key will be ip in redis
  const [response] = await redisClient.multi().incr(ip).expire(ip, ttl).exec();
  //console.log(response[1]);
  if (response[1] > requestLimit)
    res.json({
      loggedIn: false,
      status: "Too many requests Try after some time",
    });
  else next();
};
