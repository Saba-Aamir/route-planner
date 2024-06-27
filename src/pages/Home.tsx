import React from 'react';
import SearchForm from './SearchForm';
import styled from 'styled-components';
import Container from '../components/Container';

const Home: React.FC = () => {
  return (
    <Container>
        <Main>
            <Header>
              <HeaderIcon>
                <span className="material-symbols-outlined" style={{ color: '#7786D2', fontSize: '4rem' }}>globe</span>
              </HeaderIcon>
              <HeaderText>
                <Heading>Route Planner</Heading>
                <SubHeading>Craft Your Perfect Trip - From Origin to Destination</SubHeading>
              </HeaderText>
            </Header>
            <SearchForm />
        </Main>
    </Container>
  );
};

export default Home;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .material-symbols-outlined {
    @media (max-width: 768px) {
      font-size: 3rem !important;
    }
  }
`;

const HeaderText = styled.div`
  margin-left: 0.5rem;
`;

const Heading = styled.h1`
  color: #374151;
  text-align: start;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  text-tranform: uppercase;
   @media (max-width: 768px) {
    font-size: 1.5rem
  }
`;

const SubHeading = styled.h2`
  color: #374151;
  text-align: start;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.1rem;
  margin-bottom: 0;
   @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;