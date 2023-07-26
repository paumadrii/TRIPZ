import { styled } from 'styled-components';
import { LOGOS } from '../../utils/constants/logos';
import SaveButton from './SaveButton';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { useContext } from 'react';
const Cards = ({ cards, oA, dA, dateOut, dateIn }) => {
  const { user } = useContext(UserContext);

  return (
    !(!cards?.flightside && !cards?.flightsback) && (
      <Container>
        {cards?.flightside?.length > 0 && (
          <Content>
            <Title>Vuelos de ida</Title>
            <FlightList>
              {cards?.flightside?.map?.((card) => {
                return (
                  <CardItem>
                    <AirlineIcon>
                      <Image>
                        <Logo src={LOGOS[card.airline]} />
                      </Image>
                    </AirlineIcon>
                    <HourInfo>
                      <Hour>{`${card.hourDep} - ${card.hourArr}`}</Hour>
                      <Subtitle>{card.airline}</Subtitle>
                    </HourInfo>
                    <DurationInfo>
                      <Duration>{card.duration}</Duration>
                      <StartEnd>{`${oA.code} - ${dA.code}`}</StartEnd>
                    </DurationInfo>
                    <FligthNumber>{card.flightNumber}</FligthNumber>

                    <PriceInfo>{`${card.price} €`}</PriceInfo>
                    <ActionsButtons>
                      {user?.isAuthenticated && <SaveButton card={card} oA={oA} dA={dA} dateOut={dateOut} dateIn={dateIn} />}
                      <Reservation href={card.url} target="_blank">
                        Reservar
                      </Reservation>
                    </ActionsButtons>
                  </CardItem>
                );
              })}
            </FlightList>
          </Content>
        )}
        {cards?.flightsback?.length > 0 && (
          <Content>
            <Title>Vuelos de vuelta</Title>
            <FlightList>
              {cards?.flightsback?.map?.((card) => {
                return (
                  <CardItem>
                    <AirlineIcon>
                      <Image>
                        <Logo src={LOGOS[card.airline]} />
                      </Image>
                    </AirlineIcon>
                    <HourInfo>
                      <Hour>{`${card.hourDep} - ${card.hourArr}`}</Hour>
                      <Subtitle>{card.airline}</Subtitle>
                    </HourInfo>
                    <DurationInfo>
                      <Duration>{card.duration}</Duration>
                      <StartEnd>{`${oA.code} - ${dA.code}`}</StartEnd>
                    </DurationInfo>
                    <FligthNumber>{card.flightNumber}</FligthNumber>
                    <PriceInfo>{card.price}</PriceInfo>
                    <ActionsButtons>
                      {user?.isAuthenticated && <SaveButton card={card} oA={oA} dA={dA} dateOut={dateOut} dateIn={dateIn} />}
                      <Reservation href={card.url} target="_blank">
                        Reservar
                      </Reservation>
                    </ActionsButtons>
                  </CardItem>
                );
              })}
            </FlightList>
          </Content>
        )}
      </Container>
    )
  );
};

export default Cards;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 48px;
  font-family: Arial, Helvetica, sans-serif;
  font: 20px;
  margin-top: 24px;
`;
const Title = styled.h1`
  width: 100%;
  max-width: 990px;
`;
const FlightList = styled.div`
  width: 100%;
  max-width: 990px;
  border: 1px solid rgb(218, 220, 224);
  border-radius: 6px;
`;
const CardItem = styled.div`
  display: flex;
  border-bottom: 1px solid rgb(218, 220, 224);
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 24px;

  &:last-child {
    border-bottom: 0px;
  }
`;
const AirlineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 16px;
`;
const HourInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 120px;
`;
const DurationInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 80px;
`;
const FligthNumber = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  min-width: 80px;
`;

const PriceInfo = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 80px;
`;
const Hour = styled.div``;
const Subtitle = styled.div``;
const Duration = styled.div``;
const StartEnd = styled.div``;
const Reservation = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid orange;
  border-radius: 4px;
  padding: 8px;
  background-color: orange;
  font-size: 16px;
  color: white;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  &:hover {
    background-color: #df9205;
  }
`;

const Logo = styled.img`
  height: 100%;
`;

const Image = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
`;

const ActionsButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;
