import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';
import { cities, City } from '../data/cities';
import { calculateTotalDistance, calculateDistance } from '../services/distanceCalculator';
import { format } from 'date-fns';
import { ColorRing } from 'react-loader-spinner';

const SearchResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<any>({});
  const [cityDetails, setCityDetails] = useState<City[]>([]);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const origin = query.get('origin');
    const intermediateCities = query.get('intermediateCities')?.split(',') || [];
    const destination = query.get('destination');
    const date = query.get('date');
    const passengers = query.get('passengers');

    setSearchParams({
      origin,
      intermediateCities,
      destination,
      date,
      passengers
    });

    const cityNames = [origin, ...intermediateCities, destination].filter(Boolean);

    const fetchedCityDetails = cityNames.map(name => cities.find(city => city.name === name)!) as City[];

    setCityDetails(fetchedCityDetails);
  }, [location.search]);

  useEffect(() => {
    if (cityDetails.length > 1) {
      calculateTotalDistance(cityDetails).then(distance => setTotalDistance(distance));
    }
  }, [cityDetails]);

  return (
    <Container>
      <Card>
        <Section>
          <Header>
            Search Results
          </Header>
          <SearchInfo>
            <SearchItem>
              <IconContainer>
                <span className="material-symbols-outlined" style={CircleStyle}>circle</span>
              </IconContainer>
              <TextContainer>
                {searchParams.origin}
              </TextContainer>
            </SearchItem>
            <FieldDots>
              {[...Array(3)].map((_, index) => (
                <Dot key={index}>·</Dot>
              ))}
            </FieldDots>
            {cityDetails.slice(0, -1).map((city, index) => (
              index < cityDetails.length - 1 && (
                <DistanceContainer key={index} style={{ top: (118 + (index * 56))}}>
                  <DistanceText>
                    {calculateDistance(city.latitude, city.longitude, cityDetails[index + 1].latitude, cityDetails[index + 1].longitude).toFixed(2)} km
                  </DistanceText>
                  <Pointer/>
                </DistanceContainer>
              )
            ))}
            {searchParams.intermediateCities?.map((intermediateCity: string, index: number) => (
              intermediateCity === '' ? <IntermediatesContainer key={`${index}-${intermediateCity}`}/> :
              <IntermediatesContainer key={`${index}-${intermediateCity}`}>
                <SearchItem>
                  <IconContainer>
                    <span className="material-symbols-outlined" style={CircleStyle}>circle</span>
                  </IconContainer>
                  <TextContainer>
                    {intermediateCity}
                  </TextContainer>
                </SearchItem>
                <FieldDots style={{ top: (182 + (index * 56)) }}>
                {[...Array(3)].map((_, index) => (
                  <Dot key={index}>·</Dot>
                ))}
                </FieldDots>
              </IntermediatesContainer>
            ))}
            <SearchItem>
              <IconContainer>
                <span className="material-symbols-outlined" style={PinStyle}>location_on</span>
              </IconContainer>
              <TextContainer>
                {searchParams.destination}
              </TextContainer>
            </SearchItem>
          </SearchInfo>
          <Footer>
            <Row>
              <ColorRing
                visible={!totalDistance}
                height="35"
                width="35"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#ABE1C9', '#80CDD7', '#7C9CE5', '#7EA3E6', '#CFEEBB']}
              />
              {totalDistance &&
                <ResultValue style={{ marginTop: 0 }}>{totalDistance?.toFixed(2)} km</ResultValue>
              }
              <ResultInfo style={{ marginTop: 0 }}>Total Distance</ResultInfo>
            </Row>
            <Row>
              <ResultValue>{searchParams.passengers}</ResultValue>
              <ResultInfo>Passengers</ResultInfo>
            </Row>
            <Row>
              {searchParams.date && (
                <ResultValue>{format(new Date(searchParams.date), 'dd MMM, yyyy')}</ResultValue>
              )}
            </Row>
            <Row style={{ marginTop: '2rem' }}>
              <Button label='Back' type='reset' disabled={false} handleClick={() => navigate('/')}/>
            </Row>
          </Footer>
        </Section>
      </Card>
    </Container>
  );
}

export default SearchResult;

const Section = styled.div`
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 700px;
  @media (max-width: 768px) {
    min-width: 356px;
  }
  @media (max-width: 576px) {
    min-width: 268px;
  }
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
  margin-top: 0;
`;

const SearchInfo = styled.div`
  margin-left: 125px;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  line-height: 0.5;
`;

const TextContainer = styled.h3`
  margin: 0 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #374151;
`;
  
const IntermediatesContainer = styled.div`
`;
  
const DistanceContainer = styled.div`
  position: absolute;
  padding: 0.4rem 0.6rem;
  background-color: #fff;
  border: 2px solid #7786D2;
  border-radius: 10px;
  left: 33%;
  top: 118px;
  min-width: 85px;
  text-align: center;
  @media (max-width: 768px) {
    left: 17%;
  }
  @media (max-width: 576px) {
    left: 13%;
  }
`;
  
const DistanceText = styled.h3`
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: #7786D2;
  margin: 0;
`;
  
const Pointer = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 6px;
  border-color: transparent transparent transparent #fff;
  right: -10px;
  top: 11px;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent #7786D2;
    right: 3px;
    top: -6px;
  }
`;
    
const CircleStyle = {
  color: '#374151',
  fontSize: '1.4rem'
}
    
const PinStyle = {
  color: '#FF0000',
  fontSize: '1.4rem'
}
  
const FieldDots = styled.div`
  position: absolute;
  top: 127px;
  margin-left: 8.5px;
  height: 4%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.div`
  font-size: 20px;
  line-height: 0.1;
`;

const Footer = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultValue = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: #7786D2;
  margin-bottom: 0;
  text-align: center;
`;

const ResultInfo = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  padding-left: 0.25rem;
  margin-bottom: 0;
  text-align: center;
`;
