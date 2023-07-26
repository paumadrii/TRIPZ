const { getTravelsRyanair } = require('../../functions/ryanair');

module.exports = () => async (req, res, next) => {
  const params = req.body;
  console.log('kknn', params);
  const { flightside, flightsback } = await getTravelsRyanair(params);
  res.status(200).json({
    success: true,
    travels: {
      flightside,
      flightsback
    }
  });
};
