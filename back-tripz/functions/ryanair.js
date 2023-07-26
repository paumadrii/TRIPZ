const puppeteer = require('puppeteer');
const formData = {
  adults: 1,
  teens: 0,
  children: 0,
  infants: 0,
  dateOut: {
    year: '2023',
    month: '08',
    day: '27'
  },
  dateIn: {
    year: '2023',
    month: '09',
    day: '10'
  },
  isReturn: true,
  discount: 0,
  originIata: 'MAD',
  destinationIata: 'BVA'
};

const getUrlOneWay = (params) =>
  `https://www.ryanair.com/es/es/trip/flights/select?adults=${params.adults}&teens=${params.teens}&children=${params.children}&infants=${params.infants}&dateOut=${params.dateOut.year}-${params.dateOut.month}-${params.dateOut.day}&dateIn=&isConnectedFlight=false&isReturn=${params.isReturn}&discount=${params.discount}&promoCode=&originIata=${params.originIata}&destinationIata=${params.destinationIata}`;

const getTravelsRyanair = async (params) => {
  let url = '';
  if (params.isReturn === true) {
    url = `https://www.ryanair.com/es/es/trip/flights/select?adults=${params.adults}&teens=${params.teens}&children=${params.children}&infants=${params.infants}&dateOut=${params.dateOut.year}-${params.dateOut.month}-${params.dateOut.day}&dateIn=${params.dateIn.year}-${params.dateIn.month}-${params.dateIn.day}&isConnectedFlight=false&isReturn=${params.isReturn}&discount=${params.discount}&promoCode=&originIata=${params.originIata}&destinationIata=${params.destinationIata}`;
  } else {
    url = getUrlOneWay(params);
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(url);
  await page.waitForSelector(`button[class="cookie-popup-with-overlay__button"]`);
  await page.click(`button[class="cookie-popup-with-overlay__button"]`);

  let flightside = [];
  let flightsback = [];
  try {
    flightside = await page.$eval(
      'journey-container[data-ref="outbound"]',
      (element, params) => {
        const cards = element.querySelectorAll('flight-card-new');
        const cardsResults = [];
        const getUrlOneWay = (params) =>
          `https://www.ryanair.com/es/es/trip/flights/select?adults=${params.adults}&teens=${params.teens}&children=${params.children}&infants=${params.infants}&dateOut=${params.dateOut.year}-${params.dateOut.month}-${params.dateOut.day}&dateIn=&isConnectedFlight=false&isReturn=${params.isReturn}&discount=${params.discount}&promoCode=&originIata=${params.originIata}&destinationIata=${params.destinationIata}`;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          console.log(card);

          const airline = card.querySelector('div.flight-card__airline-label').innerHTML.trim();
          console.log('airline', airline);

          const hourDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__hour').innerHTML.trim();
          console.log('hourDep', hourDep);

          const cityDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__city').innerHTML.trim();
          console.log('cityDep', cityDep);

          const flightNumber = card.querySelector('div.card-flight-num__content').innerHTML.trim();
          console.log('flightNumber', flightNumber);

          const durationText = card.querySelector('div[data-ref="flight_duration"]').innerHTML;
          const duration = durationText.replaceAll('&nbsp', ' ').replaceAll(';', '').replace('<!---->', '').trim();
          console.log('durationText', duration);

          const hourArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__hour').innerHTML.trim();
          console.log('hourArr', hourArr);

          const cityArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__city').innerHTML.trim();
          console.log('cityArr', cityArr);

          const priceText = card.querySelector('flights-price-simple').innerHTML;
          const price = +priceText.replace(',', '.').replace(' €', '');
          console.log('priceText', priceText);
          console.log('price', price);
          cardsResults.push({
            airline,
            hourDep,
            cityDep,
            flightNumber,
            duration,
            hourArr,
            cityArr,
            price,
            url: getUrlOneWay(params)
          });
        }
        console.log('cardsResults', cardsResults);
        return cardsResults;
      },
      params
    );
  } catch (error) {
    console.log('error fligthside', error);
  }

  if (params.isReturn === true) {
    try {
      flightsback = await page.$eval(
        'journey-container[data-ref="inbound"]',
        (element, params) => {
          console.log(element);
          const cards = element.querySelectorAll('flight-card-new');
          const cardsResults = [];
          const getUrlOneWay = (params) =>
            `https://www.ryanair.com/es/es/trip/flights/select?adults=${params.adults}&teens=${params.teens}&children=${params.children}&infants=${params.infants}&dateOut=${params.dateOut.year}-${params.dateOut.month}-${params.dateOut.day}&dateIn=&isConnectedFlight=false&isReturn=${params.isReturn}&discount=${params.discount}&promoCode=&originIata=${params.originIata}&destinationIata=${params.destinationIata}`;

          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            console.log(card);

            const airline = card.querySelector('div.flight-card__airline-label').innerHTML.trim();
            console.log('airline', airline);

            const hourDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__hour').innerHTML.trim();
            console.log('hourDep', hourDep);

            const cityDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__city').innerHTML.trim();
            console.log('cityDep', cityDep);

            const flightNumber = card.querySelector('div.card-flight-num__content').innerHTML.trim();
            console.log('flightNumber', flightNumber);

            const durationText = card.querySelector('div[data-ref="flight_duration"]').innerHTML;
            const duration = durationText.replaceAll('&nbsp', ' ').replaceAll(';', '').replace('<!---->', '').trim();
            console.log('durationText', duration);

            const hourArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__hour').innerHTML.trim();
            console.log('hourArr', hourArr);

            const cityArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__city').innerHTML.trim();
            console.log('cityArr', cityArr);

            const priceText = card.querySelector('flights-price-simple').innerHTML;
            const price = +priceText.replace(',', '.').replace(' €', '');
            console.log('priceText', priceText);
            console.log('price', price);
            cardsResults.push({
              airline,
              hourDep,
              cityDep,
              flightNumber,
              duration,
              hourArr,
              cityArr,
              price,
              url: getUrlOneWay({
                ...params,
                dateOut: params.dateIn,
                originIata: params.destinationIata,
                destinationIata: params.originIata
              })
            });
          }
          return cardsResults;
        },
        params
      );
    } catch (error) {
      console.log('error fligthsback', error);
    }
  }
  console.log('flightside', flightside);
  console.log('flightsback', flightsback);

  await browser.close();

  return {
    flightside,
    flightsback
  };
};

const ryanairIsReturn = async ({ adults, teens, children, infants, dateOut, dateIn, isReturn, discount, originIata, destinationIata }) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(
    `https://www.ryanair.com/es/es/trip/flights/select?adults=${params.adults}&teens=${teens}&children=${children}&infants=${infants}&dateOut=${dateOut.year}-${dateOut.month}-${dateOut.day}&dateIn=${dateIn.year}-${dateIn.month}-${dateIn.day}&isConnectedFlight=false&isReturn=${isReturn}&discount=${discount}&promoCode=&originIata=${originIata}&destinationIata=${destinationIata}`
  );
  await page.waitForSelector(`button[class="cookie-popup-with-overlay__button"]`);
  await page.click(`button[class="cookie-popup-with-overlay__button"]`);

  const flightside = await page.$eval('journey-container[data-ref="outbound"]', (element) => {
    console.log(element);
    const cards = element.querySelectorAll('flight-card-new');
    const cardsResults = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      console.log(card);

      const airline = card.querySelector('div.flight-card__airline-label').innerHTML.trim();
      console.log('airline', airline);

      const hourDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourDep', hourDep);

      const cityDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__city').innerHTML.trim();
      console.log('cityDep', cityDep);

      const flightNumber = card.querySelector('div.card-flight-num__content').innerHTML.trim();
      console.log('flightNumber', flightNumber);

      const durationText = card.querySelector('div[data-ref="flight_duration"]').innerHTML;
      const duration = durationText.replaceAll('&nbsp', ' ').replaceAll(';', '').replace('<!---->', '').trim();
      console.log('durationText', duration);

      const hourArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourArr', hourArr);

      const cityArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__city').innerHTML.trim();
      console.log('cityArr', cityArr);

      const priceText = card.querySelector('flights-price-simple').innerHTML;
      const price = +priceText.replace(',', '.').replace(' €', '');
      console.log('priceText', priceText);
      console.log('price', price);
      cardsResults.push({
        airline,
        hourDep,
        cityDep,
        flightNumber,
        duration,
        hourArr,
        cityArr,
        price
      });
    }
    console.log('cardsResults', cardsResults);
    return cardsResults;
  });

  console.log('flightside', flightside);

  const flightsback = await page.$eval('journey-container[data-ref="inbound"]', (element) => {
    console.log(element);
    const cards = element.querySelectorAll('flight-card-new');
    const cardsResults = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      console.log(card);

      const airline = card.querySelector('div.flight-card__airline-label').innerHTML.trim();
      console.log('airline', airline);

      const hourDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourDep', hourDep);

      const cityDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__city').innerHTML.trim();
      console.log('cityDep', cityDep);

      const flightNumber = card.querySelector('div.card-flight-num__content').innerHTML.trim();
      console.log('flightNumber', flightNumber);

      const durationText = card.querySelector('div[data-ref="flight_duration"]').innerHTML;
      const duration = durationText.replaceAll('&nbsp', ' ').replaceAll(';', '').replace('<!---->', '').trim();
      console.log('durationText', duration);

      const hourArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourArr', hourArr);

      const cityArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__city').innerHTML.trim();
      console.log('cityArr', cityArr);

      const priceText = card.querySelector('flights-price-simple').innerHTML;
      const price = +priceText.replace(',', '.').replace(' €', '');
      console.log('priceText', priceText);
      console.log('price', price);
      cardsResults.push({
        airline,
        hourDep,
        cityDep,
        flightNumber,
        duration,
        hourArr,
        cityArr,
        price
      });
    }
    console.log('cardsResults', cardsResults);
    return cardsResults;
  });

  console.log('flightsback', flightsback);

  //await browser.close();
};
//ryanairIsReturn();

const ryanairNotReturn = async (
  /*{
  adults,
  teens,
  children,
  infants,
  dateOut,
  dateIn,
  isReturn,
  discount,
  originIata,
  destinationIata,
}*/ body
) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(
    `https://www.ryanair.com/es/es/trip/flights/select?adults=1&teens=0&children=0&infants=0&dateOut=2023-07-16&dateIn=&isConnectedFlight=false&discount=0&isReturn=false&promoCode=&originIata=MAD&destinationIata=BGY&tpAdults=1&tpTeens=0&tpChildren=0&tpInfants=0&tpStartDate=2023-07-16&tpEndDate=&tpDiscount=0&tpPromoCode=&tpOriginIata=MAD&tpDestinationIata=BGY`
  );
  await page.waitForSelector(`button[class="cookie-popup-with-overlay__button"]`);
  await page.click(`button[class="cookie-popup-with-overlay__button"]`);

  const flightside = await page.$eval('journey-container[data-ref="outbound"]', (element) => {
    console.log(element);
    const cards = element.querySelectorAll('flight-card-new');
    const cardsResults = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      console.log(card);

      const airline = card.querySelector('div.flight-card__airline-label').innerHTML.trim();
      console.log('airline', airline);

      const hourDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourDep', hourDep);

      const cityDep = card.querySelector('div[data-ref="flight-segment.departure"] > span.flight-info__city').innerHTML.trim();
      console.log('cityDep', cityDep);

      const flightNumber = card.querySelector('div.card-flight-num__content').innerHTML.trim();
      console.log('flightNumber', flightNumber);

      const durationText = card.querySelector('div[data-ref="flight_duration"]').innerHTML;
      const duration = durationText.replaceAll('&nbsp', ' ').replaceAll(';', '').replace('<!---->', '').trim();
      console.log('durationText', duration);

      const hourArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__hour').innerHTML.trim();
      console.log('hourArr', hourArr);

      const cityArr = card.querySelector('div[data-ref="flight-segment.arrival"] > span.flight-info__city').innerHTML.trim();
      console.log('cityArr', cityArr);

      const priceText = card.querySelector('flights-price-simple').innerHTML;
      const price = +priceText.replace(',', '.').replace(' €', '');
      console.log('priceText', priceText);
      console.log('price', price);
      cardsResults.push({
        airline,
        hourDep,
        cityDep,
        flightNumber,
        duration,
        hourArr,
        cityArr,
        price
      });
    }
    console.log('cardsResults', cardsResults);
    return cardsResults;
  });

  console.log('flightside', flightside);
  await browser.close();
};

const iberiaIsReturn = async ({ adults, teens, children, infants, dateOut, dateIn, isReturn, discount, originIata, destinationIata }) => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(
    'https://www.iberia.com/flights/?market=ES&language=es&appliesOMB=false&splitEndCity=false&initializedOMB=true&flexible=true&TRIP_TYPE=2&BEGIN_CITY_01=MAD&END_CITY_01=PMI&nombreOrigen=Madrid&nombreDestino=Palma%20de%20Mallorca&BEGIN_DAY_01=20&BEGIN_MONTH_01=202307&BEGIN_YEAR_01=2023&END_DAY_01=22&END_MONTH_01=202307&END_YEAR_01=2023&FARE_TYPE=R&quadrigam=IBHMPA&ADT=2&CHD=2&INF=2&BNN=0&YTH=0&YCD=0&residentCode=&familianumerosa=&BV_UseBVCookie=no&boton=Buscar&bookingMarket=ES#!/availability'
  );
  await page.waitForSelector(`button[class="cookie-popup-with-overlay__button"]`);
  await page.click(`button[class="cookie-popup-with-overlay__button"]`);

  //await browser.close()
};

module.exports = {
  getTravelsRyanair
};
