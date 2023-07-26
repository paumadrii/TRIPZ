const { getTravels } = require('../../models/user/user');

module.exports = () => async (req, res, next) => {
  const userId = req.user.id;

  const { rows } = await getTravels({ userId });
  console.log(rows);
  const travels = rows.reduce(
    (result, row) => ({
      ...result,
      [row.travel_id]: {
        ...result?.[row.travel_id],
        code_airport_out: row.code_airport_out,
        code_airport_in: row.code_airport_in,
        name_airport_out: row.name_airport_out,
        city_airport_out: row.city_airport_out,
        name_airport_in: row.name_airport_in,
        city_airport_in: row.city_airport_in,
        cards: [
          ...(result?.[row.travel_id]?.cards || []),
          {
            id: row.id,
            airline: row.airline,
            hourDep: row.hourdep,
            cityDep: row.citydep,
            flightNumber: row.flightnumber,
            duration: row.duration,
            hourArr: row.hourarr,
            cityArr: row.cityarr,
            price: row.price,
            url: row.url
          }
        ]
      }
    }),
    {}
  );

  res.status(200).json({
    success: true,
    travels
  });
};

/*
  [
    {
      id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4-Ryanair-06:45-08:50-FR 568',
      user_id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4',
      code_airport_out: 'MAD',
      code_airport_in: 'LPA',
      travel_id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4-MAD-LPA-2023-8-2-2023-7-30',
      price: '241.05',
      airline: 'Ryanair'
    },
    {
      id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4-Ryanair-17:40-19:45-FR 2011',
      user_id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4',
      code_airport_out: 'MAD',
      code_airport_in: 'LPA',
      travel_id: '21fbd35b-8f9c-45f2-85df-538f314ca3f4-MAD-LPA-2023-8-2-2023-7-30',
      price: '308.05',
      airline: 'Ryanair'
    }
  ]

  PRIMERA VUELTA
  result = {}
  result = {
    ...result, Heredamos los otros viajes
    "21fbd35b-8f9c-45f2-85df-538f314ca3f4-MAD-LPA-2023-8-2-2023-7-30": {
      ...result.21fbd35b-8f9c-45f2-85df-538f314ca3f4-MAD-LPA-2023-8-2-2023-7-30, Heredamos los atributos de ese objeto si existiera (...result?.[row.travel_id])
      cards: [
        ...result.21fbd35b-8f9c-45f2-85df-538f314ca3f4-MAD-LPA-2023-8-2-2023-7-30.cards Heredamos las cards de ese viaje si existiera,
        {
          id: 21fbd35b-8f9c-45f2-85df-538f314ca3f4-Ryanair-06:45-08:50-FR 568
        }
      ]
    }
  }
*/
