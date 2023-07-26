const { getTravel, saveTravel, getCard, saveCard } = require('../../models/user/user');

module.exports = () => async (req, res, next) => {
  console.log('kknn', req.user);
  console.log('body', req.body);
  const userId = req.user.id;
  const { card: _card, oA, dA, dateOut, dateIn } = req.body;

  const _dateIn = `${dateIn.year}-${dateIn.month}-${dateIn.day}`;
  const _dateOut = `${dateOut.year}-${dateOut.month}-${dateOut.day}`;
  const travelId = `${userId}-${oA.code}-${dA.code}-${_dateIn}-${_dateOut}`;
  const cardId = `${userId}-${_card.airline}-${_card.hourDep}-${_card.hourArr}-${_card.flightNumber}`;

  let travel = await getTravel({ userId, travelId });
  if (!travel) {
    const payload = {
      userId: req.user.id,
      travelId,
      codeAirportOut: oA.code,
      codeAirportIn: dA.code
    };
    await saveTravel(payload);
  }

  let card = await getCard({ cardId, travelId });
  if (!card) {
    const payload = {
      cardId,
      travelId,
      airline: _card.airline,
      hourDep: _card.hourDep,
      cityDep: _card.cityDep,
      flightNumber: _card.flightNumber,
      duration: _card.duration,
      hourArr: _card.hourArr,
      cityArr: _card.cityArr,
      price: _card.price,
      url: _card.url
    };
    await saveCard(payload);
  }

  res.status(200).json({
    success: true
  });
};
