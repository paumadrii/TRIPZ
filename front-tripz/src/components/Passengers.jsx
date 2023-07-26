import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useClickOutSide from '../hooks/useClickOutSide';

const Passengers = ({ people, setPeople }) => {
  const ref = useRef();
  const [showPassengers, setShowPassengers] = useState(false);
  useClickOutSide(ref, () => setShowPassengers(false));
  return (
    <PassengersContainer ref={ref}>
      <TotalPassengers onClick={() => setShowPassengers(true)}>
        <PermIdentityIcon />
        {people.adults + people.teens + people.children + people.infants}
        <Arrow open={showPassengers}></Arrow>
      </TotalPassengers>
      {showPassengers ? (
        <PassengersList>
          <Passenger>
            <PeopleInfo>
              <Title>
                {'Adultos'}
                <SubTitle>{'+ 16 años'}</SubTitle>
              </Title>
              <Counter>
                <Decrement disable={people.adults <= 1} onClick={() => people.adults > 1 && setPeople({ ...people, adults: people.adults - 1 })}>
                  <CounterIcon>
                    <RemoveIcon />
                  </CounterIcon>
                </Decrement>
                <Counting>{people.adults}</Counting>
                <Increase onClick={() => setPeople({ ...people, adults: people.adults + 1 })}>
                  <CounterIcon>
                    <AddIcon />
                  </CounterIcon>
                </Increase>
              </Counter>
            </PeopleInfo>
            <PeopleInfo>
              <Title>
                {'Adolescentes'}
                <SubTitle>{'12 - 15 años'}</SubTitle>
              </Title>
              <Counter>
                <Decrement disable={people.teens <= 0} onClick={() => people.teens && setPeople({ ...people, teens: people.teens - 1 })}>
                  <CounterIcon>
                    <RemoveIcon />
                  </CounterIcon>
                </Decrement>
                <Counting>{people.teens}</Counting>
                <Increase onClick={() => setPeople({ ...people, teens: people.teens + 1 })}>
                  <CounterIcon>
                    <AddIcon />
                  </CounterIcon>
                </Increase>
              </Counter>
            </PeopleInfo>
            <PeopleInfo>
              <Title>
                {'Niños'}
                <SubTitle>{'2 - 11 años'}</SubTitle>
              </Title>
              <Counter>
                <Decrement disable={people.children <= 0} onClick={() => people.children && setPeople({ ...people, children: people.children - 1 })}>
                  <CounterIcon>
                    <RemoveIcon />
                  </CounterIcon>
                </Decrement>
                <Counting>{people.children}</Counting>
                <Increase onClick={() => setPeople({ ...people, children: people.children + 1 })}>
                  <CounterIcon>
                    <AddIcon />
                  </CounterIcon>
                </Increase>
              </Counter>
            </PeopleInfo>
            <PeopleInfo>
              <Title>
                {'Bebés'}
                <SubTitle>{'- 2 años'}</SubTitle>
              </Title>
              <Counter>
                <Decrement disable={people.infants <= 0} onClick={() => people.infants && setPeople({ ...people, infants: people.infants - 1 })}>
                  <CounterIcon>
                    <RemoveIcon />
                  </CounterIcon>
                </Decrement>
                <Counting>{people.infants}</Counting>
                <Increase onClick={() => setPeople({ ...people, infants: people.infants + 1 })}>
                  <CounterIcon>
                    <AddIcon />
                  </CounterIcon>
                </Increase>
              </Counter>
            </PeopleInfo>
          </Passenger>
        </PassengersList>
      ) : null}
    </PassengersContainer>
  );
};

export default Passengers;

const PassengersContainer = styled.div`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 16px;
  position: relative;
  z-index: 5;
`;

const TotalPassengers = styled.div`
  width: 80px;
  font-size: 16px;
  height: 36px;
  border: 1px solid rgb(218, 220, 224);
  border-radius: 4px;
  display: flex;
  align-items: center;
  & > svg {
    margin: 8px;
    & path {
      fill: rgba(0, 0, 0, 0.54);
    }
  }
`;

const Arrow = styled(ArrowDropDownIcon)`
  transition: all 0.4s !important;
  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`;
const PassengersList = styled.div`
  width: 232px;
  box-shadow: 0 1px 3px 0 rgba(128, 128, 128, 0.3), 0 4px 8px 3px rgba(184, 186, 188, 0.15);
  border-radius: 4px;
  display: flex;
  position: absolute;
  top: 100%;
  left: 0px;
  z-index: 4;
  background: #fff;
`;
const Passenger = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 16px;
`;

const PeopleInfo = styled.li`
  display: flex;
  border-bottom: 1px solid rgb(235, 236, 238);
  padding-top: 8px;
  &:last-child {
    border-bottom: 0px;
  }
`;

const Counter = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 16px;
`;
const Decrement = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid rgba(174, 175, 178);
  background-color: rgba(235, 236, 238);
  margin-left: 16px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  }
  ${({ disable }) =>
    disable === true &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`;
const Counting = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  margin-left: 16px;
`;
const Increase = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid rgb(174, 175, 178);
  border-radius: 4px;
  background-color: rgb(235, 236, 238);
  margin-left: 16px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
  }
`;

const Title = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const SubTitle = styled.div`
  font-size: 12px;
  color: rgb(112, 117, 122);
`;

const CounterIcon = styled.div`
  display: flex;
  /* position: relative; */
  /* width: 100%; */
  /* height: 100%; */
  /* padding: 8px; */
  justify-content: center;
  align-items: center;
  /* margin: 0; */
  /* padding: 0; */
  width: 100%;
  & > svg {
    width: 16px;
    height: 16px;
    border: 0px;
    & path {
      fill: rgba(0, 0, 0, 0.54);
    }
  }
`;
