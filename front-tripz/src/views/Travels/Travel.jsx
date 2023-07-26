import { useState } from 'react';
import styled, { css } from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LOGOS } from '../../utils/constants/logos';

const Travel = ({ travel }) => {
  const [showCards, setShowCards] = useState(false);
  return (
    <Container>
      <InfoTravel onClick={() => setShowCards(!showCards)}>
        <Codes>
          {travel.code_airport_out} - {travel.code_airport_in}
        </Codes>
        <IconContainer open={showCards}>
          <KeyboardArrowDownIcon />
        </IconContainer>
      </InfoTravel>
      {showCards && (
        <CardsContainer>
          {travel.cards.map((card) => {
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
                </DurationInfo>
                <FligthNumber>{card.flightNumber}</FligthNumber>
                <FligthDirecctions>
                  {card.cityDep} - {card.cityArr}
                </FligthDirecctions>
                <PriceInfo>{`${card.price} €`}</PriceInfo>
                <ActionsButtons>
                  <Reservation href={card.url} target="_blank">
                    Reservar
                  </Reservation>
                </ActionsButtons>
              </CardItem>
            );
          })}
        </CardsContainer>
      )}
    </Container>
  );
};

export default Travel;

const Container = styled.div`
  border: 1px solid #dadce0;
  width: 100%;
  max-width: 990px;
  border-radius: 8px;
  margin-bottom: 12px;
`;
const InfoTravel = styled.div`
  min-height: 74px;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
`;
const Codes = styled.div`
  display: flex;
  align-items: center;
  color: orange;
  flex: 1;
`;

const IconContainer = styled.div`
  & > svg {
    transition: all 0.5s !important;

    ${({ open }) =>
      open &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

const CardsContainer = styled.div`
  border-top: 1px solid #dadce0;
  padding: 0px 0px;
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
  min-width: 75px;
`;
const FligthNumber = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  min-width: 75px;
`;
const PriceInfo = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 75px;
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

const ActionsButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
`;

const FligthDirecctions = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  min-width: 75px;
`;
