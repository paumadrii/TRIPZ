import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { getAirports } from '../../services/airport';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { MenuItem, Select } from '@mui/material';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import Passengers from '../../components/Passengers';
import { findTravels } from '../../services/travels';
import { addCero } from '../../utils/functions/functions';
import Cards from '../../components/Cards/Cards';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Header from '../../components/Header/Header';
import { LOGOS } from '../../utils/constants/logos';
import LoadingPanel from '../../components/common/LoadingPanel';
import LoadingIcon from '../../assets/svgs/Loading';
import useClickOutSide from '../../hooks/useClickOutSide';

const IS_RETURN = 'IS_RETURN';
const GOING = 'GOING';
let timer;

const Home = () => {
  const [originValue, setOriginValue] = useState('');
  const [originListAirports, setOriginListAirports] = useState([]);
  const [originAirport, setOriginAirport] = useState();
  const [showOriginAirports, setShowOriginAirports] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAirportsOut, setLoadingAirportsOut] = useState(false);
  const [loadingAirportsIn, setLoadingAirportsIn] = useState(false);

  const [destinationValue, setDestinationValue] = useState('');
  const [destinationListAirports, setDestinationListAirports] = useState([]);
  const [destinationAirport, setDestinationAirport] = useState();
  const [showDestinationAirports, setShowDestinationAirports] = useState(false);

  const [dateOut, setDateOut] = useState(null);
  const [dateIn, setDateIn] = useState(null);

  const [selectGoingBack, setSelectGoingBack] = useState(IS_RETURN);
  const [people, setPeople] = useState({
    adults: 1,
    teens: 0,
    children: 0,
    infants: 0
  });

  const [cards, setCard] = useState({});
  const refAirportsOut = useRef();
  const refAirportsIn = useRef();

  useClickOutSide(refAirportsOut, () => setShowOriginAirports(false));
  useClickOutSide(refAirportsIn, () => setShowDestinationAirports(false));

  const handleChangeOrigin = async (value) => {
    setLoadingAirportsOut(true);
    setOriginValue(value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const airports = await getAirports(value);
      setOriginListAirports(airports);
      setShowOriginAirports(true);
      setLoadingAirportsOut(false);
    }, 200);
  };

  const handleSelectOriginAirport = (airport) => {
    setOriginAirport(airport);
    setOriginValue(airport.name);
    setShowOriginAirports(false);
  };

  const handleChangeDestination = async (value) => {
    setLoadingAirportsIn(true);
    setDestinationValue(value);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const airports = await getAirports(value);
      setDestinationListAirports(airports);
      setShowDestinationAirports(true);
      setLoadingAirportsIn(false);
    }, 400);
  };

  const handleSelectDestinationAirport = (airport) => {
    setDestinationAirport(airport);
    setDestinationValue(airport.name);
    setShowDestinationAirports(false);
  };

  const handleChangeGoingAndBack = (value) => {
    setSelectGoingBack(value);
  };

  const handleFocusOrigin = () => {
    if (originListAirports.length > 0) {
      setShowOriginAirports(true);
    }
  };

  const handleFocusDestination = () => {
    if (!!destinationListAirports.length) {
      setShowDestinationAirports(true);
    }
  };

  const handleGetCards = async () => {
    setLoading(true);
    const payload = {
      adults: people.adults,
      teens: people.teens,
      children: people.children,
      infants: people.infants,
      dateOut: {
        year: dateOut?.year,
        month: addCero(dateOut?.month),
        day: addCero(dateOut?.day)
      },
      dateIn: {
        year: dateIn?.year,
        month: addCero(dateIn?.month),
        day: addCero(dateIn?.day)
      },
      isReturn: selectGoingBack === IS_RETURN,
      originIata: originAirport.code,
      destinationIata: destinationAirport.code
    };
    const flightCards = await findTravels(payload);

    setCard(flightCards);
    setLoading(false);
  };

  const handleChangeDateRange = (dates) => {
    const [startDate, endDate] = dates;
    setDateOut({
      year: startDate?.$y,
      month: startDate?.$M + 1,
      day: startDate?.$D
    });
    setDateIn({
      year: endDate?.$y,
      month: endDate?.$M + 1,
      day: endDate?.$D
    });
  };

  return (
    <Container>
      <Header />
      <Body>
        <LogoContainer>
          <Logo src={LOGOS.HomeLogo} />
        </LogoContainer>
        <Content>
          <TopContent>
            <SelectGoingOptions value={selectGoingBack} onChange={(e) => handleChangeGoingAndBack(e.target.value)}>
              <MenuItem value={IS_RETURN}>Ida y vuelta</MenuItem>
              <MenuItem value={GOING}>Solo ida</MenuItem>
            </SelectGoingOptions>
            <Passengers people={people} setPeople={setPeople} />
          </TopContent>
          <CenterContent>
            <CitiesContainer>
              <OriginContent ref={refAirportsOut}>
                {loadingAirportsOut && (
                  <LoadingAirport>
                    <LoadingIcon />
                  </LoadingAirport>
                )}
                <OriginInput placeholder="¿Desde dónde?" onFocus={handleFocusOrigin} value={originValue} onChange={(e) => handleChangeOrigin(e.target.value)} />
                {showOriginAirports && !!originListAirports?.length && (
                  <AirportsList>
                    {originListAirports.map((airport) => {
                      return (
                        <AirportItem onClick={() => handleSelectOriginAirport(airport)}>
                          <AirportIcon>
                            <AirplanemodeActiveRoundedIcon />
                          </AirportIcon>
                          <AirportInfo>
                            <AirportTitle>{airport.name}</AirportTitle>
                            <AirportSubtitle>{`${airport.city}, (${airport.country})`}</AirportSubtitle>
                          </AirportInfo>
                        </AirportItem>
                      );
                    })}
                  </AirportsList>
                )}
              </OriginContent>
              <DestinationContent ref={refAirportsIn}>
                {loadingAirportsIn && (
                  <LoadingAirport>
                    <LoadingIcon />
                  </LoadingAirport>
                )}
                <DestinationInput placeholder="¿A dónde quieres ir?" onFocus={handleFocusDestination} value={destinationValue} onChange={(e) => handleChangeDestination(e.target.value)} />
                {showDestinationAirports && !!destinationListAirports?.length && (
                  <AirportsList>
                    {destinationListAirports.map((airport) => {
                      return (
                        <AirportItem onClick={() => handleSelectDestinationAirport(airport)}>
                          <AirportIcon>
                            <AirplanemodeActiveRoundedIcon />
                          </AirportIcon>
                          <AirportInfo>
                            <AirportTitle>{airport.name}</AirportTitle>
                            <AirportSubtitle>{`${airport.city}, (${airport.country})`}</AirportSubtitle>
                          </AirportInfo>
                        </AirportItem>
                      );
                    })}
                  </AirportsList>
                )}
              </DestinationContent>
            </CitiesContainer>
            <DatesContainer>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {selectGoingBack === IS_RETURN && (
                  <DateRangeContent>
                    <InsertInvitationIcon />
                    <DateRange slots={{ field: SingleInputDateRangeField }} onChange={(dates) => handleChangeDateRange(dates)} />
                  </DateRangeContent>
                )}
                {selectGoingBack === GOING && <DateSingleDate onChange={(date) => handleChangeDateRange([date])} />}
              </LocalizationProvider>
            </DatesContainer>
          </CenterContent>
          <BottomContent>
            <SearchButton onClick={handleGetCards} disabled={loading}>
              <TravelExploreIcon />
              Search
            </SearchButton>
          </BottomContent>
        </Content>
        {loading && <Loading />}
        {!loading && <Cards cards={cards} oA={originAirport} dA={destinationAirport} dateOut={dateOut} dateIn={dateIn} />}
      </Body>
    </Container>
  );
};
export default Home;

const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafafb;
`;

const Content = styled.div`
  width: 100%;
  max-width: 990px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  border-radius: 6px;
  padding: 8px 16px 48px;
`;
const TopContent = styled.div`
  margin-bottom: 8px;
  display: flex;
`;
const CenterContent = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const BottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CityInput = styled.input`
  border: 1px solid rgb(218, 220, 224);
  border-radius: 4px;
  outline: none;
  padding: 8px 24px;
  font-size: 16px;
  line-height: 18px;
  height: 56px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  &:focus {
    border: 1px solid orange;
  }
`;
const OriginInput = styled(CityInput)``;

const OriginContent = styled.div`
  position: relative;
  flex: 1;
  z-index: 4;
  width: 100%;
`;
const AirportsList = styled.div`
  border: 1px solid rgb(218, 220, 224);
  border-radius: 4px;
  position: absolute;
  max-height: 300px;
  background-color: #fff;
  z-index: 2;
  overflow: auto;
  min-width: 100%;
  max-width: 100%;
  padding: 3px 0px;
  z-index: 5;
`;
const AirportItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0px 12px;
  height: 56px;
  &:hover {
    background-color: #f8f9fa;
  }
`;
const DestinationInput = styled(CityInput)``;
const DestinationContent = styled.div`
  position: relative;
  flex: 1;
  z-index: 3;
  width: 100%;
`;
const DestinationList = styled.div``;
const StartDateContent = styled.div``;
const EndDateContent = styled.div``;
const CalendarIcon = styled.div``;
const StartDate = styled.input``;
const EndDate = styled.input``;
const AirportTitle = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const AirportSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 16px;
  color: #70757a;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const DatesContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: flex-end;
`;
const CitiesContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ChangeCitiesButton = styled.div`
  border: 1px solid rgb(218, 220, 224);
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background: #fff;
  transform: translateX(-10px);
  z-index: 2;
  visibility: hidden;
`;

const SelectGoingOptions = styled(Select)`
  height: 36px;
`;
const AirportInfo = styled.div`
  overflow: hidden;
  margin-left: 12px;
`;

const AirportIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateRange = styled(DateRangePicker)`
  width: 100%;
`;

const DateSingleDate = styled(DatePicker)`
  width: 100%;
`;
const DateRangeContent = styled.div`
  position: relative;
  width: 100%;
  & > svg {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 10px;
    top: calc(50% - 12px);
    & path {
      fill: rgba(0, 0, 0, 0.54);
    }
  }
  & > div {
    width: 100%;
  }
`;

const SearchButton = styled.div`
  cursor: pointer;
  display: flex;
  background: orange;
  text-align: center;
  padding: 8px 12px;
  border-radius: 4px;
  transform: translateY(65px);
  font-size: 20px;
  color: white;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  &:hover {
    background-color: #df9205;
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f3d499;
      pointer-events: none;
    `}
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 100%;
  max-width: 990px;
  max-height: 350px;
  overflow: hidden;
  border-radius: 6px;
  margin: 24px 0px;
`;

const Body = styled.div`
  padding: 16px;
`;

const Loading = styled(LoadingPanel)`
  margin-top: 100px;
  & svg {
    width: 40px;
    height: 40px;
  }
`;
const LoadingAirport = styled.div`
  position: absolute;
  top: calc(50% - 12px);
  right: 18px;
`;
